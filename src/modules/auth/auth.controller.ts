import { NextFunction, Request, Response } from 'express';
import {z} from 'zod';
import { signInSchema, signUpSchema } from './auth.schemas';
import { AuthService } from './auth.service';
import { SessionService } from '../sessions/sessions.service';

const authService = new AuthService();

 export class AuthController {

  async postSignIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = signInSchema.parse(req.body);

      const result = await authService.signIn(email, password);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async postValidate(req: Request, res: Response) {
    try {
      const { token } = z.object({
        token: z.string().min(1),
      }).parse(req.body);

      const session = await SessionService.findSessionByToken(token);

      if (!session) {
        return res.status(401).json({ message: 'Invalid or expired session' });
      }

      return res.status(200).json({
        user: session.user,
        token: session.token,
        valid: true
      });
    } catch (error: any) {
      return res.status(401).json({ valid: false, message: 'Failed to validate session' });
    }
  }

  async postLogout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({ message: 'No token provided' });
      }

      await SessionService.invalidateSession(token);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
  }

  async postSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = signUpSchema.parse(req.body);

      const { user } = await authService.signUp(
        data.name,
        data.cpf,
        data.email,
        data.password
      );

      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      await AuthService.changePassword(userId, oldPassword, newPassword);

      return res.json({ ok: true, message: "Senha alterada com sucesso" });
    } catch (err: any) {
      next(err);
    }
  }
}


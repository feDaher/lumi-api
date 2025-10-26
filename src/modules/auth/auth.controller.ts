import { Request, Response } from 'express';
import { signInSchema, signUpSchema } from './auth.schemas';
import * as svc from './auth.service';

export async function postSignUp(req: Request, res: Response) {
  const { name, email, password } = signUpSchema.parse(req.body);
  const result = await svc.signUp(name, email, password);
  return res.status(201).json(result);
}

export async function postSignIn(req: Request, res: Response) {
  const { email, password } = signInSchema.parse(req.body);
  const result = await svc.signIn(email, password);
  return res.json(result);
}

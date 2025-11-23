import { Request, Response } from 'express';
import { signInSchema, signUpSchema } from './auth.schemas';
import * as svc from './auth.service';

export async function postSignUp(req: Request, res: Response) {
  const { name, cpf ,email, password } = signUpSchema.parse(req.body);
  const result = await svc.signUp(name, cpf ,email, password);
  return res.status(201).json(result);
}

export async function postSignIn(req: Request, res: Response) {
  try{
    const { email, password } = signInSchema.parse(req.body);
    const result = await svc.signIn(email, password);
    return res.json(result);
  
  }catch(error: any){
    if(error === 401) {
      return res.status(401).json({
        name: error.name || 'Unauthorized',
        message: error.message || 'Credênciais inválidas',
      });
    }
  return res.status(500).json({
  name: error.name || 'ServerError',
  message: error.message || 'Server Error',
  });
}

}

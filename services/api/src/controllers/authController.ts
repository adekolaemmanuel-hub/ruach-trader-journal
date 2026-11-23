import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, displayName } = req.body;
    const { user, access, refresh } = await authService.signup(email, password, displayName);
    res.status(201).json({ user: { id: user.id, email: user.email, displayName: user.displayName }, token: access, refresh_token: refresh });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, access, refresh } = await authService.login(email, password);
    res.json({ user: { id: user.id, email: user.email }, token: access, refresh_token: refresh });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

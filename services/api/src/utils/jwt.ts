import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

export function signAccessToken(payload: object) {
  const options: jwt.SignOptions = { expiresIn: CONFIG.JWT_EXPIRY as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, CONFIG.JWT_SECRET, options);
}

export function signRefreshToken(payload: object) {
  const options: jwt.SignOptions = { expiresIn: CONFIG.JWT_REFRESH_EXPIRY as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, CONFIG.JWT_REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, CONFIG.JWT_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, CONFIG.JWT_REFRESH_SECRET);
}

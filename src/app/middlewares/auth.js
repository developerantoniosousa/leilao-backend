import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: 'Token not found' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userLoggedId = decoded.id;
    return next();
  } catch {
    return response.status(401).json({ error: 'Token invalid' });
  }
}

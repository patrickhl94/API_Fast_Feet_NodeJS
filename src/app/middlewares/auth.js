import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token not provided' });
  }

  if (authHeader.substring(0, 6) !== 'Bearer') {
    return res.status(401).json({ erro: 'Invalid format token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userID = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token invalid' });
  }
};

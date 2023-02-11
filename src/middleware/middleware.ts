import { NextFunction, Response } from 'express';
export async function isAdmin(req: any, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user.isAdmin) return res.status(401).send({ msg: 'Not an admin, sorry' });
  next();
}

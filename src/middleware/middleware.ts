import { NextFunction, Request, Response } from 'express';

export async function isAdmin(req: any, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user.isAdmin) return res.status(401).send({ msg: 'Not an admin, sorry' });
  next();
}

export async function handleError(err: Error, req: Request, res: Response) {
  const { message } = err;
  res.status(500).json({ message });
}

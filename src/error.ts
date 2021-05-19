import { NextFunction, Request, Response } from 'express';
import NotFoundError from './errors/NotFoundError';
import UserDataError from './errors/UserDataError';

const errorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  if (error instanceof UserDataError) {
    res.status(400);
  }

  if (error instanceof NotFoundError) {
    res.status(404);
  }
  return res.json(JSON.parse(error.message));
};

export default errorHandling;

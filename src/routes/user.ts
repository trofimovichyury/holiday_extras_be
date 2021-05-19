import express, { NextFunction, Request, Response } from 'express';

import UserController from '../controllers/UserController';


const router = express.Router();
const userController = new UserController();

router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = userController.getUser(id);
    res.statusCode = 200;
    res.json(user);
  } catch (e) {
    next(e)
  }
});

router.post('/user', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const user = userController.createUser(body);
    res.statusCode = 200;
    res.json(user);
  } catch (e) {
    next(e)
  }
});

router.delete('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    userController.deleteUser(id);
    res.statusCode = 200;
    res.json();
  } catch (e) {
    next(e)
  }
});

router.put('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const user = userController.updateUser(id, body);
    res.statusCode = 200;
    res.json(user);
  } catch (e) {
    next(e)
  }
});

export default router;

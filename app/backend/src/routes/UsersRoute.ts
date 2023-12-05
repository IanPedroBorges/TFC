import { Request, Response, Router } from 'express';
import UsersControll from '../controllers/UsersControll';
import ValidationsUser from '../middlewares/Users/Validations';
import ValidationsToken from '../middlewares/Users/ValidationToken';

const router = Router();

const UserController = new UsersControll();

router.post(
  '/',
  ValidationsUser.inputsValidations,
  (req:Request, res:Response) => UserController.login(req, res),
);

router.get(
  '/role',
  ValidationsToken.validateToken,
  (req:Request, res:Response) => UserController.getRoleUser(req, res),
);

export default router;

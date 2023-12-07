import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesControll';
import ValidationsToken from '../middlewares/Users/ValidationToken';
import ValidationsMatches from '../middlewares/Matches/validations';

const MatchesControll = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => MatchesControll.getAllMatches(req, res));

router.patch(
  '/:id',
  ValidationsToken.validateToken,
  (req:Request, res:Response) => MatchesControll.updatedMatches(req, res),
);

router.patch(
  '/:id/finish',
  ValidationsToken.validateToken,
  (req:Request, res:Response) => MatchesControll.updatedInProgress(req, res),
);

router.post(
  '/',
  ValidationsToken.validateToken,
  ValidationsMatches.TeamsValidations,
  (req:Request, res:Response) => MatchesControll.createMatch(req, res),
);

export default router;

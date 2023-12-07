import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesControll';

const MatchesControll = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => MatchesControll.getAllMatches(req, res));

export default router;

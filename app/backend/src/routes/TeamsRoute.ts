import { Request, Response, Router } from 'express';
import TeamsControll from '../controllers/TeamsControll';

const router = Router();

const teamsControll = new TeamsControll();

router.get('/', (req:Request, res:Response) => teamsControll.getTeams(req, res));

router.get('/:id', (req:Request, res:Response) => teamsControll.getTeamById(req, res));

export default router;

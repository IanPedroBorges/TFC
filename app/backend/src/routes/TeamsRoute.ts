import { Router } from 'express';
import TeamsControll from '../controllers/TeamsControll';

const router = Router();

const teamsControll = new TeamsControll();

router.get('/', teamsControll.getTeams);

router.get('/:id', teamsControll.getTeamById);

export default router;

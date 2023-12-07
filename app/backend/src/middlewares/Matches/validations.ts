import { NextFunction, Request, Response } from 'express';
import TeamsModel from '../../models/TeamsModel';

export default class ValidationsMatches {
  static async TeamsValidations(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void > {
    const { homeTeamId, awayTeamId } = req.body;
    const TeamModel = new TeamsModel();
    const TeamA = await TeamModel.findById(homeTeamId);
    const TeamB = await TeamModel.findById(awayTeamId);
    if (!TeamA || !TeamB) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (TeamA.id === TeamB.id) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

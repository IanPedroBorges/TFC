import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { LeaderboardInterface,
  LeaderboardInterfaceMatches,
  initialLeaderboard } from '../Interfaces/Leaderboard/LeaderboardInterface';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import { MatchesInterface } from '../Interfaces/matches/Matchesinterface';

export default class LeaderboardServices {
  constructor(private modelTeams = new TeamsModel(), private modelMatches = new MatchesModel()) {}

  async getLeaderboard(homeOrAway: string): Promise<ServiceResponse<LeaderboardInterface[]>> {
    const allTeams = await this.modelTeams.findAll();
    const resultTeamsMatches = await Promise.all(allTeams
      .map(async (team): Promise<LeaderboardInterface> => {
        const matches = await this.getMatches(team.id, homeOrAway);
        return { name: team.teamName, ...matches };
      }));
    const result = LeaderboardServices.orderLeaderboard(resultTeamsMatches);
    return { status: 'ok', data: result };
  }

  private async getMatches(id: number, homeOrAway: string): Promise<LeaderboardInterfaceMatches> {
    const matches = await this.modelMatches.getAllMatchesHomeTeams(id, homeOrAway);
    const tratedReturn = LeaderboardServices.tratedReturnMatches(matches, homeOrAway);
    return tratedReturn;
  }

  private static tratedReturnMatches(matches: MatchesInterface[], homeOrAway: string)
    : LeaderboardInterfaceMatches {
    return matches.reduce((acc, curr) => {
      const t1 = homeOrAway === 'home' ? 'home' : 'away';
      const t2 = homeOrAway === 'home' ? 'away' : 'home';
      const pnts = LeaderboardServices.verifyWinner(curr[`${t1}TeamGoals`], curr[`${t2}TeamGoals`]);
      return {
        ...acc,
        totalPoints: acc.totalPoints + pnts,
        totalGames: matches.length,
        totalVictories: acc.totalVictories + (pnts === 3 ? 1 : 0),
        totalDraws: acc.totalDraws + (pnts === 1 ? 1 : 0),
        totalLosses: acc.totalLosses + (pnts === 0 ? 1 : 0),
        goalsFavor: acc.goalsFavor + curr[`${t1}TeamGoals`],
        goalsOwn: acc.goalsOwn + curr[`${t2}TeamGoals`],
        goalsBalance: acc.goalsBalance + curr[`${t1}TeamGoals`] - curr[`${t2}TeamGoals`],
        efficiency: `${(((acc.totalPoints + pnts) / (acc.totalGames * 3)) * 100).toFixed(2)}`,
      };
    }, initialLeaderboard);
  }

  private static verifyWinner(homeTeam:number, awayTeam:number): number {
    if (homeTeam > awayTeam) return 3;
    if (homeTeam < awayTeam) return 0;
    return 1;
  }

  private static orderLeaderboard(leaderboard: LeaderboardInterface[]): LeaderboardInterface[] {
    const result = leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
    return result;
  }
}

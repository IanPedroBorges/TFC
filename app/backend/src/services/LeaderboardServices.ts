import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { LeaderboardInterface,
  LeaderboardInterfaceMatches,
  initialLeaderboard } from '../Interfaces/Leaderboard/LeaderboardInterface';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

export default class LeaderboardServices {
  constructor(private modelTeams = new TeamsModel(), private modelMatches = new MatchesModel()) {}

  async getLeaderboardHome(): Promise<ServiceResponse<LeaderboardInterface[]>> {
    const allTeams = await this.modelTeams.findAll();
    console.log(allTeams);
    const resultTeamsMatches = await Promise.all(allTeams
      .map(async (team): Promise<LeaderboardInterface> => {
        const matches = await this.getMatchesInHome(team.id);
        return { name: team.teamName, ...matches };
      }));
    const result = LeaderboardServices.orderLeaderboard(resultTeamsMatches);
    return { status: 'ok', data: result };
  }

  private async getMatchesInHome(id: number): Promise<LeaderboardInterfaceMatches> {
    const matches = await this.modelMatches.getAllMatchesHomeTeams(id);
    const tratedReturn = matches.reduce((acc, curr) => {
      const pontos = LeaderboardServices.verifyWinner(curr.homeTeamGoals, curr.awayTeamGoals);
      return {
        ...acc,
        totalPoints: acc.totalPoints + pontos,
        totalGames: matches.length,
        totalVictories: acc.totalVictories + (pontos === 3 ? 1 : 0),
        totalDraws: acc.totalDraws + (pontos === 1 ? 1 : 0),
        totalLosses: acc.totalLosses + (pontos === 0 ? 1 : 0),
        goalsFavor: acc.goalsFavor + curr.homeTeamGoals,
        goalsOwn: acc.goalsOwn + curr.awayTeamGoals,
        goalsBalance: acc.goalsBalance + curr.homeTeamGoals - curr.awayTeamGoals,
        efficiency: `${(((acc.totalPoints + pontos) / (acc.totalGames * 3)) * 100).toFixed(2)}`,
      };
    }, initialLeaderboard);
    return tratedReturn;
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

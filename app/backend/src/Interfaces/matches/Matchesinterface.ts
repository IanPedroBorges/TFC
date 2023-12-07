export interface MatchesInterface {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchesReturnModel {
  id: number,
  homeTeamId: number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress: boolean,
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  }
}

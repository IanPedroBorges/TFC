const mockAllMatchesReturnTrue = [ {dataValues: {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },}]

const mockAllMatchesReturnFalse = [ {dataValues: {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },}]

export { mockAllMatchesReturnFalse, mockAllMatchesReturnTrue };
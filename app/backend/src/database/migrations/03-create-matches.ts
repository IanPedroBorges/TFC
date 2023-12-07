import { Model, QueryInterface, DataTypes } from 'sequelize';
import IExample from '../../Interfaces/Example';
import { MatchesInterface } from '../../Interfaces/matches/Matchesinterface';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<MatchesInterface>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
        homeTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'home_team_id',
        },
        homeTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'home_team_goals',
        },
        awayTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'away_team_id',
        },
        awayTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'away_team_goals',
        },
        inProgress: {
            type: DataTypes.BOOLEAN,
            field: 'in_progress',
            defaultValue: true,
        },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
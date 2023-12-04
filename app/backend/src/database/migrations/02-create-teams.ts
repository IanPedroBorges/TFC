import { Model, QueryInterface, DataTypes } from 'sequelize';
import { TeamsInterface } from '../../Interfaces/teams/TeamsInterface';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TeamsInterface>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
import SequelizeUser from '../database/models/SequelizeUser';
import { UserReturnModel } from '../Interfaces/users/UserInterface';
import { ICrudModelLogin } from '../Interfaces/ICrudModel';

export default class UsersModel implements ICrudModelLogin<UserReturnModel> {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<UserReturnModel | null> {
    const user = await this.model
      .findOne({ where: { email } });
    if (!user) return null;
    return user.dataValues;
  }

  async findRole(id: number): Promise<UserReturnModel | null> {
    const user = await this.model
      .findOne({ where: { id } });
    if (!user) return null;
    return user.dataValues;
  }
}

import { UserInterfaceCreate, UserReturnModel } from '../Interfaces/users/UserInterface';
import UsersModel from '../models/UsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import bcrypt from '../utils/bcrypt';

export default class UsersServices {
  constructor(private usersModel = new UsersModel()) {
  }

  public async login(data: UserInterfaceCreate): Promise<ServiceResponse<{ token: string }>> {
    const token = await this.verifyUser(data);
    if (!token) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    return { status: 'ok', data: { token } };
  }

  private async verifyUser(data: UserInterfaceCreate): Promise<string | null> {
    const user = await this.usersModel.findByEmail(data.email);
    if (!user) return null;
    const isValidPassword = bcrypt.compareHash(data.password, user.password);
    if (!isValidPassword) return null;
    const token = UsersServices.createToken(user);
    return token;
  }

  static createToken(user: UserReturnModel): string {
    return JWT.sign(user);
  }

  public async getRoleUser(id: number): Promise<ServiceResponse<{ role:string }>> {
    const user = await this.usersModel.findRole(id);
    if (!user) return { status: 'notFound', data: { message: 'User not found' } };
    return { status: 'ok', data: { role: user.role } };
  }
}

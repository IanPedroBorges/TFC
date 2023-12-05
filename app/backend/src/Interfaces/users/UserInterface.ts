export interface UserInterface extends UserReturnModel {
  username: string;
}

export interface UserInterfaceCreate {
  email: string;
  password: string;
}

export interface UserReturnModel extends UserInterfaceCreate {
  id: number;
  role: string;
}

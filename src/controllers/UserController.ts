import User, { UserData, UpdateUserBody, UserBody } from '../models/User';

export default class UserController {
  private model: User;
  constructor() {
    this.model = new User();
  }

  public getUser(id: string): UserData {
    return this.model.getUser(id);
  }

  public createUser(user: UserBody): UserData {
    return this.model.createUser(user);
  }

  public deleteUser(id: string): void {
    this.model.deleteUser(id);
  }

  public updateUser(id: string, user: UpdateUserBody): UserData {
    return this.model.updateUser(id, user);
  }
}
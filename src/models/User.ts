import { createHash } from 'crypto';
import moment from 'moment';
import { pick } from 'lodash';
import GeneralError from '../errors/GeneralError';
import NotFoundError from '../errors/NotFoundError';
import UserDataError from '../errors/UserDataError';
import { validateBody, validateUserDataForUpdate } from '../utils/validation';

export interface UserData {
  id: string,
  email: string,
  givenName: string,
  familyName: string,
  created: string,
};

export type UserBody = Omit<UserData, 'id' | 'created'>;

export interface UpdateUserBody {
  id: string,
  email?: string,
  givenName?: string,
  familyName?: string,
}

export default class User {
  private storage: Map<string, UserData>;

  constructor() {
    this.storage = new Map();
  }

  createUser(user: UserBody): UserData {
    if (!validateBody(user)) {
      throw new UserDataError({ msg: 'User data is wrong' });
    }

    const { email } = user;

    const id = this.hash(email);

    if (this.storage.has(id)) {
      throw new UserDataError({ msg: `Email address ${email} already in use` });
    }

    const newUser = {
      ...user,
      id,
      created: moment().format(),
    };

    this.storage.set(id, newUser);
    return newUser;
  }

  getUser(id: string): UserData {
    const user = this.storage.get(id);

    if (!user) {
      throw new NotFoundError({ msg: `User with id ${id} not found` });
    }

    return user;
  }

  deleteUser(id: string): void {
    if (!this.storage.has(id)) {
      throw new NotFoundError({ msg: `User with id ${id} not found` });
    }

    if (!this.storage.delete(id)) {
      throw new GeneralError({ msg: `User with id ${id} was not deleted` });
    }
  }

  updateUser(userId: string, body: UpdateUserBody): UserData {
    const user = this.getUser(userId);
    const userDataToUpdate = pick(body, ['email', 'givenName', 'familyName']);

    if (!validateUserDataForUpdate(userDataToUpdate)) {
      throw new UserDataError({ msg: 'User data is wrong' });
    }
    const id = this.hash(body.email || user.email);

    const userToUpdate = {
      ...user,
      ...userDataToUpdate,
      id,
    };

    this.storage.set(id, userToUpdate);

    if (id !== userId) {
      this.deleteUser(userId);
    }
    return userToUpdate;
  }

  private hash(email: string): string {
    return createHash('md5').update(email).digest('base64');
  }
}
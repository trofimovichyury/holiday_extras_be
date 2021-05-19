import { UserBody, UpdateUserBody } from "../models/User";

const validateEmail = (email: string = ''): boolean => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

const validateBody = (body: UserBody): boolean => {
  return validateEmail(body.email) && !!body.familyName && !!body.givenName;
};

const validateUserDataForUpdate = (data: Omit<UpdateUserBody, 'id'>): boolean => {
  if (data.hasOwnProperty('email') && !validateEmail(data.email)) {
    return false;
  }

  if (data.hasOwnProperty('familyName') && !data.familyName) {
    return false;
  }

  if (data.hasOwnProperty('givenName') && !data.givenName) {
    return false;
  }

  return true;
}

export {
  validateBody,
  validateEmail,
  validateUserDataForUpdate,
};

import { ErrorType } from "./types";

export default class GeneralError extends Error {
  constructor(public error: ErrorType) {
    super(JSON.stringify(error));
  }
}
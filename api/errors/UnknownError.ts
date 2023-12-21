import * as Enums from "../enums.js";

/**
 * @name UnknownError
 * @description Error thrown on unknown conditions.
 */
export class UnknownError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "UnknownError";
    this.code = Enums.ErrorCodes.UnknownError;
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

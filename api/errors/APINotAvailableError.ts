import * as Enums from "../enums.js";

/**
 * @name APINotAvailableError
 * @description Error thrown when the API is not available.
 */
export class APINotAvailableError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "APINotAvailableError";
    this.code = Enums.ErrorCodes.APIBlocked;
    Object.setPrototypeOf(this, APINotAvailableError.prototype);
  }
}

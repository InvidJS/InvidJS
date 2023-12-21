import * as Enums from "../enums.js";

/**
 * @name APIError
 * @description Error thrown when the API returns an error.
 */
export class APIError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "APIError";
    this.code = Enums.ErrorCodes.APIError;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

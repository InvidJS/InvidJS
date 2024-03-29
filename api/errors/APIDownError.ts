import * as Enums from "../enums.js";

/**
 * @name APIDownError
 * @description Error thrown when the API is not available.
 */
export class APIDownError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "APIDownError";
    this.code = Enums.ErrorCodes.APIDown;
    this.isFatal = false;
    Object.setPrototypeOf(this, APIDownError.prototype);
  }
}

import * as Enums from "../enums.js";

/**
 * @name ServerError
 * @description Error thrown when the server returns a 500.
 */
export class ServerError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
    this.code = Enums.ErrorCodes.ServerError;
    this.isFatal = false;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

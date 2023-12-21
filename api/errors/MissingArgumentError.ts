import * as Enums from "../enums.js";

/**
 * @name MissingArgumentError
 * @description Error thrown when a required argument is missing.
 */
export class MissingArgumentError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "MissingArgumentError";
    this.code = Enums.ErrorCodes.MissingArgument;
    Object.setPrototypeOf(this, MissingArgumentError.prototype);
  }
}

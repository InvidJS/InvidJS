import * as Enums from "../enums.js";

/**
 * @name MissingArgumentError
 * @description Error thrown when a required argument is missing.
 */
export class MissingArgumentError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "MissingArgumentError";
    this.code = Enums.ErrorCodes.MissingArgument;
    this.isFatal = true;
    Object.setPrototypeOf(this, MissingArgumentError.prototype);
  }
}

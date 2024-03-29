import * as Enums from "../enums.js";

/**
 * @name InvalidArgumentError
 * @description Error thrown when a required argument is invalid.
 */
export class InvalidArgumentError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
    this.code = Enums.ErrorCodes.InvalidArgument;
    this.isFatal = true;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}

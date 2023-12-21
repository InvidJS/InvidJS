import * as Enums from "../enums.js";

/**
 * @name InvalidArgumentError
 * @description Error thrown when an argument is invalid.
 */
export class InvalidArgumentError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
    this.code = Enums.ErrorCodes.InvalidArgument;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}

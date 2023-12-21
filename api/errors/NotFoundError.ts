import * as Enums from "../enums.js";

/**
 * @name NotFoundError
 * @description Error thrown when the content is invalid.
 */
export class NotFoundError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.code = Enums.ErrorCodes.InvalidContent;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

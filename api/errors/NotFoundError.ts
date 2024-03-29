import * as Enums from "../enums.js";

/**
 * @name NotFoundError
 * @description Error thrown when the content is invalid.
 */
export class NotFoundError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.code = Enums.ErrorCodes.InvalidContent;
    this.isFatal = true;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

import * as Enums from "../enums.js";

/**
 * @name NotFoundError
 * @description Error thrown when the requested content is not found.
 */
export class NotFoundError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.code = Enums.ErrorCodes.NotFound;
    this.isFatal = true;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

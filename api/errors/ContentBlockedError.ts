import * as Enums from "../enums.js";

/**
 * @name ContentBlockedError
 * @description Error thrown when the requested content is blocked.
 */
export class ContentBlockedError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "ContentBlockedError";
    this.code = Enums.ErrorCodes.ContentBlocked;
    this.isFatal = true;
    Object.setPrototypeOf(this, ContentBlockedError.prototype);
  }
}

import * as Enums from "../enums.js";

/**
 * @name BlockedVideoError
 * @description Error thrown when the video is blocked.
 */
export class BlockedVideoError extends Error {
  protected code: number;
  protected isFatal: boolean;
  constructor(message: string) {
    super(message);
    this.name = "BlockedVideoError";
    this.code = Enums.ErrorCodes.BlockedVideo;
    this.isFatal = true;
    Object.setPrototypeOf(this, BlockedVideoError.prototype);
  }
}

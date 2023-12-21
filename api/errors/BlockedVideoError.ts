import * as Enums from "../enums.js";

/**
 * @name BlockedVideoError
 * @description Error thrown when the video is blocked.
 */
export class BlockedVideoError extends Error {
  protected code: number;
  constructor(message: string) {
    super(message);
    this.name = "BlockedVideoError";
    this.code = Enums.ErrorCodes.BlockedVideo;
    Object.setPrototypeOf(this, BlockedVideoError.prototype);
  }
}

/**
 * @name MissingArgumentError
 * @description Error thrown when a required argument is missing.
 */
export class MissingArgumentError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "MissingArgumentError";
    this.code = ErrorCodes.MissingArgument;
    Object.setPrototypeOf(this, MissingArgumentError.prototype);
  }
}

/**
 * @name InvalidArgumentError
 * @description Error thrown when an argument is invalid.
 */
export class InvalidArgumentError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgumentError";
    this.code = ErrorCodes.InvalidArgument;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}

/**
 * @name APINotAvailableError
 * @description Error thrown when the API is not available.
 */
export class APINotAvailableError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "APINotAvailableError";
    this.code = ErrorCodes.APIBlocked;
    Object.setPrototypeOf(this, APINotAvailableError.prototype);
  }
}

/**
 * @name APIError
 * @description Error thrown when the API returns an error.
 */
export class APIError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "APIError";
    this.code = ErrorCodes.APIError;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * @name BlockedVideoError
 * @description Error thrown when the video is blocked.
 */
export class BlockedVideoError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "BlockedVideoError";
    this.code = ErrorCodes.BlockedVideo;
    Object.setPrototypeOf(this, BlockedVideoError.prototype);
  }
}

/**
 * @name NotFoundError
 * @description Error thrown when the content is invalid.
 */
export class NotFoundError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.code = ErrorCodes.InvalidContent;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * @name ErrorCodes
 * @description Error codes.
 */
export enum ErrorCodes {
  MissingArgument = 10000,
  InvalidArgument = 10001,
  APIBlocked = 10002,
  APIError = 10003,
  BlockedVideo = 10004,
  InvalidContent = 10005,
}

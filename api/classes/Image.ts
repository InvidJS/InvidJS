import * as Enums from "../enums.js";

/**
 * @name Image
 * @description Image object, used for thumbnails or banners.
 *
 * @param {string} url - Image URL.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {Enums.ImageQuality} [quality] - Image quality (thumbnails only).
 */
export class Image {
  public url: string;
  public width: number;
  public height: number;
  public quality?: Enums.ImageQuality;
  constructor(
    url: string,
    width: number,
    height: number,
    quality?: Enums.ImageQuality,
  ) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.quality = quality;
  }
}

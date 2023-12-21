import * as Enums from "../enums.js";

/**
 * @name Format
 * @description Video or audio format.
 *
 * @param {string} source - Source of the format.
 * @param {string} tag - ID of the format.
 * @param {string} type - Type of the format (codecs).
 * @param {string} container - Container of the format (mp4, webm, etc.).
 * @param {Enums.AudioQuality} [audio_quality] - Quality (audio only).
 * @param {number} [audio_sampleRate] -  Sample rate (audio only).
 * @param {number} [audio_channels] - Number of channels (audio only).
 */
export class Format {
  public source: string;
  public tag: string;
  public type: string;
  public container: string;
  public audio_quality?: Enums.AudioQuality;
  public audio_sampleRate?: number;
  public audio_channels?: number;
  constructor(
    source: string,
    tag: string,
    type: string,
    container: string,
    audio_quality?: Enums.AudioQuality,
    audio_sampleRate?: number,
    audio_channels?: number,
  ) {
    this.source = source;
    this.tag = tag;
    this.type = type;
    this.container = container;
    this.audio_quality = audio_quality;
    this.audio_sampleRate = audio_sampleRate;
    this.audio_channels = audio_channels;
  }
}

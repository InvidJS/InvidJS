import { Format } from "./Format.js";
import { Image } from "./Image.js";

/**
 * @name Video
 * @description Video object. Can be Minimal, Basic or Full.
 * @param {string} title - Title of the video.
 * @param {string} id - ID of the video.
 * @param {string} url - URL of the video.
 * @param {Array<Format>} [formats] - List of available formats (basic or full only).
 * @param {number} [lengthSeconds] - Length of the video in seconds (basic or full only).
 * @param {number} [length] - Humanly-readable length of the video (basic or full only).
 * @param {string} [author] - Author username. (full only).
 * @param {string} [author_id] - Author ID. (full only).
 * @param {string} [description] - Description of the video (full only).
 * @param {string} [date] - Date of publishing (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {number} [likes] - Number of likes (full only).
 * @param {number} [dislikes] - Number of dislikes (full only).
 * @param {Array<Image>} [thumbnails] - Video thumbnails (full only).
 */
export class Video {
  public title: string;
  public id: string;
  public url: string;
  public formats?: Array<Format>;
  public lengthSeconds?: number;
  public length?: string;
  public author?: string;
  public author_id?: string;
  public description?: string;
  public date?: string;
  public views?: number;
  public likes?: number;
  public dislikes?: number;
  public thumbnails?: Array<Image>;
  constructor(
    title: string,
    id: string,
    url: string,
    formats?: Array<Format>,
    lengthSeconds?: number,
    length?: string,
    author?: string,
    author_id?: string,
    description?: string,
    date?: string,
    views?: number,
    likes?: number,
    dislikes?: number,
    thumbnails?: Array<Image>,
  ) {
    this.title = title;
    this.id = id;
    this.url = url;
    this.formats = formats;
    this.lengthSeconds = lengthSeconds;
    this.length = length;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.date = date;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.thumbnails = thumbnails;
  }
}

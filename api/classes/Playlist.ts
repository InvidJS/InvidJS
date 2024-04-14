import { Video } from "./Video.js";
import { Image } from "./Image.js";

/**
 * @name Playlist
 * @description Playlist object. Can be Minimal, Basic or Full.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} id - ID of the playlist.
 * @param {string} url - URL of the playlist.
 * @param {Array<Video>} [videos] - Videos in the playlist (basic or full only).
 * @param {number} [videoCount] - Number of videos in the playlist (basic or full only).
 * @param {string} [author] - Author username (full only).
 * @param {string} [author_id] - Author ID (full only).
 * @param {string} [description] - Description of the playlist (full only).
 * @param {Image} [thumbnail] - Thumbnail of the playlist (full only).
 */
export class Playlist {
  public title: string;
  public id: string;
  public url: string;
  public videos?: Array<Video>;
  public videoCount?: number;
  public author?: string;
  public author_id?: string;
  public description?: string;
  public thumbnail?: Image;
  constructor(
    title: string,
    id: string,
    url: string,
    videos?: Array<Video>,
    videoCount?: number,
    author?: string,
    author_id?: string,
    description?: string,
    thumbnail?: Image,
  ) {
    this.title = title;
    this.id = id;
    this.url = url;
    this.videos = videos;
    this.videoCount = videoCount;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}

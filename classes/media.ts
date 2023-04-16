/**
 * @name Channel
 * @description Channel object.
 * @param {string} name - Channel name.
 * @param {string} id - Channel ID.
 * @param {number} [subs] - Number of subscribers (basic or full only).
 * @param {string} [description] - Channel description (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {boolean} [isVerified] - Is channel verified? (full only)
 * @param {Array<Video>} [latest_videos] - Latest videos (full only).
 */
export class Channel {
  public name: string;
  public id: string;
  public subs?: number;
  public description?: string;
  public views?: number;
  public isVerified?: boolean;
  public latest_videos?: Array<Video>;
  constructor(
    name: string,
    id: string,
    subs?: number,
    description?: string,
    views?: number,
    isVerified?: boolean,
    latest_videos?: Array<Video>
  ) {
    this.name = name;
    this.id = id;
    this.subs = subs;
    this.description = description;
    this.views = views;
    this.isVerified = isVerified;
    this.latest_videos = latest_videos;
  }
}

/**
 * @name Playlist
 * @description Playlist object. Can be Minimal, Basic or Full.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} id - ID of the playlist.
 * @param {Array<Video>} [videos] - Videos in the playlist (basic or full only).
 * @param {string} [author] - Author username (full only).
 * @param {string} [author_id] - Author ID (full only).
 * @param {string} [description] - Description of the playlist (full only).
 * @param {number} [videoCount] - Number of videos in the playlist (full only).
 */
export class Playlist {
  public title: string;
  public id: string;
  public videos?: Array<Video>;
  public author?: string;
  public author_id?: string;
  public description?: string;
  public videoCount?: number;
  constructor(
    title: string,
    id: string,
    videos?: Array<Video>,
    author?: string,
    author_id?: string,
    description?: string,
    videoCount?: number
  ) {
    this.title = title;
    this.id = id;
    this.videos = videos;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.videoCount = videoCount;
  }
}

/**
 * @name Video
 * @description Video object. Can be Minimal, Basic or Full.
 * @param {string} title - Title of the video.
 * @param {string} id - ID of the video.
 * @param {Array<Format>} [formats] - List of available formats (basic or full only).
 * @param {number} [length] - Length of the video in seconds (basic or full only).
 * @param {number} [lengthString] - Humanly-readable length of the video (basic or full only).
 * @param {string} [author] - Author username. (full only).
 * @param {string} [author_id] - Author ID. (full only).
 * @param {string} [description] - Description of the video (full only).
 * @param {string} [published] - Date of publishing (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {number} [likes] - Number of likes (full only).
 * @param {number} [dislikes] - Number of dislikes (full only).
 */
export class Video {
  public title: string;
  public id: string;
  public formats?: Array<Format>;
  public length?: number;
  public lengthString?: string;
  public author?: string;
  public author_id?: string;
  public description?: string;
  public published?: string;
  public views?: number;
  public likes?: number;
  public dislikes?: number;
  constructor(
    title: string,
    id: string,
    formats?: Array<Format>,
    length?: number,
    lengthString?: string,
    author?: string,
    author_id?: string,
    description?: string,
    published?: string,
    views?: number,
    likes?: number,
    dislikes?: number,
  ) {
    this.title = title;
    this.id = id;
    this.formats = formats;
    this.length = length;
    this.lengthString = lengthString;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.published = published;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
  }
}

/**
 * @name Format
 * @description Video or audio format.
 *
 * @param {string} url - URL of the format source.
 * @param {string} tag - ID of the format.
 * @param {string} type - Type of the format (codecs).
 * @param {string} container - Container of the format (mp4, webm, etc.).
 * @param {string} [quality] - Quality (audio only).
 * @param {number} [sampleRate] -  Sample rate (audio only).
 * @param {number} [channels] - Number of channels (audio only).
 */
export class Format {
  public url: string;
  public tag: string;
  public type: string;
  public container: string;
  public quality?: string;
  public sampleRate?: number;
  public channels?: number;
  constructor(
    url: string,
    tag: string,
    type: string,
    container: string,
    quality?: string,
    sampleRate?: number,
    channels?: number
  ) {
    this.url = url;
    this.tag = tag;
    this.type = type;
    this.container = container;
    this.quality = quality;
    this.sampleRate = sampleRate;
    this.channels = channels;
  }
}

/**
 * @name Image
 * @description Image object, used for thumbnails or banners.
 *
 * @param {string} url - Image URL.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {string} [quality] - Image quality (thumbnails only)
 */
export class Image {
  public url: string;
  public width: number;
  public height: number;
  public quality?: string;
  constructor(url: string, width: number, height: number, quality: string) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.quality = quality;
  }
}

/**
 * @name Comment
 * @description Comment object.
 *
 * @param {string} author - Author username.
 * @param {string} author_id - Author ID.
 * @param {string} text - Comment text.
 */
export class Comment {
  public author: string;
  public author_id: string;
  public text: string;
  constructor(author: string, author_id: string, text: string) {
    this.author = author;
    this.author_id = author_id;
    this.text = text;
  }
}

/**
 * @name AudioQuality
 * @description Possible values for audio quality.
 */
export enum AudioQuality {
  Low = "AUDIO_QUALITY_LOW",
  Medium = "AUDIO_QUALITY_MEDIUM",
}

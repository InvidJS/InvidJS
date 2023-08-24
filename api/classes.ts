import axios from "axios";
import * as Enums from "./enums";
import { APINotAvailableError, APIError } from "./errors";

/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} region  - Region of the instance.
 * @param {boolean} cors_allowed  - Is CORS allowed?
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {Enums.InstanceTypes} type  - Type of the instance.
 * @param {string} url  - URL of the instance.
 * @param {number} [health] - Latest reported health of the instance.
 */
export class Instance {
  public region: string;
  public cors_allowed: boolean;
  public api_allowed: boolean;
  public type: Enums.InstanceTypes;
  public url: string;
  public health?: number;
  constructor(
    region: string,
    cors_allowed: boolean,
    api_allowed: boolean,
    type: Enums.InstanceTypes,
    url: string,
    health?: number
  ) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.url = url;
    this.health = health;
  }

  /**
 * @name fetchStats
 * @description Fetches stats of an instance.
 * @example await instance.fetchStats();
 * @returns {Promise<InstanceStats>} Instance stats object.
 */
  async fetchStats(): Promise<InstanceStats> {
    if (this.api_allowed === false || this.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let stats!: InstanceStats;
  await axios
    .get(`${this.url}/api/v1/stats`)
    .then((res) => {
      let software = new SoftwareStats(
        res.data.software.name,
        res.data.software.version,
        res.data.software.branch
      );
      let users = new UserStats(
        res.data.usage.users.total,
        res.data.usage.users.activeHalfyear,
        res.data.usage.users.activeMonth,
        res.data.openRegistrations
      );
      stats = new InstanceStats(software, users);
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return stats;
  }
}

/**
 * @name InstanceStats
 * @description Statistics about an instance.
 *
 * @param {SoftwareStats} software - Software stats.
 * @param {UserStats} users - User stats.
 */
export class InstanceStats {
  public software: SoftwareStats;
  public users: UserStats;
  constructor(software: SoftwareStats, users: UserStats) {
    this.software = software;
    this.users = users;
  }
}

/**
 * @name SoftwareStats
 * @description Statistics about software.
 *
 * @param {string} name - Name of the software (usually Invidious).
 * @param {string} version - Version of the software.
 * @param {string} branch - Cloned branch.
 */
export class SoftwareStats {
  public name: string;
  public version: string;
  public branch: string;
  constructor(name: string, version: string, branch: string) {
    this.name = name;
    this.version = version;
    this.branch = branch;
  }
}

/**
 * @name UserStats
 * @description Statistics about users.
 *
 * @param {number} total - Total users.
 * @param {number} halfYear - Users active in the last 6 months.
 * @param {number} month - Users active in the last month.
 * @param {boolean} reg_allowed - Is registration allowed?
 */
export class UserStats {
  public total: number;
  public halfYear: number;
  public month: number;
  public reg_allowed: boolean;
  constructor(
    total: number,
    halfYear: number,
    month: number,
    reg_allowed: boolean
  ) {
    this.total = total;
    this.halfYear = halfYear;
    this.month = month;
    this.reg_allowed = reg_allowed;
  }
}

/**
 * @name Channel
 * @description Channel object. Can be Minimal, Basic or Full.
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
 * @param {number} [videoCount] - Number of videos in the playlist (basic or full only).
 * @param {string} [author] - Author username (full only).
 * @param {string} [author_id] - Author ID (full only).
 * @param {string} [description] - Description of the playlist (full only).
 * @param {Image} [thumbnail] - Thumbnail of the playlist (full only).
 */
export class Playlist {
  public title: string;
  public id: string;
  public videos?: Array<Video>;
  public videoCount?: number;
  public author?: string;
  public author_id?: string;
  public description?: string;
  public thumbnail?: Image;
  constructor(
    title: string,
    id: string,
    videos?: Array<Video>,
    videoCount?: number,
    author?: string,
    author_id?: string,
    description?: string,
    thumbnail?: Image
  ) {
    this.title = title;
    this.id = id;
    this.videos = videos;
    this.videoCount = videoCount;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}

/**
 * @name Video
 * @description Video object. Can be Minimal, Basic or Full.
 * @param {string} title - Title of the video.
 * @param {string} id - ID of the video.
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
    thumbnails?: Array<Image>
  ) {
    this.title = title;
    this.id = id;
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
    audio_channels?: number
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
    quality?: Enums.ImageQuality
  ) {
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

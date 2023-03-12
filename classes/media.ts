/**
 * @name Playlist
 * @description Playlist object with all information.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} id - ID of the playlist.
 * @param {string} author - Author of the playlist.
 * @param {string} description - Description of the playlist.
 * @param {number} videoCount - Number of videos in the playlist.
 * @param {Array<Video>} videos - Array of videos in the playlist.
 */
export class Playlist {
  title: string;
  id: string;
  videos?: Array<Video>;
  author?: string;
  description?: string;
  videoCount?: number;
  constructor(
    title: string,
    id: string,
    videos?: Array<Video>,
    author?: string,
    description?: string,
    videoCount?: number,
  ) {
    this.title = title;
    this.id = id;
    this.videos = videos;
    this.author = author;
    this.description = description;
    this.videoCount = videoCount;
  }
}

/**
 * @name Video
 * @description Video object.
 * @param {string} title - Title of the video
 * @param {string} id - Video ID
 * @param {Array<Format>} formats - List of available formats
 * @param {string} description - Description of the video
 * @param {string} published - Date of publishing
 * @param {number} views - Number of views
 * @param {number} likes - Number of likes
 * @param {number} dislikes - Number of dislikes
 * @param {number} length - Length of the video
 */
export class Video {
  title: string;
  id: string;
  formats?: Array<Format>;
  description?: string;
  published?: string;
  views?: number;
  likes?: number;
  dislikes?: number;
  length?: number;
  constructor(
    title: string,
    id: string,
    formats?: Array<Format>,
    description?: string,
    published?: string,
    views?: number,
    likes?: number,
    dislikes?: number,
    length?: number,
  ) {
    this.title = title;
    this.id = id;
    this.formats = formats;
    this.description = description;
    this.published = published;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.length = length;
  }
}

/**
 * @name Format
 * @description Video or audio format.
 *
 * @param {string} url - Video URL
 * @param {string} tag - ID of the format
 * @param {string} type - Type of the format (codecs)
 * @param {string} container - Container of the format (mp4, webm, etc.)
 * @param {string} quality - Quality of the audio
 * @param {number} sampleRate -  Sample rate of the audio
 * @param {number} channels - Number of channels in the audio
 */
export class Format {
  url: string;
  tag: string;
  type: string;
  container: string;
  quality?: string;
  sampleRate?: number;
  channels?: number;
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

/**
 * @class FullVideo - Full Video Info
 */
export class FullVideo {
  title: string;
  id: string;
  description: string;
  published: string;
  views: number;
  likes: number;
  dislikes: number;
  length: number;
  formats: Array<VideoFormat | AudioFormat>;
  /**
   * @param {string} title - Title of the video
   * @param {string} id - Video ID
   * @param {string} description - Description of the video
   * @param {string} published - Date of publishing
   * @param {number} views - Number of views
   * @param {number} likes - Number of likes
   * @param {number} dislikes - Number of dislikes
   * @param {number} length - Length of the video
   * @param {Array<VideoFormat | AudioFormat>} formats - List of available formats
   */
  constructor(
    title: string,
    id: string,
    description: string,
    published: string,
    views: number,
    likes: number,
    dislikes: number,
    length: number,
    formats: Array<VideoFormat | AudioFormat>
  ) {
    this.title = title;
    this.id = id;
    this.description = description;
    this.published = published;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.length = length;
    this.formats = formats;
  }
}

/**
 * @class BasicVideo - Basic Video Info
 */
export class BasicVideo {
  title: string;
  id: string;
  formats: Array<VideoFormat | AudioFormat>;
  /**
   *
   * @param {string} title - Title of the video
   * @param {string} id - Video ID
   * @param {Array<VideoFormat | AudioFormat>} formats - List of available formats
   */
  constructor(title: string, id: string, formats: Array<VideoFormat | AudioFormat>) {
    this.title = title;
    this.id = id;
    this.formats = formats;
  }
}

/**
 * @class  PlaylistVideo - Playlist Video Info
 */
export class PlaylistVideo {
  title: string;
  id: string;
  /**
   *
   * @param {string} title
   * @param {string} id
   */
  constructor(title: string, id: string) {
    this.title = title;
    this.id = id;
  }
}

/**
 * @class VideoFormat - Video Format
 */
export class VideoFormat {
  url: string;
  tag: any;
  type: string;
  /**
   *
   * @param {string} url - Video URL
   * @param {string} tag - Format ID
   * @param {string} type - Format Type
   */
  constructor(url: string, tag: string, type: string) {
    this.url = url;
    this.tag = tag;
    this.type = type;
  }
}

/**
 * @class AudioFormat - Audio Format
 */
export class AudioFormat {
  url: string;
  tag: string;
  type: string;
  quality: string;
  sampleRate: number;
  channels: number;
  /**
   *
   * @param {string} url - Video URL
   * @param {string} tag - Format ID
   * @param {string} type - Format Type
   * @param {string} quality - Audio Quality
   * @param {number} sampleRate -  Audio Sample Rate
   * @param {number} channels - Audio Channels
   */
  constructor(
    url: string,
    tag: string,
    type: string,
    quality: string,
    sampleRate: number,
    channels: number
  ) {
    this.url = url;
    this.tag = tag;
    this.type = type;
    this.quality = quality;
    this.sampleRate = sampleRate;
    this.channels = channels;
  }
}

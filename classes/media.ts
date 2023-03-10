/**
 * @name FullVideo
 * @description Video object with all information.
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
 * @name BasicVideo
 * @description Video object with only basic information.
 *
 * @param {string} title - Title of the video
 * @param {string} id - Video ID
 * @param {Array<VideoFormat | AudioFormat>} formats - List of available formats
 */
export class BasicVideo {
  title: string;
  id: string;
  formats: Array<VideoFormat | AudioFormat>;
  constructor(
    title: string,
    id: string,
    formats: Array<VideoFormat | AudioFormat>
  ) {
    this.title = title;
    this.id = id;
    this.formats = formats;
  }
}

/**
 * @name PlaylistVideo
 * @description Special video object for playlists.
 *
 * @param {string} title
 * @param {string} id
 */
export class PlaylistVideo {
  title: string;
  id: string;
  constructor(title: string, id: string) {
    this.title = title;
    this.id = id;
  }
}

/**
 * @name VideoFormat
 * @description Format of a video.
 *
 * @param {string} url - Video URL
 * @param {string} tag - ID of the format
 * @param {string} type - Type of the format (codecs)
 * @param {string} container - Container of the format (mp4, webm, etc.)
 */
export class VideoFormat {
  url: string;
  tag: any;
  type: string;
  container: string;
  constructor(url: string, tag: string, type: string, container: string) {
    this.url = url;
    this.tag = tag;
    this.type = type;
    this.container = container;
  }
}

/**
 * @name AudioFormat
 * @description Format of an audio.
 *
 * @param {string} url - Video URL
 * @param {string} tag - ID of the format
 * @param {string} type - Type of the format (codecs)
 * @param {string} container - Container of the format (mp4, webm, etc.)
 * @param {string} quality - Quality of the audio
 * @param {number} sampleRate -  Sample rate of the audio
 * @param {number} channels - Number of channels in the audio
 */
export class AudioFormat {
  url: string;
  tag: string;
  type: string;
  container: string;
  quality: string;
  sampleRate: number;
  channels: number;
  constructor(
    url: string,
    tag: string,
    type: string,
    container: string,
    quality: string,
    sampleRate: number,
    channels: number
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

/**
 * @class FullVideo - Full Video Info
 */
export class FullVideo {
  /**
   * @param {string} title - Title of the video
   * @param {string} id - Video ID
   * @param {string} description - Description of the video
   * @param {string} published - Date of publishing
   * @param {number} views - Number of views
   * @param {number} likes - Number of likes
   * @param {number} dislikes - Number of dislikes
   * @param {number} length - Length of the video
   * @param {Array} formats - List of available formats
   */
  constructor(
    title,
    id,
    description,
    published,
    views,
    likes,
    dislikes,
    length,
    formats
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
  /**
   *
   * @param {string} title - Title of the video
   * @param {string} id - Video ID
   * @param {Array} formats - List of available formats
   */
  constructor(title, id, formats) {
    this.title = title;
    this.id = id;
    this.formats = formats;
  }
}


/**
 * @class  PlaylistVideo - Playlist Video Info
 */
export class PlaylistVideo {
  /**
   * 
   * @param {string} title 
   * @param {string} id 
   */
  constructor(title, id) {
    this.title = title;
    this.id = id;
  }
}

/**
 * @class VideoFormat - Video Format
 */
export class VideoFormat {
  /**
   *
   * @param {string} url - Video URL
   * @param {string} itag - Format ID
   * @param {string} type - Format Type
   */
  constructor(url, tag, type) {
    this.url = url;
    this.tag = tag;
    this.type = type;
  }
}

/**
 * @class AudioFormat - Audio Format
 */
export class AudioFormat {
  /**
   *
   * @param {string} url - Video URL
   * @param {string} tag - Format ID
   * @param {string} type - Format Type
   * @param {string} quality - Audio Quality
   * @param {number} sampleRate -  Audio Sample Rate
   * @param {number} channels - Audio Channels
   */
  constructor(url, tag, type, quality, sampleRate, channels) {
    this.url = url;
    this.tag = tag;
    this.type = type;
    this.quality = quality;
    this.sampleRate = sampleRate;
    this.channels = channels;
  }
}


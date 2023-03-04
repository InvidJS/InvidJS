/**
 * @class FullVideo - Full Video Info
 */
export class FullVideo {
  /**
   * @param {string} title - Title of the video
   * @param {string} description - Description of the video
   * @param {string} published - Date of publishing
   * @param {number} views - Number of views
   * @param {number} likes - Number of likes
   * @param {number} dislikes - Number of dislikes
   * @param {number} length - Length of the video
   * @param {Array} formats - List of formats
   * @param {Array} adaptiveFormats - List of adaptive formats
   */
  constructor(
    title,
    description,
    published,
    views,
    likes,
    dislikes,
    length,
    formats,
    adaptiveFormats
  ) {
    this.title = title;
    this.description = description;
    this.published = published;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.length = length;
    this.formats = formats;
    this.adaptiveFormats = adaptiveFormats;
  }
}

/**
 * @class BasicVideo - Basic Video Info
 */
export class BasicVideo {
  /**
   *
   * @param {string} title
   * @param {Array} formats
   * @param {Array} adaptiveFormats
   */
  constructor(title, formats, adaptiveFormats) {
    this.title = title;
    this.formats = formats;
    this.adaptiveFormats = adaptiveFormats;
  }
}

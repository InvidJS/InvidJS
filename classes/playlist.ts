/**
 * @name FullPlaylist
 * @description Playlist object with all information.
 */
export class FullPlaylist {
  title: string;
  author: string;
  description: string;
  videoCount: number;
  videos: Array<any>;
  /**
   *
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @param {number} videoCount
   * @param {Array<any>} videos
   */
  constructor(
    title: string,
    author: string,
    description: string,
    videoCount: number,
    videos: Array<any>
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.videoCount = videoCount;
    this.videos = videos;
  }
}

/**
 * @name BasicPlaylist
 * @description Playlist object with only basic information.
 */

export class BasicPlaylist {
  title: any;
  videos: Array<any>;
  /**
   *
   * @param {string} title
   * @param {Array<any>} videos
   */
  constructor(title: string, videos: Array<any>) {
    this.title = title;
    this.videos = videos;
  }
}

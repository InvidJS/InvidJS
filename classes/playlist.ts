/**
 * @name FullPlaylist
 * @description Playlist object with all information.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} author - Author of the playlist.
 * @param {string} description - Description of the playlist.
 * @param {number} videoCount - Number of videos in the playlist.
 * @param {Array<any>} videos - Array of videos in the playlist.
 */
export class FullPlaylist {
  title: string;
  author: string;
  description: string;
  videoCount: number;
  videos: Array<any>;
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
 * @param {string} title - Title of the playlist.
 * @param {Array<any>} videos - Array of videos in the playlist.
 */
export class BasicPlaylist {
  title: any;
  videos: Array<any>;
  constructor(title: string, videos: Array<any>) {
    this.title = title;
    this.videos = videos;
  }
}

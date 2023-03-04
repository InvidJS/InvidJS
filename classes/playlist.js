/**
 * @class FullPlaylist - Full Playlist Info
 */
export class FullPlaylist {
    /**
     * 
     * @param {string} title 
     * @param {string} author 
     * @param {string} description 
     * @param {number} videoCount 
     * @param {Array} videos 
     */
    constructor(title, author, description, videoCount, videos) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.videoCount = videoCount;
        this.videos = videos;
    }
}

/**
 * @class BasicPlaylist - Basic Playlist Info
 */

export class BasicPlaylist {
    /**
     * 
     * @param {string} title 
     * @param {Array} videos 
     */
    constructor(title, videos) {
        this.title = title;
        this.videos = videos;
    }
}
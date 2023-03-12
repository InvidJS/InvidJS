/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {string | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} limit - Amount of instances to fetch.
 */
export type InstanceFetchOptions = {
  url?: string;
  type?: "https" | "onion" | "i2p" | "all";
  region?: string;
  api_allowed?: boolean | "any";
  limit?: number;
};

/**
 * @name PlaylistFetchOptions
 * @description Playlist fetch filter.
 * @param {string | undefined} playlist_type - Type of the playlist to return.
 * @param {number | undefined} limit - Amount of videos to return.
 */
export type PlaylistFetchOptions = {
  playlist_type?: "full" | "basic" | "minimal";
  limit?: number;
};

/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} type - Type of the video to return.
 */
export type VideoFetchOptions = {
  type?: "full" | "basic" | "minimal";
};

/**
 * @name SearchOptions
 * @description Search engine options.
 * @param {string | undefined} type - Type of the content to search.
 * @param {string | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many videos to return.
 */
export type SearchOptions = {
  type?: "video" | "playlist" | "channel" | "movie" | "show" | "all";
  sorting?: "relevance" | "rating" | "upload_date" | "view_count";
  limit?: number;
}

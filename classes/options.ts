/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {string | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} limit - How many instances to fetch.
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
 * @param {string | undefined} videos_type - Type of the videos to return.
 * @param {number | undefined} limit - How many videos to return.
 */
export type PlaylistFetchOptions = {
  playlist_type?: "full" | "basic";
  videos_type?: "full" | "basic";
  limit?: number;
};

/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} type - Type of the video to return.
 */
export type VideoFetchOptions = {
  type?: "full" | "basic";
};

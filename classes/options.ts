/**
 * @name InstanceFetchOptions
 * @description Options for fetching instances.
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
 * @description Options for fetching playlists.
 */
export type PlaylistFetchOptions = {
  playlist_type?: "full" | "basic";
  videos_type?: "full" | "basic";
  limit?: number;
};

/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 */
export type VideoFetchOptions = {
  type?: "full" | "basic";
};
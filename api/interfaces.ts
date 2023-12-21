import * as Enums from "./enums.js";

/**
 * @name CommonOptions
 * @description Base options for all methods.
 * @param {number | undefined} limit - Amount of results to return.
 */
export interface CommonOptions {
  limit?: number;
}

/**
 * @name ContentOptions
 * @description Base options for all content-related methods.
 * @param {FetchTypes | undefined} type - Type of content to return.
 */
export interface ContentOptions {
  type?: Enums.FetchTypes;
}

/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {InstanceTypes | "all" | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} health - Filter instances by health.
 * @param {InstanceSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - Amount of instances to fetch.
 */
export interface InstanceFetchOptions extends CommonOptions {
  url?: string;
  type?: Enums.InstanceTypes | "all";
  region?: string;
  api_allowed?: boolean | "any";
  health?: number | "any";
  sorting?: Enums.InstanceSorting;
}

/**
 * @name PlaylistFetchOptions
 * @description Playlist fetch filter.
 * @param {FetchTypes | undefined} type - Type of the playlist to return.
 * @param {number | undefined} limit - Amount of videos to return.
 */
export interface PlaylistFetchOptions extends CommonOptions, ContentOptions {}

/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {FetchTypes | undefined} type - Type of the video to return.
 */
export interface VideoFetchOptions extends ContentOptions {
  region?: string;
}

/**
 * @name CommentFetchOptions
 * @description Options for fetching channels.
 * @param {CommentSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - Amount of comments to return.
 */
export interface CommentFetchOptions extends CommonOptions {
  sorting?: Enums.CommentSorting;
}

/**
 * @name SearchOptions
 * @description Search engine options.
 * @param {number | undefined} page - Page of the search results.
 * @param {VideoSorting | undefined} sorting - Sort by...
 * @param {DateValues | undefined} date - Get videos by a certain date.
 * @param {Duration | undefined} duration - Duration of a video.
 * @param {ContentTypes | undefined} type - Type of the content to search.
 * @param {Enums.VideoFeatures[] | undefined} features - Comma-separated features of a video.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {number | undefined} limit - How many videos to return.
 */
export interface SearchOptions extends CommonOptions {
  page?: number;
  sorting?: Enums.VideoSorting;
  date?: Enums.DateValues;
  duration?: Enums.Duration;
  type?: Enums.ContentTypes;
  features?: Enums.VideoFeatures[];
  region?: string;
}

/**
 * @name TrendingOptions
 * @description Options for fetching trending content.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {TrendingTypes | undefined} type - Type of the video to return.
 * @param {number | undefined} limit - How many videos to return.
 */
export interface TrendingOptions extends CommonOptions {
  region?: string;
  type?: Enums.TrendingTypes;
}

/**
 * @name ChannelVideosOptions
 * @description Options for fetching videos on a channel.
 * @param {ChannelVideosSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many videos to return.
 */
export interface ChannelVideosOptions extends CommonOptions {
  sorting?: Enums.ChannelVideosSorting;
}

/**
 * @name ChannelPlaylistsOptions
 * @description Options for fetching playlists on a channel.
 * @param {ChannelPlaylistsSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many playlists to return.
 */
export interface ChannelPlaylistsOptions extends CommonOptions {
  sorting?: Enums.ChannelPlaylistsSorting;
}

/**
 * @name StreamOptions
 * @description Options for downloading a stream.
 * @param {number} parts - Number of parts to split the stream into.
 * @param {string | undefined} path - Path to save the stream to (current directory by default).
 */
export interface StreamOptions {
  parts: number;
  path?: string;
}

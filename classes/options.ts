/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {InstanceTypes | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} limit - Amount of instances to fetch.
 */
export interface InstanceFetchOptions {
  url?: string;
  type?: InstanceTypes;
  region?: string;
  api_allowed?: boolean | "any";
  limit?: number;
};

/**
 * @name PlaylistFetchOptions
 * @description Playlist fetch filter.
 * @param {FetchTypes | undefined} playlist_type - Type of the playlist to return.
 * @param {number | undefined} limit - Amount of videos to return.
 */
export interface PlaylistFetchOptions {
  playlist_type?: FetchTypes
  limit?: number;
};

/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {FetchTypes | undefined} type - Type of the video to return.
 */
export interface VideoFetchOptions {
  region?: string,
  type?: FetchTypes
};

/**
 * @name SearchOptions
 * @description Search engine options.
 * @param {ContentTypes | undefined} type - Type of the content to search.
 * @param {Sorting | undefined} sorting - Sort by...
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {number | undefined} page - Page of the search results.
 * @param {number | undefined} limit - How many videos to return.
 */
export interface SearchOptions {
  type?: ContentTypes;
  sorting?: Sorting;
  region?: string,
  page?: number;
  limit?: number;
}

/**
 * @name TrendingOptions
 * @description Options for fetching trending content.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {TrendingTypes | undefined} type - Type of the video to return.
 * @param {number | undefined} limit - How many videos to return.
 */
export interface TrendingOptions {
  region?: string,
  type?: TrendingTypes,
  limit?: number
};

/**
 * @name PopularOptions
 * @description Options for fetching popular content.
 * @param {number | undefined} limit - How many videos to return.
 */
export interface PopularOptions {
  limit?: number
};

/**
 * @name FetchTypes
 * @description Use this to determine how verbose you need your output to be. Minimal contains only the title and the ID. Basic, depending on the type, will contain all the objects necessary to have the fetched content work. Full will make all the fields available to you.
 */
export enum FetchTypes {
  Minimal = "minimal",
  Basic = "basic",
  Full = "full"
}

/**
 * @name InstanceTypes
 * @description Lists all types of Invidious instances.
 */
export enum InstanceTypes {
  https = "https",
  tor = "onion",
  i2p = "i2p",
  ALL = "all"
}

/**
 * @name ContentTypes
 * @description Lists all types of Invidious content.
 */
export enum ContentTypes {
  Video = "video",
  Playlist = "playlist",
  Channel = "channel",
  Movie = "movie",
  Show = "show",
  ALL = "all"
}

/**
 * @name TrendingTypes
 * @description Lists all types of trending content.
 */
export enum TrendingTypes {
  Music = "music",
  Gaming = "gaming",
  News = "news",
  Movies = "movies"
}

/**
 * @name Sorting
 * @description Invidious search can sort the content by using one of these values.
 */
export enum Sorting {
  Relevance = "relevance",
  Rating = "rating",
  UploadDate = "upload_date",
  ViewCount = "view_count"
}

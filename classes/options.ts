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
 * @name FetchTypes
 * @description Use this to determine how verbose you need your output to be. Minimal contains only the title and the ID. Basic, depending on the type, will contain all the objects necessary to have the fetched content work. Full will make all the fields available to you.
 * @example FetchTypes.Minimal
 * @example FetchTypes.Basic
 * @example FetchTypes.Full
 * @enum {string}
 */
export enum FetchTypes {
  Minimal = "minimal",
  Basic = "basic",
  Full = "full"
}

/**
 * @name InstanceTypes
 * @description Lists all types of Invidious instances.
 * @example InstanceTypes.https
 * @example InstanceTypes.tor
 * @example InstanceTypes.i2p
 * @example InstanceTypes.ALL
 * @enum {string}
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
 * @example ContentTypes.Video
 * @example ContentTypes.Playlist
 * @example ContentTypes.Channel
 * @example ContentTypes.Movie
 * @example ContentTypes.Show
 * @example ContentTypes.ALL
 * @enum {string}
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
 * @name Sorting
 * @description Invidious search can sort the content by using one of these values.
 * @example Sorting.Relevance
 * @example Sorting.Rating
 * @example Sorting.UploadDate
 * @example Sorting.ViewCount
 * @enum {string}
 */
export enum Sorting {
  Relevance = "relevance",
  Rating = "rating",
  UploadDate = "upload_date",
  ViewCount = "view_count"
}

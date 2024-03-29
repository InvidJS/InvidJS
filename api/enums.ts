/**
 * @name ErrorCodes
 * @description Error codes.
 */
export enum ErrorCodes {
  MissingArgument = 10000,
  InvalidArgument = 10001,
  APIDown = 10002,
  APIError = 10003,
  ServerError = 10004,
  BlockedVideo = 10005,
  InvalidContent = 10006,
  UnknownError = 10007,
}

/**
 * @name FetchTypes
 * @description Use this to determine how verbose you need your output to be.
 * @description Mimimal includes the title and the ID.
 * @description Basic includes the most common parameters.
 * @description Full includes all parametres of an object.
 */
export enum FetchTypes {
  Minimal = "minimal",
  Basic = "basic",
  Full = "full",
}

/**
 * @name InstanceTypes
 * @description Lists all types of Invidious instances.
 */
export enum InstanceTypes {
  https = "https",
  tor = "onion",
  i2p = "i2p",
}

/**
 * @name InstanceSorting
 * @description Lists all possible sorting options of Invidious instances.
 */
export enum InstanceSorting {
  MonthlyHealth = "monthly_health",
  Health = "health",
  API = "api",
  Type = "type",
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
}

/**
 * @name TrendingTypes
 * @description Lists all types of trending content.
 */
export enum TrendingTypes {
  Music = "music",
  Gaming = "gaming",
  News = "news",
  Movies = "movies",
}

/**
 * @name VideoSorting
 * @description Invidious search can sort the content by using one of these values.
 */
export enum VideoSorting {
  Relevance = "relevance",
  Rating = "rating",
  UploadDate = "upload_date",
  Views = "view_count",
}

/**
 * @name VideoFeatures
 * @description Possible features of a video.
 */
export enum VideoFeatures {
  HD = "hd",
  Subtitles = "subtitles",
  CCLicense = "creative_commons",
  Format_3D = "3d",
  Live = "live",
  Purchased = "purchased",
  Format_4K = "4k",
  Format_360 = "360",
  Location = "location",
  HDR = "hdr",
  VR = "vr180",
}

/**
 * @name CommentSorting
 * @description Invidious can sort comments by using one of these values.
 */
export enum CommentSorting {
  Top = "top",
  New = "new",
}

/**
 * @name Duration
 * @description Invidious can search for the following video duration.
 */
export enum Duration {
  Short = "short",
  Medium = "medium",
  Long = "long",
}

/**
 * @name DateValues
 * @description Invidious can search for the videos with the following upload dates.
 */
export enum DateValues {
  Hour = "hour",
  Today = "today",
  Week = "week",
  Month = "month",
  Year = "year",
}

/**
 * @name ChannelVideosSorting
 * @description Invidious can sort videos on a channel by using one of these values.
 */
export enum ChannelVideosSorting {
  Newest = "newest",
  Popular = "popular",
  Oldest = "oldest",
}

/**
 * @name ChannelPlaylistsSorting
 * @description Invidious can sort playlists on a channel by using one of these values.
 */
export enum ChannelPlaylistsSorting {
  Newest = "newest",
  Popular = "popular",
  Last = "last",
}

/**
 * @name AudioQuality
 * @description Possible values for audio quality.
 */
export enum AudioQuality {
  Low = "AUDIO_QUALITY_LOW",
  Medium = "AUDIO_QUALITY_MEDIUM",
}

/**
 * @name ImageQuality
 * @description Possible values for image or thumbnail quality.
 */
export enum ImageQuality {
  HD = "maxres",
  HDDefault = "maxresdefault",
  SDDefault = "sddefault",
  High = "high",
  Medium = "medium",
  Low = "default",
}

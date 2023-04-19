/**
 * @name Channel
 * @description Channel object. Can be Minimal, Basic or Full.
 * @param {string} name - Channel name.
 * @param {string} id - Channel ID.
 * @param {number} [subs] - Number of subscribers (basic or full only).
 * @param {string} [description] - Channel description (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {boolean} [isVerified] - Is channel verified? (full only)
 * @param {Array<Video>} [latest_videos] - Latest videos (full only).
 */
declare class Channel {
    name: string;
    id: string;
    subs?: number;
    description?: string;
    views?: number;
    isVerified?: boolean;
    latest_videos?: Array<Video>;
    constructor(name: string, id: string, subs?: number, description?: string, views?: number, isVerified?: boolean, latest_videos?: Array<Video>);
}
/**
 * @name Playlist
 * @description Playlist object. Can be Minimal, Basic or Full.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} id - ID of the playlist.
 * @param {Array<Video>} [videos] - Videos in the playlist (basic or full only).
 * @param {number} [videoCount] - Number of videos in the playlist (basic or full only).
 * @param {string} [author] - Author username (full only).
 * @param {string} [author_id] - Author ID (full only).
 * @param {string} [description] - Description of the playlist (full only).
 * @param {Image} [thumbnail] - Thumbnail of the playlist (full only).
 */
declare class Playlist {
    title: string;
    id: string;
    videos?: Array<Video>;
    videoCount?: number;
    author?: string;
    author_id?: string;
    description?: string;
    thumbnail?: Image;
    constructor(title: string, id: string, videos?: Array<Video>, videoCount?: number, author?: string, author_id?: string, description?: string, thumbnail?: Image);
}
/**
 * @name Video
 * @description Video object. Can be Minimal, Basic or Full.
 * @param {string} title - Title of the video.
 * @param {string} id - ID of the video.
 * @param {Array<Format>} [formats] - List of available formats (basic or full only).
 * @param {number} [length] - Length of the video in seconds (basic or full only).
 * @param {number} [lengthString] - Humanly-readable length of the video (basic or full only).
 * @param {string} [author] - Author username. (full only).
 * @param {string} [author_id] - Author ID. (full only).
 * @param {string} [description] - Description of the video (full only).
 * @param {string} [published] - Date of publishing (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {number} [likes] - Number of likes (full only).
 * @param {number} [dislikes] - Number of dislikes (full only).
 * @param {Array<Image>} [thumbnails] - Video thumbnails (full only).
 */
declare class Video {
    title: string;
    id: string;
    formats?: Array<Format>;
    length?: number;
    lengthString?: string;
    author?: string;
    author_id?: string;
    description?: string;
    published?: string;
    views?: number;
    likes?: number;
    dislikes?: number;
    thumbnails?: Array<Image>;
    constructor(title: string, id: string, formats?: Array<Format>, length?: number, lengthString?: string, author?: string, author_id?: string, description?: string, published?: string, views?: number, likes?: number, dislikes?: number, thumbnails?: Array<Image>);
}
/**
 * @name Format
 * @description Video or audio format.
 *
 * @param {string} url - URL of the format source.
 * @param {string} tag - ID of the format.
 * @param {string} type - Type of the format (codecs).
 * @param {string} container - Container of the format (mp4, webm, etc.).
 * @param {string} [audio_quality] - Quality (audio only).
 * @param {number} [audio_sampleRate] -  Sample rate (audio only).
 * @param {number} [audio_channels] - Number of channels (audio only).
 */
declare class Format {
    url: string;
    tag: string;
    type: string;
    container: string;
    audio_quality?: string;
    audio_sampleRate?: number;
    audio_channels?: number;
    constructor(url: string, tag: string, type: string, container: string, audio_quality?: string, audio_sampleRate?: number, audio_channels?: number);
}
/**
 * @name Image
 * @description Image object, used for thumbnails or banners.
 *
 * @param {string} url - Image URL.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {string} [quality] - Image quality (thumbnails only)
 */
declare class Image {
    url: string;
    width: number;
    height: number;
    quality?: string;
    constructor(url: string, width: number, height: number, quality?: string);
}
/**
 * @name Comment
 * @description Comment object.
 *
 * @param {string} author - Author username.
 * @param {string} author_id - Author ID.
 * @param {string} text - Comment text.
 */
declare class Comment {
    author: string;
    author_id: string;
    text: string;
    constructor(author: string, author_id: string, text: string);
}
/**
 * @name AudioQuality
 * @description Possible values for audio quality.
 */
declare enum AudioQuality {
    Low = "AUDIO_QUALITY_LOW",
    Medium = "AUDIO_QUALITY_MEDIUM"
}

/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} region  - Region of the instance.
 * @param {boolean} cors_allowed  - Is CORS allowed?
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {string} type  - Type of the instance.
 * @param {string} url  - URL of the instance.
 * @param {string} health - Latest reported health of the instance.
 */
declare class Instance {
    region: string;
    cors_allowed: boolean;
    api_allowed: boolean;
    type: string;
    url: string;
    health?: number;
    constructor(region: string, cors_allowed: boolean, api_allowed: boolean, type: string, url: string, health?: number);
}
/**
 * @name InstanceStats
 * @description Statistics about an instance.
 *
 * @param {string} software_name - Name of the software (usually Invidious).
 * @param {string} software_version - Version of the software.
 * @param {string} software_branch - Cloned branch.
 * @param {number} users_total - Total users.
 * @param {number} users_active_halfyear - Users active in the last 6 months.
 * @param {number} users_active_month - Users active in the last month.
 * @param {boolean} registrations - Is registration allowed?
 */
declare class InstanceStats {
    software_name: string;
    software_version: string;
    software_branch: string;
    users_total: number;
    users_active_halfyear: number;
    users_active_month: number;
    registrations: boolean;
    constructor(software_name: string, software_version: string, software_branch: string, users_total: number, users_active_halfyear: number, users_active_month: number, registrations: boolean);
}

/**
 * @name CommonOptions
 * @description Base options for all methods.
 * @param {number | undefined} limit - Amount of results to return.
 */
interface CommonOptions {
    limit?: number;
}
/**
 * @name ContentOptions
 * @description Base options for all content-related methods.
 * @param {FetchTypes | undefined} type - Type of content to return.
 */
interface ContentOptions {
    type?: FetchTypes;
}
/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {InstanceTypes | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} health - Filter instances by health.
 * @param {number | undefined} limit - Amount of instances to fetch.
 */
interface InstanceFetchOptions extends CommonOptions {
    url?: string;
    type?: InstanceTypes;
    region?: string;
    api_allowed?: boolean | "any";
    health?: number | "any";
}
/**
 * @name PlaylistFetchOptions
 * @description Playlist fetch filter.
 * @param {FetchTypes | undefined} type - Type of the playlist to return.
 * @param {number | undefined} limit - Amount of videos to return.
 */
interface PlaylistFetchOptions extends CommonOptions, ContentOptions {
}
/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {FetchTypes | undefined} type - Type of the video to return.
 */
interface VideoFetchOptions extends ContentOptions {
    region?: string;
}
/**
 * @name ChannelFetchOptions
 * @description Options for fetching channels.
 * @param {FetchTypes | undefined} type - Type of the channel to return.
 */
interface ChannelFetchOptions extends ContentOptions {
}
/**
 * @name CommentFetchOptions
 * @description Options for fetching channels.
 * @param {CommentSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - Amount of comments to return.
 */
interface CommentFetchOptions extends CommonOptions {
    sorting?: CommentSorting;
}
/**
 * @name SearchOptions
 * @description Search engine options.
 * @param {number | undefined} page - Page of the search results.
 * @param {VideoSorting | undefined} sorting - Sort by...
 * @param {DateValues | undefined} date - Get videos by a certain date.
 * @param {Duration | undefined} duration - Duration of a video.
 * @param {ContentTypes | undefined} type - Type of the content to search.
 * @param {string | undefined} features - Comma-separated features of a video. Possible values: "hd", "subtitles", "creative_commons", "3d", "live", "purchased", "4k", "360", "location", "hdr", "vr180"
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {number | undefined} limit - How many videos to return.
 */
interface SearchOptions extends CommonOptions {
    page?: number;
    sorting?: VideoSorting;
    date?: DateValues;
    duration?: Duration;
    type?: ContentTypes;
    features?: string;
    region?: string;
}
/**
 * @name TrendingOptions
 * @description Options for fetching trending content.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {TrendingTypes | undefined} type - Type of the video to return.
 * @param {number | undefined} limit - How many videos to return.
 */
interface TrendingOptions extends CommonOptions {
    region?: string;
    type?: TrendingTypes;
}
/**
 * @name PopularOptions
 * @description Options for fetching popular content.
 * @param {number | undefined} limit - How many videos to return.
 */
interface PopularOptions extends CommonOptions {
}
/**
 * @name ChannelRelatedOptions
 * @description Options for fetching related channels.
 * @param {number | undefined} limit - How many channels to return.
 */
interface ChannelRelatedOptions extends CommonOptions {
}
/**
 * @name ChannelVideosOptions
 * @description Options for fetching videos on a channel.
 * @param {ChannelVideosSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many videos to return.
 */
interface ChannelVideosOptions extends CommonOptions {
    sorting?: ChannelVideosSorting;
}
/**
 * @name ChannelPlaylistsOptions
 * @description Options for fetching playlists on a channel.
 * @param {ChannelPlaylistsSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many playlists to return.
 */
interface ChannelPlaylistsOptions extends CommonOptions {
    sorting?: ChannelPlaylistsSorting;
}
/**
 * @name StreamOptions
 * @description Options for downloading a stream.
 * @param {SaveSourceTo | undefined} saveTo - Where to save the stream.
 * @param {number | undefined} parts - Number of parts to split the stream into.
 * @param {string | undefined} path - Path to save the stream to. If not specified, the stream will be saved to the current directory.
 */
interface StreamOptions {
    saveTo?: SaveSourceTo;
    parts?: number;
    path?: string;
}
/**
 * @name FetchTypes
 * @description Use this to determine how verbose you need your output to be. Minimal contains only the title and the ID. Basic, depending on the type, will contain all the objects necessary to have the fetched content work. Full will make all the fields available to you.
 */
declare enum FetchTypes {
    Minimal = "minimal",
    Basic = "basic",
    Full = "full"
}
/**
 * @name InstanceTypes
 * @description Lists all types of Invidious instances.
 */
declare enum InstanceTypes {
    https = "https",
    tor = "onion",
    i2p = "i2p",
    ALL = "all"
}
/**
 * @name ContentTypes
 * @description Lists all types of Invidious content.
 */
declare enum ContentTypes {
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
declare enum TrendingTypes {
    Music = "music",
    Gaming = "gaming",
    News = "news",
    Movies = "movies"
}
/**
 * @name VideoSorting
 * @description Invidious search can sort the content by using one of these values.
 */
declare enum VideoSorting {
    Relevance = "relevance",
    Rating = "rating",
    UploadDate = "upload_date",
    ViewCount = "view_count"
}
/**
 * @name CommentSorting
 * @description Invidious can sort comments by using one of these values.
 */
declare enum CommentSorting {
    Top = "top",
    New = "new"
}
/**
 * @name Duration
 * @description Invidious can search for the following video duration.
 */
declare enum Duration {
    Short = "short",
    Medium = "medium",
    Long = "long"
}
/**
 * @name DateValues
 * @description Invidious can search for the videos with the following upload dates.
 */
declare enum DateValues {
    Hour = "hour",
    Today = "today",
    Week = "week",
    Month = "month",
    Year = "year"
}
/**
 * @name ChannelVideosSorting
 * @description Invidious can sort videos on a channel by using one of these values.
 */
declare enum ChannelVideosSorting {
    Newest = "newest",
    Popular = "popular",
    Oldest = "oldest"
}
/**
 * @name ChannelPlaylistsSorting
 * @description Invidious can sort playlists on a channel by using one of these values.
 */
declare enum ChannelPlaylistsSorting {
    Newest = "newest",
    Popular = "popular",
    Last = "last"
}
/**
 * @name SaveSourceTo
 * @description Possible values on where to save the source.
 */
declare enum SaveSourceTo {
    Memory = "memory",
    File = "file"
}

/**
 * @name ErrorCodes
 * @description Error codes.
 */
declare enum ErrorCodes {
    MissingArgument = 10000,
    InvalidArgument = 10001,
    APIBlocked = 10002,
    APIError = 10003,
    BlockedVideo = 10004,
    InvalidContent = 10005
}

/**
 * @name fetchInstances
 * @description Fetches public Invidious instances.
 * @param {InstanceFetchOptions} [opts] - Instance fetch options.
 * @example await InvidJS.fetchInstances();
 * @example await InvidJS.fetchInstances({limit: 10});
 * @returns {Promise<Instance[]>} Array of instance objects.
 */
declare function fetchInstances(opts?: InstanceFetchOptions): Promise<Instance[]>;
/**
 * @name fetchStats
 * @description Fetches stats of an instance.
 * @param {Instance} instance - Instance to fetch data from.
 * @example await InvidJS.fetchStats(instance);
 * @returns {Promise<InstanceStats>} Instance stats object.
 */
declare function fetchStats(instance: Instance): Promise<InstanceStats>;
/**
 * @name fetchVideo
 * @description Fetches video data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Video ID.
 * @param {VideoFetchOptions} [opts] - Video fetch options.
 * @example await InvidJS.fetchVideo(instance, "id");
 * @example await InvidJS.fetchVideo(instance, "id", {region: "US"});
 * @returns {Promise<Video>} Video object.
 */
declare function fetchVideo(instance: Instance, id: string, opts?: VideoFetchOptions): Promise<Video>;
/**
 * @name fetchComments
 * @description Fetches comments of a video.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video object.
 * @param {CommentFetchOptions} [opts] - Comment fetch options.
 * @example await InvidJS.fetchComments(instance, video);
 * @example await InvidJS.fetchComments(instance, video, {limit: 5});
 * @returns {Promise<Comment[]>} Comments array.
 */
declare function fetchComments(instance: Instance, video: Video, opts?: CommentFetchOptions): Promise<Comment[]>;
/**
 * @name fetchPlaylist
 * @description Fetches playlist data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Playlist ID.
 * @param {PlaylistFetchOptions} [opts] - Playlist fetch options.
 * @example await InvidJS.fetchPlaylist(instance, "id");
 * @example await InvidJS.fetchPlaylist(instance, "id". {limit: 10});
 * @returns {Promise<Playlist>} Playlist object.
 */
declare function fetchPlaylist(instance: Instance, id: string, opts?: PlaylistFetchOptions): Promise<Playlist>;
/**
 * @name fetchChannel
 * @description Fetches channel data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Channel ID.
 * @param {ChannelFetchOptions} [opts] - Channel fetch options.
 * @example await InvidJS.fetchChannel(instance, "id");
 * @returns {Promise<Channel>} Channel object.
 */
declare function fetchChannel(instance: Instance, id: string, opts?: ChannelFetchOptions): Promise<Channel>;
/**
 * @name fetchRelatedChannels
 * @description Fetches related channels.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Channel} channel - Channel object.
 * @param {ChannelRelatedOptions} [opts] - Related fetch options.
 * @example await InvidJS.fetchRelatedChannels(instance, channel);
 * @example await InvidJS.fetchRelatedChannels(instance, channel, {limit: 5});
 * @returns {Promise<Array<Channel>>} Array of related channels.
 */
declare function fetchRelatedChannels(instance: Instance, channel: Channel, opts?: ChannelRelatedOptions): Promise<Array<Channel>>;
/**
 * @name fetchChannelPlaylists
 * @description Fetches latest channel playlists.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Channel} channel - Channel object.
 * @param {ChannelPlaylistsOptions} [opts] -  Playlist fetch options.
 * @example await InvidJS.fetchChannelPlaylists(instance, channel);
 * @example await InvidJS.fetchChannelPlaylists(instance, channel, {limit: 3});
 * @returns {Promise<Array<Playlist>>} Array of channel playlists.
 */
declare function fetchChannelPlaylists(instance: Instance, channel: Channel, opts?: ChannelPlaylistsOptions): Promise<Array<Playlist>>;
/**
 * @name fetchChannelVideos
 * @description Fetches latest channel videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Channel} channel - Channel object.
 * @param {ChannelVideosOptions} [opts] - Video fetch options.
 * @example await InvidJS.fetchChannelVideos(instance, channel);
 * @example await InvidJS.fetchChannelVideos(instance, channel, {limit: 7});
 * @returns {Promise<Array<Video>>} Array of channel videos.
 */
declare function fetchChannelVideos(instance: Instance, channel: Channel, opts?: ChannelVideosOptions): Promise<Array<Video>>;
/**
 * @name fetchSearchSuggestions
 * @description Fetches suggestions for a search query.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} query - Search query.
 * @example await InvidJS.fetchSearchSuggestions(instance, "search");
 * @returns {Promise<Array<string>>} Array of search suggestions.
 */
declare function fetchSearchSuggestions(instance: Instance, query: string): Promise<Array<string>>;
/**
 * @name searchContent
 * @description Searches content based on the query and search options.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} query - Search query.
 * @param {SearchOptions} [opts] - Search options.
 * @example await InvidJS.searchContent(instance, "search");
 * @example await InvidJS.searchContent(instance, "search", {type: ContentTypes.Playlist});
 * @returns {Promise<Array<Channel | Playlist | Video>>} Array of search results (channels, playlists, videos).
 */
declare function searchContent(instance: Instance, query: string, opts?: SearchOptions): Promise<Array<Channel | Playlist | Video>>;
/**
 * @name fetchTrending
 * @description Fetches trending videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {TrendingOptions} [opts] - Trending fetch options.
 * @example await InvidJS.fetchTrending(instance);
 * @example await InvidJS.fetchTrending(instance, {limit: 6});
 * @returns {Promise<Array<Video>>} Array of trending videos.
 */
declare function fetchTrending(instance: Instance, opts?: TrendingOptions): Promise<Array<Video>>;
/**
 * @name fetchPopular
 * @description Fetches popular videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {PopularOptions} [opts] - Popular fetch options.
 * @example await InvidJS.fetchPopular(instance);
 * @example await InvidJS.fetchPopular(instance, {limit: 10});
 * @returns {Promise<Array<Video>>} Array of popular videos.
 */
declare function fetchPopular(instance: Instance, opts?: PopularOptions): Promise<Array<Video>>;
/**
 * @name validateSource
 * @description Validates length of a format stream.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to validate.
 * @example await InvidJS.validateSource(instance, video, format);
 * @returns {Promise<boolean | undefined>} Is source valid?
 */
declare function validateSource(instance: Instance, video: Video, source: Format): Promise<boolean | undefined>;
/**
 * @name fetchSource
 * @description Fetches a video stream for later use in memory or as a file.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to download.
 * @param {StreamOptions} [opts] - Options for fetching the source.
 * @example await InvidJS.fetchSource(instance, video, format);
 * @example await InvidJS.fetchSource(instance, video, format, {saveTo: SaveSourceTo.Memory});
 * @returns {Promise<ReadableStream | string>} Memory stream or file path of the source.
 */
declare function fetchSource(instance: Instance, video: Video, source: Format, opts?: StreamOptions): Promise<ReadableStream | string>;

export { AudioQuality, ChannelPlaylistsSorting, ChannelVideosSorting, CommentSorting, ContentTypes, DateValues, Duration, ErrorCodes, FetchTypes, InstanceTypes, SaveSourceTo, TrendingTypes, VideoSorting, fetchChannel, fetchChannelPlaylists, fetchChannelVideos, fetchComments, fetchInstances, fetchPlaylist, fetchPopular, fetchRelatedChannels, fetchSearchSuggestions, fetchSource, fetchStats, fetchTrending, fetchVideo, searchContent, validateSource };

import { Channel } from "./api/classes/Channel.js";
import { Format } from "./api/classes/Format.js";
import { Instance } from "./api/classes/Instance.js";
import { Playlist } from "./api/classes/Playlist.js";
import { Video } from "./api/classes/Video.js";
import { Comment } from "./api/classes/Comment.js";
import { Image } from "./api/classes/Image.js";
import {
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  InstanceSorting,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
  Duration,
  DateValues,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  AudioQuality,
  ImageQuality,
} from "./api/enums.js";
import { APIError } from "./api/errors/APIError.js";
import { APIDownError } from "./api/errors/APIDownError.js";
import { ContentBlockedError } from "./api/errors/ContentBlockedError.js";
import { InvalidArgumentError } from "./api/errors/InvalidArgumentError.js";
import { MissingArgumentError } from "./api/errors/MissingArgumentError.js";
import { NotFoundError } from "./api/errors/NotFoundError.js";
import { UnknownError } from "./api/errors/UnknownError.js";
import {
  InstanceFetchOptions,
  PlaylistFetchOptions,
  VideoFetchOptions,
  CommentFetchOptions,
  SearchOptions,
  TrendingOptions,
  StreamOptions,
  ContentOptions,
  CommonOptions,
  HashtagOptions,
} from "./api/interfaces.js";
import { convertToString } from "./utils/LengthConverter.js";
import {
  addFormats,
  addThumbnails,
  fillMixData,
} from "./utils/ObjectCreator.js";
import { QueryParams } from "./utils/Query.js";
import got, { HTTPError, RequestError } from "got";
import { PassThrough, Stream } from "stream";
import { ReReadable } from "rereadable-stream";
import https from "https";
import { ServerError } from "./api/errors/ServerError.js";

const useragent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";

/**
 * @name fetchInstances
 * @description Fetches public Invidious instances.
 * @param {InstanceFetchOptions} [opts] - Instance fetch options.
 * @example await InvidJS.fetchInstances();
 * @example await InvidJS.fetchInstances({limit: 10});
 * @returns {Promise<Instance[]>} Array of instance objects.
 */
const fetchInstances = async (
  opts: InstanceFetchOptions = {
    api_allowed: "any",
    limit: 0,
    region: "all",
    sorting: InstanceSorting.Health,
    type: "all",
  },
): Promise<Instance[]> => {
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  if (opts.health && (typeof opts.health !== "number" || opts.health < 0))
    throw new InvalidArgumentError(
      "Health is invalid - must be a number greater than 0!",
    );
  const instances: Array<Instance> = [];
  try {
    const res = await got.get("https://api.invidious.io/instances.json", {
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.forEach((instance: any) => {
      let health = undefined;
      if (instance[1].monitor !== null) {
        health = instance[1].monitor.uptime;
      }
      if (
        (!opts.url || opts.url === instance[1].uri) &&
        (!opts.type || opts.type === "all" || instance[1].type === opts.type) &&
        (!opts.region ||
          opts.region === "all" ||
          instance[1].region === opts.region) &&
        (opts.api_allowed === undefined ||
          opts.api_allowed === "any" ||
          instance[1].api === opts.api_allowed) &&
        (!opts.health ||
          opts.health === "any" ||
          parseFloat(health) >= opts.health) &&
        (!opts.limit || opts.limit === 0 || instances.length < opts.limit)
      ) {
        instances.push(
          new Instance(
            instance[1].uri,
            instance[1].type,
            instance[1].api,
            parseFloat(health),
            instance[1].region,
            instance[1].cors,
          ),
        );
      } else return false;
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  switch (opts.sorting) {
    case InstanceSorting.Health:
    default: {
      instances.sort((a, b) => {
        if (a.health === undefined || isNaN(a.health)) return 1;
        if (b.health === undefined || isNaN(b.health)) return -1;
        return b.health - a.health;
      });
      break;
    }
    case InstanceSorting.API: {
      instances.sort((a, b) => {
        if (a.api_allowed === true && b.api_allowed === false) return -1;
        if (a.api_allowed === false && b.api_allowed === true) return 1;
        return 0;
      });
    }
    case InstanceSorting.Type: {
      instances.sort((a, b) => {
        if (a.type === InstanceTypes.https && b.type === InstanceTypes.tor)
          return -1;
        if (a.type === InstanceTypes.tor && b.type === InstanceTypes.i2p)
          return -1;
        return 0;
      });
    }
  }
  return instances;
};

/**
 * @name getInstance
 * @description Generates an Instance object from an Invidious URL.
 * @param {string} url - Instance fetch options.
 * @example await InvidJS.getInstance("https://inv.idio.us");
 * @returns {Promise<Instance>} Instance object.
 */
const getInstance = async (url: string): Promise<Instance> => {
  try {
    let api = undefined;
    const stats = await got.get(`${url}/api/v1/stats`, {
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(stats.body);
    if (json.software.name !== "invidious")
      throw new InvalidArgumentError("Please provide a valid Invidious URL!");
    const res = await got.get(`${url}/api/v1`, {
      headers: { "User-Agent": useragent },
    });
    if (res.statusCode === 200) api = true;
    else api = false;
    return new Instance(url, InstanceTypes.https, api);
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
};

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
const fetchVideo = async (
  instance: Instance,
  id: string,
  opts: VideoFetchOptions = {
    region: "US",
    type: FetchTypes.Basic,
  },
): Promise<Video> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!id)
    throw new MissingArgumentError("You must provide a video ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  let info!: Video;
  let url = `${instance.url}/watch?v=${id}`;
  const queryURL = `${instance.url}/api/v1/videos/${id}`;
  const params = new QueryParams();
  switch (opts.type) {
    case FetchTypes.Minimal: {
      params.fields = "title,videoId";
      break;
    }
    case FetchTypes.Basic: {
      params.fields =
        "title,videoId,adaptiveFormats,formatStreams,lengthSeconds";
      break;
    }
    case FetchTypes.Full: {
      params.fields =
        "title,videoId,adaptiveFormats,formatStreams,lengthSeconds,author,authorId,description,publishedText,viewCount,likeCount,dislikeCount,videoThumbnails";
      break;
    }
  }
  if (opts.region) params.region = opts.region;
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case FetchTypes.Full: {
        const lengthString = convertToString(json.lengthSeconds);
        const formats = addFormats(
          json.formatStreams.concat(json.adaptiveFormats),
        );
        const thumbnails = addThumbnails(json.videoThumbnails);
        info = new Video(
          json.title,
          id,
          url,
          formats,
          json.lengthSeconds,
          lengthString,
          json.author,
          json.authorId,
          json.description,
          json.publishedText,
          json.viewCount,
          json.likeCount,
          json.dislikeCount,
          thumbnails,
        );
        break;
      }
      case FetchTypes.Basic:
      default: {
        const lengthString = convertToString(json.lengthSeconds);
        const formats = addFormats(
          json.formatStreams.concat(json.adaptiveFormats),
        );
        info = new Video(
          json.title,
          id,
          url,
          formats,
          json.lengthSeconds,
          lengthString,
        );
        break;
      }
      case FetchTypes.Minimal: {
        info = new Video(json.title, id, url);
        break;
      }
    }
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("404"))
        throw new NotFoundError("The video you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};

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
const fetchComments = async (
  instance: Instance,
  video: Video,
  opts: CommentFetchOptions = {
    limit: 0,
    sorting: CommentSorting.Top,
  },
): Promise<Comment[]> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!video)
    throw new MissingArgumentError(
      "You must provide a video to fetch comments!",
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  const comments: Array<Comment> = [];
  const queryURL = `${instance.url}/api/v1/comments/${video.id}`;
  const params = new QueryParams();
  if (opts.sorting) params.sort_by = opts.sorting;
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.comments.forEach((comment: any) => {
      if (!opts.limit || opts.limit === 0 || comments.length < opts.limit)
        comments.push(
          new Comment(comment.author, comment.authorId, comment.content),
        );
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return comments;
};

/**
 * @name fetchPlaylist
 * @description Fetches playlist data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Playlist ID.
 * @param {PlaylistFetchOptions} [opts] - Playlist fetch options.
 * @example await InvidJS.fetchPlaylist(instance, "id");
 * @example await InvidJS.fetchPlaylist(instance, "id", {limit: 10});
 * @returns {Promise<Playlist>} Playlist object.
 */
const fetchPlaylist = async (
  instance: Instance,
  id: string,
  opts: PlaylistFetchOptions = {
    limit: 0,
    type: FetchTypes.Basic,
  },
): Promise<Playlist> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a playlist ID to fetch it!",
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  let info!: Playlist;
  let url = `${instance.url}/playlist?list=${id}`;
  const queryURL = `${instance.url}/api/v1/playlists/${id}`;
  const params = new QueryParams();
  if (opts.page) params.page = opts.page;
  switch (opts.type) {
    case FetchTypes.Minimal: {
      params.fields = "title,playlistId";
      break;
    }
    case FetchTypes.Basic: {
      params.fields = "title,playlistId,videos";
      break;
    }
    case FetchTypes.Full: {
      params.fields =
        "title,playlistId,videos,author,authorId,description,playlistThumbnail";
      break;
    }
  }
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case FetchTypes.Full: {
        const videos: Array<Video> = [];
        json.videos.forEach((video: any) => {
          let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
          if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
            videos.push(new Video(video.title, video.videoId, videoUrl));
        });
        const data = fillMixData(json.author, json.authorId, json.description);
        info = new Playlist(
          json.title,
          id,
          url,
          videos,
          json.videos.length,
          data.mixAuthor,
          data.authorId,
          data.mixDescription,
          new Image(json.playlistThumbnail, 168, 94, ImageQuality.High),
        );
        break;
      }
      case FetchTypes.Basic:
      default: {
        const videos: Array<Video> = [];
        json.videos.forEach((video: any) => {
          let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
          if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
            videos.push(new Video(video.title, video.videoId, videoUrl));
        });
        info = new Playlist(json.title, id, url, videos, json.videos.length);
        break;
      }
      case FetchTypes.Minimal: {
        info = new Playlist(json.title, id, url);
        break;
      }
    }
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("404"))
        throw new NotFoundError("The playlist you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};

/**
 * @name fetchChannel
 * @description Fetches channel data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Channel ID.
 * @param {ContentOptions} [opts] - Channel fetch options.
 * @example await InvidJS.fetchChannel(instance, "id");
 * @returns {Promise<Channel>} Channel object.
 */
const fetchChannel = async (
  instance: Instance,
  id: string,
  opts: ContentOptions = {
    type: FetchTypes.Basic,
  },
): Promise<Channel> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a channel ID to fetch it!",
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  let info!: Channel;
  const queryURL = `${instance.url}/api/v1/channels/${id}`;
  const params = new QueryParams();
  switch (opts.type) {
    case FetchTypes.Minimal: {
      params.fields = "author,authorId";
      break;
    }
    case FetchTypes.Basic: {
      params.fields = "author,authorId,subCount";
      break;
    }
    case FetchTypes.Full: {
      params.fields =
        "author,authorId,subCount,description,totalViews,authorVerified,latestVideos";
      break;
    }
  }
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case FetchTypes.Full: {
        info = new Channel(
          json.author,
          json.authorId,
          json.subCount,
          json.description,
          json.totalViews,
          json.authorVerified,
          json.latestVideos,
        );
        break;
      }
      case FetchTypes.Basic:
      default: {
        info = new Channel(json.author, json.authorId, json.subCount);
        break;
      }
      case FetchTypes.Minimal: {
        info = new Channel(json.author, json.authorId);
        break;
      }
    }
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("404"))
        throw new NotFoundError("The channel you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};

/**
 * @name fetchSearchSuggestions
 * @description Fetches suggestions for a search query.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} query - Search query.
 * @example await InvidJS.fetchSearchSuggestions(instance, "search");
 * @returns {Promise<Array<string>>} Array of search suggestions.
 */
const fetchSearchSuggestions = async (
  instance: Instance,
  query: string,
): Promise<Array<string>> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  const suggestions: Array<string> = [];
  const queryURL = `${instance.url}/api/v1/search/suggestions`;
  const params = new QueryParams();
  params.q = query;
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.suggestions.forEach((suggestion: any) => {
      suggestions.push(suggestion);
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return suggestions;
};

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
const searchContent = async (
  instance: Instance,
  query: string,
  opts: SearchOptions = {
    limit: 0,
    page: 1,
    region: "US",
    sorting: VideoSorting.Relevance,
    type: ContentTypes.Video,
  },
): Promise<Array<Channel | Playlist | Video>> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  const queryURL = `${instance.url}/api/v1/search?q=${query}`;
  const params = new QueryParams();
  params.q = query;
  if (opts.page) params.page = opts.page;
  if (opts.sorting) params.sort_by = opts.sorting;
  if (opts.date) params.date = opts.date;
  if (opts.duration) params.duration = opts.duration;
  if (opts.type) params.type = opts.type;
  if (opts.features) params.features = opts.features.toString();
  if (opts.region) params.region = opts.region;
  const results: Array<Channel | Playlist | Video> = [];
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.forEach((result: any) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        switch (result.type) {
          case "video": {
            let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
            results.push(new Video(result.title, result.videoId, videoUrl));
            break;
          }
          case "playlist": {
            const videos: Video[] = [];
            let playlistUrl = `${instance.url}/playlist?list=${result.playlistId}`;
            result.videos.forEach((video: any) => {
              let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
              videos.push(new Video(video.title, video.videoId, videoUrl));
            });
            results.push(
              new Playlist(
                result.title,
                result.playlistId,
                playlistUrl,
                videos,
              ),
            );
            break;
          }
          case "channel": {
            results.push(
              new Channel(result.author, result.authorId, result.subCount),
            );
            break;
          }
        }
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};

/**
 * @name fetchTrending
 * @description Fetches trending videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {TrendingOptions} [opts] - Trending fetch options.
 * @example await InvidJS.fetchTrending(instance);
 * @example await InvidJS.fetchTrending(instance, {limit: 6});
 * @returns {Promise<Array<Video>>} Array of trending videos.
 */
const fetchTrending = async (
  instance: Instance,
  opts: TrendingOptions = {
    limit: 0,
    region: "US",
    type: TrendingTypes.Music,
  },
): Promise<Array<Video>> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  const queryURL = `${instance.url}/api/v1/trending`;
  const params = new QueryParams();
  if (opts.region) params.region = opts.region;
  if (opts.type) params.type = opts.type;
  const results: Array<Video> = [];
  const searchParams = params.createQuery();
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.forEach((result: any) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      if (err.message.includes("400") || err.message.includes("403"))
        throw new ContentBlockedError(
          "Disabled by administrator - try another instance!",
        );
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};

/**
 * @name fetchPopular
 * @description Fetches popular videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {CommonOptions} [opts] - Popular fetch options.
 * @example await InvidJS.fetchPopular(instance);
 * @example await InvidJS.fetchPopular(instance, {limit: 10});
 * @returns {Promise<Array<Video>>} Array of popular videos.
 */
const fetchPopular = async (
  instance: Instance,
  opts: CommonOptions = {
    limit: 0,
  },
): Promise<Array<Video>> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  const queryURL = `${instance.url}/api/v1/popular`;
  const results: Array<Video> = [];
  try {
    const res = await got.get(queryURL, {
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.forEach((result: any) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      if (err.message.includes("400") || err.message.includes("403"))
        throw new ContentBlockedError(
          "Disabled by administrator - try another instance!",
        );
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};

/**
 * @name fetchHashtag
 * @description Fetches videos that have the specified hashtag.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} tag - Hashtag.
 * @param {HashtagOptions} [opts] - Hashtag fetch options.
 * @example await InvidJS.fetchHashtag(instance, mjd);
 * @example await InvidJS.fetchHashtag(instance, mjd, {limit: 10});
 * @returns {Promise<Array<Video>>} Array of videos.
 */
const fetchHashtag = async (
  instance: Instance,
  tag: string,
  opts: HashtagOptions = {
    limit: 0,
  },
): Promise<Array<Video>> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!tag) throw new MissingArgumentError("You must provide a valid hashtag!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!",
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!",
    );
  const queryURL = `${instance.url}/api/v1/hashtag/${tag}`;
  const params = new QueryParams();
  const results: Array<Video> = [];
  const searchParams = params.createQuery();
  if (opts.page) params.page = opts.page;
  try {
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    json.results.forEach((result: any) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err: any) {
    if (err instanceof HTTPError) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};

/**
 * @name saveBlob
 * @description Fetches a video as a Blob.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to download.
 * @param {StreamOptions} [opts] - Save options.
 * @example await InvidJS.saveBlob(instance, video, format);
 * @example await InvidJS.saveBlob(instance, video, format, {parts: 5});
 * @returns {Promise<Blob>} A blob with the content.
 */
const saveBlob = async (
  instance: Instance,
  video: Video,
  source: Format,
  opts: StreamOptions = {
    parts: 5,
  },
): Promise<Blob> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!",
    );
  if (opts && !opts.parts) opts.parts = 1;
  if (opts.parts && opts.parts < 1)
    throw new InvalidArgumentError(
      "A source must be downloaded in at least a single part!",
    );
  if (opts.parts && opts.parts > 10) opts.parts = 10;
  const queryURL = `${instance.url}/latest_version`;
  const params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  const searchParams = params.createQuery();
  let length = 0;
  await got
    .get(queryURL, {
      headers: { Range: `bytes=0-0`, "User-Agent": useragent },
      searchParams: searchParams,
    })
    .then((res) => {
      if (res.headers["content-range"])
        length = parseInt(res.headers["content-range"]?.split("/")[1]);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        if (err.message.includes("403")) {
          throw new ContentBlockedError(
            "Not allowed to download this video! Perhaps it's from a generated channel?",
          );
        }
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    });
  return new Promise(async (resolve, reject) => {
    const parts = Math.ceil(length / opts.parts);
    const positions: Array<number> = [];
    for (let i = 0; i < opts.parts; i++) {
      positions.push(i * parts);
    }
    const promises: Array<Promise<any>> = [];
    positions.forEach((position) => {
      const range = `bytes=${position}-${position + parts - 1}`;
      promises.push(
        got.get(queryURL, {
          headers: { Range: range, "User-Agent": useragent },
          responseType: "buffer",
          searchParams: searchParams,
        }),
      );
    });
    const responses = await Promise.all(promises);
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    let offset = 0;
    responses.forEach((response: any) => {
      const array = new Uint8Array(response.body);
      for (let i = 0; i < array.length; i++) {
        view.setUint8(offset + i, array[i]);
      }
      offset += array.length;
    });
    const blob = new Blob([buffer], {
      type: source.type.split("/")[0],
    });
    resolve(blob);
  });
};

/**
 * @name saveStream
 * @description Fetches a video as a Stream.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to download.
 * @example await InvidJS.saveStream(instance, video, format);
 * @returns {Promise<Stream>} Memory stream.
 */
const saveStream = async (
  instance: Instance,
  video: Video,
  source: Format,
): Promise<Stream> => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!",
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!",
    );
  const queryURL = `${instance.url}/latest_version`;
  const params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  const searchParams = params.createQuery();
  let length = 0;
  await got
    .get(queryURL, {
      headers: { Range: `bytes=0-0`, "User-Agent": useragent },
      searchParams: searchParams,
    })
    .then((res) => {
      if (res.headers["content-range"])
        length = parseInt(res.headers["content-range"]?.split("/")[1]);
    })
    .catch((err) => {
      if (err instanceof HTTPError) {
        if (err.message.includes("403")) {
          throw new ContentBlockedError(
            "Not allowed to download this video! Perhaps it's from a generated channel?",
          );
        }
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    });
  return new Promise((resolve, reject) => {
    const stream = got.stream(queryURL, {
      searchParams: searchParams,
      headers: { Connection: "keep-alive", "User-Agent": useragent },
      agent: {
        https: new https.Agent({ keepAlive: true }),
      },
      http2: true,
    });
    const pass = new PassThrough({
      highWaterMark: length,
    });
    const result = new ReReadable();
    stream.pipe(pass).pipe(result);
    stream.on("error", (err) => {
      reject();
      if (err.message.includes("403")) {
        throw new ContentBlockedError(
          "Not allowed to download this video! Perhaps it's from a generated channel?",
        );
      } else throw new APIError(err.message);
    });
    stream.on("end", () => {
      resolve(result);
    });
  });
};

export {
  fetchInstances,
  getInstance,
  fetchVideo,
  fetchComments,
  fetchPlaylist,
  fetchChannel,
  fetchSearchSuggestions,
  searchContent,
  fetchTrending,
  fetchPopular,
  fetchHashtag,
  saveBlob,
  saveStream,
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
  InstanceSorting,
  Duration,
  DateValues,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  AudioQuality,
  ImageQuality,
};

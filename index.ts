import {
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
  Duration,
  DateValues,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  SaveSourceTo,
  AudioQuality,
  ImageQuality,
} from "./api/enums";
import {
  CommonOptions,
  ContentOptions,
  InstanceFetchOptions,
  PlaylistFetchOptions,
  VideoFetchOptions,
  ChannelFetchOptions,
  ChannelPlaylistsOptions,
  ChannelRelatedOptions,
  ChannelVideosOptions,
  CommentFetchOptions,
  SearchOptions,
  TrendingOptions,
  PopularOptions,
  StreamOptions,
} from "./api/interfaces";
import {
  MissingArgumentError,
  InvalidArgumentError,
  APINotAvailableError,
  APIError,
  BlockedVideoError,
  NotFoundError,
} from "./api/errors";
import {
  Instance,
  InstanceStats,
  SoftwareStats,
  UserStats,
  Channel,
  Playlist,
  Video,
  Format,
  Image,
  Comment,
} from "./api/classes";
import { convertToString } from "./utils/LengthConverter";
import { addFormats, addThumbnails, fillMixData } from "./utils/ObjectCreator";
import { QueryParams } from "./utils/Query";
import axios from "axios";
import fs from "fs";

/**
 * @name fetchInstances
 * @description Fetches public Invidious instances.
 * @param {InstanceFetchOptions} [opts] - Instance fetch options.
 * @example await InvidJS.fetchInstances();
 * @example await InvidJS.fetchInstances({limit: 10});
 * @returns {Promise<Instance[]>} Array of instance objects.
 */
async function fetchInstances(
  opts: InstanceFetchOptions = {
    type: InstanceTypes.ALL,
    region: "all",
    api_allowed: "any",
    limit: 0,
  }
): Promise<Instance[]> {
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  if (opts.health && (typeof opts.health !== "number" || opts.health < 0))
    throw new InvalidArgumentError(
      "Health is invalid - must be a number greater than 0!"
    );
  let instances: Array<Instance> = [];
  await axios
    .get("https://api.invidious.io/instances.json")
    .then((res) => {
      res.data.forEach((instance: any) => {
        let health = undefined;
        if (instance[1].monitor !== null) {
          health = instance[1].monitor.dailyRatios[0].ratio;
        }
        if (
          (!opts.url || opts.url === instance[1].uri) &&
          (!opts.type ||
            opts.type === "all" ||
            instance[1].type === opts.type) &&
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
              instance[1].region,
              instance[1].cors,
              instance[1].api,
              instance[1].type,
              instance[1].uri,
              parseFloat(health)
            )
          );
        } else return false;
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  instances.sort((a, b) => {
    if (a.health && b.health && a.health < b.health) return 1;
    if (a.health && b.health && a.health > b.health) return -1;
    return 0;
  });
  return instances;
}

/**
 * @name fetchStats
 * @description Fetches stats of an instance.
 * @param {Instance} instance - Instance to fetch data from.
 * @example await InvidJS.fetchStats(instance);
 * @returns {Promise<InstanceStats>} Instance stats object.
 */
async function fetchStats(instance: Instance): Promise<InstanceStats> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let stats!: InstanceStats;
  await axios
    .get(`${instance.url}/api/v1/stats`)
    .then((res) => {
      let software = new SoftwareStats(
        res.data.software.name,
        res.data.software.version,
        res.data.software.branch
      );
      let users = new UserStats(
        res.data.usage.users.total,
        res.data.usage.users.activeHalfyear,
        res.data.usage.users.activeMonth,
        res.data.openRegistrations
      );
      stats = new InstanceStats(software, users);
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return stats;
}

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
async function fetchVideo(
  instance: Instance,
  id: string,
  opts: VideoFetchOptions = {
    region: "US",
    type: FetchTypes.Basic,
  }
): Promise<Video> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError("You must provide a video ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Video;
  const queryURL = `${instance.url}/api/v1/videos/${id}`;
  let params = new QueryParams();
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
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      switch (opts.type) {
        case FetchTypes.Full: {
          let lengthString = convertToString(res.data.lengthSeconds);
          let formats = addFormats(
            res.data.formatStreams.concat(res.data.adaptiveFormats)
          );
          let thumbnails = addThumbnails(res.data.videoThumbnails);
          info = new Video(
            res.data.title,
            id,
            formats,
            res.data.lengthSeconds,
            lengthString,
            res.data.author,
            res.data.authorId,
            res.data.description,
            res.data.publishedText,
            res.data.viewCount,
            res.data.likeCount,
            res.data.dislikeCount,
            thumbnails
          );
          break;
        }
        case FetchTypes.Basic:
        default: {
          let lengthString = convertToString(res.data.lengthSeconds);
          let formats = addFormats(
            res.data.formatStreams.concat(res.data.adaptiveFormats)
          );
          info = new Video(
            res.data.title,
            id,
            formats,
            res.data.lengthSeconds,
            lengthString
          );
          break;
        }
        case FetchTypes.Minimal: {
          info = new Video(res.data.title, id);
          break;
        }
      }
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        if (err.message.includes("404"))
          throw new NotFoundError("The video you provided was not found!");
        else throw new APIError(err.message);
      }
    });
  return info;
}

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
async function fetchComments(
  instance: Instance,
  video: Video,
  opts: CommentFetchOptions = {
    sorting: CommentSorting.Top,
    limit: 0,
  }
): Promise<Comment[]> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError(
      "You must provide a video to fetch comments!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let comments: Array<Comment> = [];
  const queryURL = `${instance.url}/api/v1/comments/${video.id}`;
  let params = new QueryParams();
  if (opts.sorting) params.sort_by = opts.sorting;
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.comments.forEach((comment: any) => {
        if (!opts.limit || opts.limit === 0 || comments.length < opts.limit)
          comments.push(
            new Comment(comment.author, comment.authorId, comment.content)
          );
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return comments;
}

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
async function fetchPlaylist(
  instance: Instance,
  id: string,
  opts: PlaylistFetchOptions = {
    type: FetchTypes.Basic,
    limit: 0,
  }
): Promise<Playlist> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a playlist ID to fetch it!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let info!: Playlist;
  const queryURL = `${instance.url}/api/v1/playlists/${id}`;
  let params = new QueryParams();
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
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      switch (opts.type) {
        case FetchTypes.Full: {
          let videos: Array<Video> = [];
          res.data.videos.forEach((video: any) => {
            if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
              videos.push(new Video(video.title, video.videoId));
          });
          let data = fillMixData(res.data.author, res.data.authorId, res.data.description)
          info = new Playlist(
            res.data.title,
            id,
            videos,
            res.data.videos.length,
            data.mixAuthor,
            data.authorId,
            data.mixDescription,
            new Image(res.data.playlistThumbnail, 168, 94, ImageQuality.High)
          );
          break;
        }
        case FetchTypes.Basic:
        default: {
          let videos: Array<Video> = [];
          res.data.videos.forEach((video: any) => {
            if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
              videos.push(new Video(video.title, video.videoId));
          });
          info = new Playlist(
            res.data.title,
            id,
            videos,
            res.data.videos.length
          );
          break;
        }
        case FetchTypes.Minimal: {
          info = new Playlist(res.data.title, id);
          break;
        }
      }
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        if (err.message.includes("404"))
          throw new NotFoundError("The playlist you provided was not found!");
        else throw new APIError(err.message);
      }
    });
  return info;
}

/**
 * @name fetchChannel
 * @description Fetches channel data.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Channel ID.
 * @param {ChannelFetchOptions} [opts] - Channel fetch options.
 * @example await InvidJS.fetchChannel(instance, "id");
 * @returns {Promise<Channel>} Channel object.
 */
async function fetchChannel(
  instance: Instance,
  id: string,
  opts: ChannelFetchOptions = {
    type: FetchTypes.Basic,
  }
): Promise<Channel> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a channel ID to fetch it!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Channel;
  const queryURL = `${instance.url}/api/v1/channels/${id}?fields=author,authorId,subCount,totalViews,description,authorVerified,latestVideos`;
  let params = new QueryParams();
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
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      switch (opts.type) {
        case FetchTypes.Full: {
          info = new Channel(
            res.data.author,
            res.data.authorId,
            res.data.subCount,
            res.data.description,
            res.data.totalViews,
            res.data.authorVerified,
            res.data.latestVideos
          );
          break;
        }
        case FetchTypes.Basic:
        default: {
          info = new Channel(
            res.data.author,
            res.data.authorId,
            res.data.subCount
          );
          break;
        }
        case FetchTypes.Minimal: {
          info = new Channel(res.data.author, res.data.authorId);
          break;
        }
      }
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        if (err.message.includes("404"))
          throw new NotFoundError("The channel you provided was not found!");
        else throw new APIError(err.message);
      }
    });
  return info;
}

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
async function fetchRelatedChannels(
  instance: Instance,
  channel: Channel,
  opts: ChannelRelatedOptions = {
    limit: 0,
  }
): Promise<Array<Channel>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!channel)
    throw new MissingArgumentError(
      "You must provide a channel to fetch related channels!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let channels: Array<Channel> = [];
  const queryURL = `${instance.url}/api/v1/channels/${channel.id}/channels`;
  await axios
    .get(queryURL)
    .then((res) => {
      res.data.relatedChannels.forEach((channel: any) => {
        if (!opts.limit || opts.limit === 0 || channels.length < opts.limit)
          channels.push(new Channel(channel.author, channel.authorId));
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return channels;
}

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
async function fetchChannelPlaylists(
  instance: Instance,
  channel: Channel,
  opts: ChannelPlaylistsOptions = {
    sorting: ChannelPlaylistsSorting.Newest,
    limit: 0,
  }
): Promise<Array<Playlist>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!channel)
    throw new MissingArgumentError(
      "You must provide a channel to fetch playlists!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let playlists: Array<Playlist> = [];
  const queryURL = `${instance.url}/api/v1/channels/${channel.id}/playlists`;
  let params = new QueryParams();
  if (opts.sorting) params.sort_by = opts.sorting;
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.playlists.forEach((playlist: any) => {
        if (!opts.limit || opts.limit === 0 || playlists.length < opts.limit)
          playlists.push(new Playlist(playlist.title, playlist.playlistId));
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return playlists;
}

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
async function fetchChannelVideos(
  instance: Instance,
  channel: Channel,
  opts: ChannelVideosOptions = {
    sorting: ChannelVideosSorting.Newest,
    limit: 0,
  }
): Promise<Array<Video>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!channel)
    throw new MissingArgumentError(
      "You must provide a channel to fetch videos!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let videos: Array<Video> = [];
  const queryURL = `${instance.url}/api/v1/channels/${channel.id}/videos`;
  let params = new QueryParams();
  if (opts.sorting) params.sort_by = opts.sorting;
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.videos.forEach((video: any) => {
        if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
          videos.push(new Video(video.title, video.videoId));
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return videos;
}

/**
 * @name fetchSearchSuggestions
 * @description Fetches suggestions for a search query.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} query - Search query.
 * @example await InvidJS.fetchSearchSuggestions(instance, "search");
 * @returns {Promise<Array<string>>} Array of search suggestions.
 */
async function fetchSearchSuggestions(
  instance: Instance,
  query: string
): Promise<Array<string>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let suggestions: Array<string> = [];
  const queryURL = `${instance.url}/api/v1/search/suggestions`;
  let params = new QueryParams();
  params.q = query;
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.suggestions.forEach((suggestion: any) => {
        suggestions.push(suggestion);
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return suggestions;
}

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
async function searchContent(
  instance: Instance,
  query: string,
  opts: SearchOptions = {
    page: 1,
    sorting: VideoSorting.Relevance,
    type: ContentTypes.Video,
    region: "US",
    limit: 0,
  }
): Promise<Array<Channel | Playlist | Video>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/search?q=${query}`;
  let params = new QueryParams();
  params.q = query;
  if (opts.page) params.page = opts.page;
  if (opts.sorting) params.sort_by = opts.sorting;
  if (opts.date) params.date = opts.date;
  if (opts.duration) params.duration = opts.duration;
  if (opts.type) params.type = opts.type;
  if (opts.features) params.features = opts.features;
  if (opts.region) params.region = opts.region;
  let results: Array<Channel | Playlist | Video> = [];
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.forEach((result: any) => {
        if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
          switch (result.type) {
            case "video": {
              results.push(new Video(result.title, result.videoId));
              break;
            }
            case "playlist": {
              let videos: Video[] = [];
              result.videos.forEach((video: any) => {
                videos.push(new Video(video.title, video.videoId));
              });
              results.push(
                new Playlist(result.title, result.playlistId, videos)
              );
              break;
            }
            case "channel": {
              results.push(
                new Channel(result.author, result.authorId, result.subCount)
              );
              break;
            }
          }
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return results;
}

/**
 * @name fetchTrending
 * @description Fetches trending videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {TrendingOptions} [opts] - Trending fetch options.
 * @example await InvidJS.fetchTrending(instance);
 * @example await InvidJS.fetchTrending(instance, {limit: 6});
 * @returns {Promise<Array<Video>>} Array of trending videos.
 */
async function fetchTrending(
  instance: Instance,
  opts: TrendingOptions = {
    region: "US",
    type: TrendingTypes.Music,
    limit: 0,
  }
): Promise<Array<Video>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/trending`;
  let params = new QueryParams();
  if (opts.region) params.region = opts.region;
  if (opts.type) params.type = opts.type;
  let results: Array<Video> = [];
  await axios
    .get(queryURL, { params: params })
    .then((res) => {
      res.data.forEach((result: any) => {
        if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
          results.push(new Video(result.title, result.videoId));
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return results;
}

/**
 * @name fetchPopular
 * @description Fetches popular videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {PopularOptions} [opts] - Popular fetch options.
 * @example await InvidJS.fetchPopular(instance);
 * @example await InvidJS.fetchPopular(instance, {limit: 10});
 * @returns {Promise<Array<Video>>} Array of popular videos.
 */
async function fetchPopular(
  instance: Instance,
  opts: PopularOptions = {
    limit: 0,
  }
): Promise<Array<Video>> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/popular`;
  let results: Array<Video> = [];
  await axios
    .get(queryURL)
    .then((res) => {
      res.data.forEach((result: any) => {
        if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
          results.push(new Video(result.title, result.videoId));
      });
    })
    .catch((err) => {
      if (err.name === "AxiosError") {
        throw new APIError(err.message);
      }
    });
  return results;
}

/**
 * @name validateSource
 * @description Validates length of a format stream.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to validate.
 * @example await InvidJS.validateSource(instance, video, format);
 * @returns {Promise<boolean | undefined>} Is source valid?
 */
async function validateSource(
  instance: Instance,
  video: Video,
  source: Format
): Promise<boolean | undefined> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  const queryURL = `${instance.url}/latest_version`;
  let params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  try {
    let lengthQuery = await axios.get(queryURL, {
      params: params,
      headers: { Range: `bytes=0-0` },
    });
    let length = lengthQuery.headers["content-range"].split("/")[1];
    if (parseInt(length) > 0) return true;
    if (!length || length === undefined) return false;
  } catch (err: any) {
    if (err.name === "AxiosError") {
      if (err.message.includes("403")) {
        throw new BlockedVideoError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      } else throw new APIError(err.message);
    }
  }
}

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
async function fetchSource(
  instance: Instance,
  video: Video,
  source: Format,
  opts: StreamOptions = {
    saveTo: SaveSourceTo.File,
    path: "./",
    parts: 5,
  }
): Promise<ReadableStream | string> {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  if (opts && !opts.saveTo) opts.saveTo = SaveSourceTo.File;
  if (opts && opts.saveTo === SaveSourceTo.File && !opts.path) opts.path = "./";
  if (opts && !opts.parts) opts.parts = 1;
  if (opts.parts && opts.parts < 1)
    throw new InvalidArgumentError(
      "A source must be downloaded in at least a single part!"
    );
  if (opts.parts && opts.parts > 10) opts.parts = 10;
  const queryURL = `${instance.url}/latest_version`;
  let params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  try {
    let lengthQuery = await axios.get(queryURL, {
      params: params,
      headers: { Range: `bytes=0-0` },
    });
    let length = lengthQuery.headers["content-range"].split("/")[1];
    if (opts.parts) {
      let parts = Math.ceil(parseInt(length) / opts.parts);
      let positions: Array<number> = [];
      for (let i = 0; i < opts.parts; i++) {
        positions.push(i * parts);
      }
      let promises: Array<Promise<any>> = [];
      positions.forEach((position) => {
        let range = `bytes=${position}-${position + parts - 1}`;
        promises.push(
          axios.get(queryURL, {
            params: params,
            headers: { Range: range },
            responseType: "arraybuffer",
          })
        );
      });
      let responses = await axios.all(promises);
      let buffer = new ArrayBuffer(parseInt(length));
      let view = new DataView(buffer);
      let offset = 0;
      responses.forEach((response) => {
        let array = new Uint8Array(response.data);
        for (let i = 0; i < array.length; i++) {
          view.setUint8(offset + i, array[i]);
        }
        offset += array.length;
      });
      switch (opts.saveTo) {
        case SaveSourceTo.Memory: {
          let blob = new Blob([buffer], { type: source.type.split("/")[0] });
          return blob.stream();
        }
        case SaveSourceTo.File:
        default: {
          let file = fs.createWriteStream(
            `${opts.path}${video.id}.${source.container}`
          );
          file.write(Buffer.from(buffer));
          return `${opts.path}${video.id}.${source.container}`;
        }
      }
    } else return "";
  } catch (err: any) {
    if (err.name === "AxiosError") {
      if (err.message.includes("403")) {
        throw new BlockedVideoError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      } else throw new APIError(err.message);
    }
  }
  return "";
}

export {
  fetchInstances,
  fetchStats,
  fetchVideo,
  fetchComments,
  fetchPlaylist,
  fetchChannel,
  fetchRelatedChannels,
  fetchChannelPlaylists,
  fetchChannelVideos,
  fetchSearchSuggestions,
  searchContent,
  fetchTrending,
  fetchPopular,
  validateSource,
  fetchSource,
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
  Duration,
  DateValues,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  SaveSourceTo,
  AudioQuality,
  ImageQuality,
};

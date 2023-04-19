"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var InvidJS_exports = {};
__export(InvidJS_exports, {
  AudioQuality: () => AudioQuality,
  ChannelPlaylistsSorting: () => ChannelPlaylistsSorting,
  ChannelVideosSorting: () => ChannelVideosSorting,
  CommentSorting: () => CommentSorting,
  ContentTypes: () => ContentTypes,
  DateValues: () => DateValues,
  Duration: () => Duration,
  ErrorCodes: () => ErrorCodes,
  FetchTypes: () => FetchTypes,
  InstanceTypes: () => InstanceTypes,
  SaveSourceTo: () => SaveSourceTo,
  TrendingTypes: () => TrendingTypes,
  VideoSorting: () => VideoSorting,
  fetchChannel: () => fetchChannel,
  fetchChannelPlaylists: () => fetchChannelPlaylists,
  fetchChannelVideos: () => fetchChannelVideos,
  fetchComments: () => fetchComments,
  fetchInstances: () => fetchInstances,
  fetchPlaylist: () => fetchPlaylist,
  fetchPopular: () => fetchPopular,
  fetchRelatedChannels: () => fetchRelatedChannels,
  fetchSearchSuggestions: () => fetchSearchSuggestions,
  fetchSource: () => fetchSource,
  fetchStats: () => fetchStats,
  fetchTrending: () => fetchTrending,
  fetchVideo: () => fetchVideo,
  searchContent: () => searchContent,
  validateSource: () => validateSource
});
module.exports = __toCommonJS(InvidJS_exports);

// classes/media.ts
var Channel = class {
  constructor(name, id, subs, description, views, isVerified, latest_videos) {
    this.name = name;
    this.id = id;
    this.subs = subs;
    this.description = description;
    this.views = views;
    this.isVerified = isVerified;
    this.latest_videos = latest_videos;
  }
};
var Playlist = class {
  constructor(title, id, videos, videoCount, author, author_id, description, thumbnail) {
    this.title = title;
    this.id = id;
    this.videos = videos;
    this.videoCount = videoCount;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.thumbnail = thumbnail;
  }
};
var Video = class {
  constructor(title, id, formats, length, lengthString, author, author_id, description, published, views, likes, dislikes, thumbnails) {
    this.title = title;
    this.id = id;
    this.formats = formats;
    this.length = length;
    this.lengthString = lengthString;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.published = published;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.thumbnails = thumbnails;
  }
};
var Format = class {
  constructor(url, tag, type, container, audio_quality, audio_sampleRate, audio_channels) {
    this.url = url;
    this.tag = tag;
    this.type = type;
    this.container = container;
    this.audio_quality = audio_quality;
    this.audio_sampleRate = audio_sampleRate;
    this.audio_channels = audio_channels;
  }
};
var Image = class {
  constructor(url, width, height, quality) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.quality = quality;
  }
};
var Comment = class {
  constructor(author, author_id, text) {
    this.author = author;
    this.author_id = author_id;
    this.text = text;
  }
};
var AudioQuality = /* @__PURE__ */ ((AudioQuality2) => {
  AudioQuality2["Low"] = "AUDIO_QUALITY_LOW";
  AudioQuality2["Medium"] = "AUDIO_QUALITY_MEDIUM";
  return AudioQuality2;
})(AudioQuality || {});

// classes/instance.ts
var Instance = class {
  constructor(region, cors_allowed, api_allowed, type, url, health) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.url = url;
    this.health = health;
  }
};
var InstanceStats = class {
  constructor(software_name, software_version, software_branch, users_total, users_active_halfyear, users_active_month, registrations) {
    this.software_name = software_name;
    this.software_version = software_version;
    this.software_branch = software_branch;
    this.users_total = users_total;
    this.users_active_halfyear = users_active_halfyear;
    this.users_active_month = users_active_month;
    this.registrations = registrations;
  }
};

// classes/options.ts
var FetchTypes = /* @__PURE__ */ ((FetchTypes2) => {
  FetchTypes2["Minimal"] = "minimal";
  FetchTypes2["Basic"] = "basic";
  FetchTypes2["Full"] = "full";
  return FetchTypes2;
})(FetchTypes || {});
var InstanceTypes = /* @__PURE__ */ ((InstanceTypes2) => {
  InstanceTypes2["https"] = "https";
  InstanceTypes2["tor"] = "onion";
  InstanceTypes2["i2p"] = "i2p";
  InstanceTypes2["ALL"] = "all";
  return InstanceTypes2;
})(InstanceTypes || {});
var ContentTypes = /* @__PURE__ */ ((ContentTypes2) => {
  ContentTypes2["Video"] = "video";
  ContentTypes2["Playlist"] = "playlist";
  ContentTypes2["Channel"] = "channel";
  ContentTypes2["Movie"] = "movie";
  ContentTypes2["Show"] = "show";
  ContentTypes2["ALL"] = "all";
  return ContentTypes2;
})(ContentTypes || {});
var TrendingTypes = /* @__PURE__ */ ((TrendingTypes2) => {
  TrendingTypes2["Music"] = "music";
  TrendingTypes2["Gaming"] = "gaming";
  TrendingTypes2["News"] = "news";
  TrendingTypes2["Movies"] = "movies";
  return TrendingTypes2;
})(TrendingTypes || {});
var VideoSorting = /* @__PURE__ */ ((VideoSorting2) => {
  VideoSorting2["Relevance"] = "relevance";
  VideoSorting2["Rating"] = "rating";
  VideoSorting2["UploadDate"] = "upload_date";
  VideoSorting2["ViewCount"] = "view_count";
  return VideoSorting2;
})(VideoSorting || {});
var CommentSorting = /* @__PURE__ */ ((CommentSorting2) => {
  CommentSorting2["Top"] = "top";
  CommentSorting2["New"] = "new";
  return CommentSorting2;
})(CommentSorting || {});
var Duration = /* @__PURE__ */ ((Duration2) => {
  Duration2["Short"] = "short";
  Duration2["Medium"] = "medium";
  Duration2["Long"] = "long";
  return Duration2;
})(Duration || {});
var DateValues = /* @__PURE__ */ ((DateValues2) => {
  DateValues2["Hour"] = "hour";
  DateValues2["Today"] = "today";
  DateValues2["Week"] = "week";
  DateValues2["Month"] = "month";
  DateValues2["Year"] = "year";
  return DateValues2;
})(DateValues || {});
var ChannelVideosSorting = /* @__PURE__ */ ((ChannelVideosSorting2) => {
  ChannelVideosSorting2["Newest"] = "newest";
  ChannelVideosSorting2["Popular"] = "popular";
  ChannelVideosSorting2["Oldest"] = "oldest";
  return ChannelVideosSorting2;
})(ChannelVideosSorting || {});
var ChannelPlaylistsSorting = /* @__PURE__ */ ((ChannelPlaylistsSorting2) => {
  ChannelPlaylistsSorting2["Newest"] = "newest";
  ChannelPlaylistsSorting2["Popular"] = "popular";
  ChannelPlaylistsSorting2["Last"] = "last";
  return ChannelPlaylistsSorting2;
})(ChannelPlaylistsSorting || {});
var SaveSourceTo = /* @__PURE__ */ ((SaveSourceTo2) => {
  SaveSourceTo2["Memory"] = "memory";
  SaveSourceTo2["File"] = "file";
  return SaveSourceTo2;
})(SaveSourceTo || {});

// classes/errors.ts
var MissingArgumentError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingArgumentError";
    this.code = 1e4 /* MissingArgument */;
    Object.setPrototypeOf(this, MissingArgumentError.prototype);
  }
};
var InvalidArgumentError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
    this.code = 10001 /* InvalidArgument */;
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
};
var APINotAvailableError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "APINotAvailableError";
    this.code = 10002 /* APIBlocked */;
    Object.setPrototypeOf(this, APINotAvailableError.prototype);
  }
};
var APIError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "APIError";
    this.code = 10003 /* APIError */;
    Object.setPrototypeOf(this, APIError.prototype);
  }
};
var BlockedVideoError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BlockedVideoError";
    this.code = 10004 /* BlockedVideo */;
    Object.setPrototypeOf(this, BlockedVideoError.prototype);
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = 10005 /* InvalidContent */;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
};
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2[ErrorCodes2["MissingArgument"] = 1e4] = "MissingArgument";
  ErrorCodes2[ErrorCodes2["InvalidArgument"] = 10001] = "InvalidArgument";
  ErrorCodes2[ErrorCodes2["APIBlocked"] = 10002] = "APIBlocked";
  ErrorCodes2[ErrorCodes2["APIError"] = 10003] = "APIError";
  ErrorCodes2[ErrorCodes2["BlockedVideo"] = 10004] = "BlockedVideo";
  ErrorCodes2[ErrorCodes2["InvalidContent"] = 10005] = "InvalidContent";
  return ErrorCodes2;
})(ErrorCodes || {});

// index.ts
var import_axios = __toESM(require("axios"));
var import_fs_extra = __toESM(require("fs-extra"));
async function fetchInstances(opts = {
  type: "all" /* ALL */,
  region: "all",
  api_allowed: "any",
  limit: 0
}) {
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  if (opts.health && (typeof opts.health !== "number" || opts.health < 0))
    throw new InvalidArgumentError(
      "Health is invalid - must be a number greater than 0!"
    );
  let instances = [];
  await import_axios.default.get("https://api.invidious.io/instances.json").then((res) => {
    res.data.forEach((instance) => {
      let health = void 0;
      if (instance[1].monitor !== null) {
        health = instance[1].monitor.dailyRatios[0].ratio;
      }
      if ((!opts.url || opts.url === instance[1].uri) && (!opts.type || opts.type === "all" || instance[1].type === opts.type) && (!opts.region || opts.region === "all" || instance[1].region === opts.region) && (opts.api_allowed === void 0 || opts.api_allowed === "any" || instance[1].api === opts.api_allowed) && (!opts.health || opts.health === "any" || parseFloat(health) >= opts.health) && (!opts.limit || opts.limit === 0 || instances.length < opts.limit)) {
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
      } else
        return false;
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  instances.sort((a, b) => {
    if (a.health && b.health && a.health < b.health)
      return 1;
    if (a.health && b.health && a.health > b.health)
      return -1;
    return 0;
  });
  return instances;
}
async function fetchStats(instance) {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APINotAvailableError(
      "The instance you provided does not support API requests or is offline!"
    );
  let stats;
  await import_axios.default.get(`${instance.url}/api/v1/stats`).then((res) => {
    stats = new InstanceStats(
      res.data.software.name,
      res.data.software.version,
      res.data.software.branch,
      res.data.usage.users.total,
      res.data.usage.users.activeHalfyear,
      res.data.usage.users.activeMonth,
      res.data.openRegistrations
    );
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return stats;
}
async function fetchVideo(instance, id, opts = {
  region: "US",
  type: "basic" /* Basic */
}) {
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
  let info;
  let formats = [];
  let thumbnails = [];
  let params = `${instance.url}/api/v1/videos/${id}?fields=title,videoId,videoThumbnails,description,publishedText,viewCount,likeCount,dislikeCount,lengthSeconds,adaptiveFormats,formatStreams,author,authorId`;
  if (opts.region)
    params += `&region=${opts.region}`;
  await import_axios.default.get(params).then((res) => {
    let hours = Math.floor(res.data.lengthSeconds / 3600);
    let minutes = Math.floor(res.data.lengthSeconds / 60) % 60;
    let seconds = res.data.lengthSeconds % 60;
    let lengthString = [hours, minutes, seconds].map((v) => v < 10 ? "0" + v : v).filter((v, i) => v !== "00" || i > 0).join(":");
    res.data.formatStreams.concat(res.data.adaptiveFormats).forEach((format) => {
      let container = format.container ? format.container : format.type.split("/")[1].split(";")[0];
      if (!format.type.startsWith("audio")) {
        formats.push(
          new Format(format.url, format.itag, format.type, container)
        );
      } else {
        formats.push(
          new Format(
            format.url,
            format.itag,
            format.type,
            container,
            format.audioQuality,
            format.audioSampleRate,
            format.audioChannels
          )
        );
      }
    });
    res.data.videoThumbnails.forEach((thumb) => {
      thumbnails.push(
        new Image(thumb.url, thumb.width, thumb.height, thumb.quality)
      );
    });
    switch (opts.type) {
      case "full": {
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
      case "basic":
      default: {
        info = new Video(
          res.data.title,
          id,
          formats,
          res.data.lengthSeconds,
          lengthString
        );
        break;
      }
      case "minimal": {
        info = new Video(res.data.title, id);
        break;
      }
    }
  }).catch((err) => {
    if (err.name === "AxiosError") {
      if (err.message.includes("404"))
        throw new NotFoundError("The video you provided was not found!");
      else
        throw new APIError(err.message);
    }
  });
  return info;
}
async function fetchComments(instance, video, opts = {
  sorting: "top" /* Top */,
  limit: 0
}) {
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
  let comments = [];
  let params = `${instance.url}/api/v1/comments/${video.id}`;
  if (opts.sorting)
    params += `?sort_by=${opts.sorting}`;
  await import_axios.default.get(params).then((res) => {
    res.data.comments.forEach((comment) => {
      if (!opts.limit || opts.limit === 0 || comments.length < opts.limit)
        comments.push(
          new Comment(comment.author, comment.authorId, comment.content)
        );
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return comments;
}
async function fetchPlaylist(instance, id, opts = {
  type: "basic" /* Basic */,
  limit: 0
}) {
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
  let info;
  let videos = [];
  let params = `${instance.url}/api/v1/playlists/${id}?fields=title,playlistId,playlistThumbnail,videos,author,authorId,description,videoCount`;
  await import_axios.default.get(params).then((res) => {
    res.data.videos.forEach((video) => {
      if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
        videos.push(new Video(video.title, video.videoId));
    });
    switch (opts.type) {
      case "full": {
        let author = res.data.author ? res.data.author : "SYSTEM";
        let authorId = res.data.authorId ? res.data.authorId : "-1";
        let description = res.data.description ? res.data.description : "This playlist was created by the system.";
        info = new Playlist(
          res.data.title,
          id,
          videos,
          res.data.videos.length,
          author,
          authorId,
          description,
          new Image(res.data.playlistThumbnail, 168, 94, "hqdefault")
        );
        break;
      }
      case "basic":
      default: {
        info = new Playlist(res.data.title, id, videos, res.data.videos.length);
        break;
      }
      case "minimal": {
        info = new Playlist(res.data.title, id);
        break;
      }
    }
  }).catch((err) => {
    if (err.name === "AxiosError") {
      if (err.message.includes("404"))
        throw new NotFoundError("The playlist you provided was not found!");
      else
        throw new APIError(err.message);
    }
  });
  return info;
}
async function fetchChannel(instance, id, opts = {
  type: "basic" /* Basic */
}) {
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
  let info;
  let params = `${instance.url}/api/v1/channels/${id}?fields=author,authorId,subCount,totalViews,description,authorVerified,latestVideos`;
  await import_axios.default.get(params).then((res) => {
    switch (opts.type) {
      case "full": {
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
      case "basic":
      default: {
        info = new Channel(
          res.data.author,
          res.data.authorId,
          res.data.subCount
        );
        break;
      }
      case "minimal": {
        info = new Channel(res.data.author, res.data.authorId);
        break;
      }
    }
  }).catch((err) => {
    if (err.name === "AxiosError") {
      if (err.message.includes("404"))
        throw new NotFoundError("The channel you provided was not found!");
      else
        throw new APIError(err.message);
    }
  });
  return info;
}
async function fetchRelatedChannels(instance, channel, opts = {
  limit: 0
}) {
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
  let channels = [];
  let params = `${instance.url}/api/v1/channels/${channel.id}/channels`;
  await import_axios.default.get(params).then((res) => {
    res.data.relatedChannels.forEach((channel2) => {
      if (!opts.limit || opts.limit === 0 || channels.length < opts.limit)
        channels.push(new Channel(channel2.author, channel2.authorId));
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return channels;
}
async function fetchChannelPlaylists(instance, channel, opts = {
  sorting: "newest" /* Newest */,
  limit: 0
}) {
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
  let playlists = [];
  let params = `${instance.url}/api/v1/channels/${channel.id}/playlists`;
  await import_axios.default.get(params).then((res) => {
    res.data.playlists.forEach((playlist) => {
      if (!opts.limit || opts.limit === 0 || playlists.length < opts.limit)
        playlists.push(new Playlist(playlist.title, playlist.playlistId));
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return playlists;
}
async function fetchChannelVideos(instance, channel, opts = {
  sorting: "newest" /* Newest */,
  limit: 0
}) {
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
  let videos = [];
  let params = `${instance.url}/api/v1/channels/${channel.id}/videos`;
  await import_axios.default.get(params).then((res) => {
    res.data.videos.forEach((video) => {
      if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
        videos.push(new Video(video.title, video.videoId));
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return videos;
}
async function fetchSearchSuggestions(instance, query) {
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
  let suggestions = [];
  let params = `${instance.url}/api/v1/search/suggestions?q=${query}`;
  await import_axios.default.get(params).then((res) => {
    res.data.suggestions.forEach((suggestion) => {
      suggestions.push(suggestion);
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return suggestions;
}
async function searchContent(instance, query, opts = {
  page: 1,
  sorting: "relevance" /* Relevance */,
  type: "video" /* Video */,
  region: "US",
  limit: 0
}) {
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
  let params = `${instance.url}/api/v1/search?q=${query}`;
  if (opts.page)
    params += `&page=${opts.page}`;
  if (opts.sorting)
    params += `&sort_by=${opts.sorting}`;
  if (opts.date)
    params += `&date=${opts.date}`;
  if (opts.duration)
    params += `&duration=${opts.duration}`;
  if (opts.type)
    params += `&type=${opts.type}`;
  if (opts.features)
    params += `&features=${opts.features}`;
  if (opts.region)
    params += `&region=${opts.region}`;
  let results = [];
  await import_axios.default.get(params).then((res) => {
    res.data.forEach((result) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        switch (result.type) {
          case "video": {
            results.push(new Video(result.title, result.videoId));
            break;
          }
          case "playlist": {
            let videos = [];
            result.videos.forEach((video) => {
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
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return results;
}
async function fetchTrending(instance, opts = {
  region: "US",
  type: "music" /* Music */,
  limit: 0
}) {
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
  let params = `${instance.url}/api/v1/trending`;
  if (opts.region)
    params += `?region=${opts.region}`;
  if (opts.type)
    params += `&type=${opts.type}`;
  let results = [];
  await import_axios.default.get(params).then((res) => {
    res.data.forEach((result) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId));
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return results;
}
async function fetchPopular(instance, opts = {
  limit: 0
}) {
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
  let params = `${instance.url}/api/v1/popular`;
  let results = [];
  await import_axios.default.get(params).then((res) => {
    res.data.forEach((result) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId));
    });
  }).catch((err) => {
    if (err.name === "AxiosError") {
      throw new APIError(err.message);
    }
  });
  return results;
}
async function validateSource(instance, video, source) {
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
  let params = `${instance.url}/latest_version?id=${video.id}&itag=${source.tag}`;
  try {
    let lengthQuery = await import_axios.default.get(params, {
      headers: { Range: `bytes=0-0` }
    });
    let length = lengthQuery.headers["content-range"].split("/")[1];
    if (parseInt(length) > 0)
      return true;
    if (!length || length === void 0)
      return false;
  } catch (err) {
    if (err.name === "AxiosError") {
      if (err.message.includes("403")) {
        throw new BlockedVideoError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      } else
        throw new APIError(err.message);
    }
  }
}
async function fetchSource(instance, video, source, opts = {
  saveTo: "file" /* File */,
  path: "./",
  parts: 5
}) {
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
  if (opts && !opts.saveTo)
    opts.saveTo = "file" /* File */;
  if (opts && opts.saveTo === "file" /* File */ && !opts.path)
    opts.path = "./";
  if (opts && !opts.parts)
    opts.parts = 1;
  if (opts.parts && opts.parts < 1)
    throw new InvalidArgumentError(
      "A source must be downloaded in at least a single part!"
    );
  if (opts.parts && opts.parts > 10)
    opts.parts = 10;
  let params = `${instance.url}/latest_version?id=${video.id}&itag=${source.tag}`;
  try {
    let lengthQuery = await import_axios.default.get(params, {
      headers: { Range: `bytes=0-0` }
    });
    let length = lengthQuery.headers["content-range"].split("/")[1];
    if (opts.parts) {
      let parts = Math.ceil(parseInt(length) / opts.parts);
      let positions = [];
      for (let i = 0; i < opts.parts; i++) {
        positions.push(i * parts);
      }
      let promises = [];
      positions.forEach((position) => {
        let range = `bytes=${position}-${position + parts - 1}`;
        promises.push(
          import_axios.default.get(params, {
            headers: { Range: range },
            responseType: "arraybuffer"
          })
        );
      });
      let responses = await import_axios.default.all(promises);
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
        case "memory" /* Memory */: {
          let blob = new Blob([buffer], { type: source.type.split("/")[0] });
          return blob.stream();
        }
        case "file" /* File */:
        default: {
          let file = import_fs_extra.default.createWriteStream(
            `${opts.path}${video.id}.${source.container}`
          );
          file.write(Buffer.from(buffer));
          return `${opts.path}${video.id}.${source.container}`;
        }
      }
    } else
      return "";
  } catch (err) {
    if (err.name === "AxiosError") {
      if (err.message.includes("403")) {
        throw new BlockedVideoError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      } else
        throw new APIError(err.message);
    }
  }
  return "";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioQuality,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  CommentSorting,
  ContentTypes,
  DateValues,
  Duration,
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  SaveSourceTo,
  TrendingTypes,
  VideoSorting,
  fetchChannel,
  fetchChannelPlaylists,
  fetchChannelVideos,
  fetchComments,
  fetchInstances,
  fetchPlaylist,
  fetchPopular,
  fetchRelatedChannels,
  fetchSearchSuggestions,
  fetchSource,
  fetchStats,
  fetchTrending,
  fetchVideo,
  searchContent,
  validateSource
});

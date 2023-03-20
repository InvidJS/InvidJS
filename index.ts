import {
  Channel,
  Playlist,
  Video,
  Format,
  Comment,
  Instance,
  InstanceStats,
  InstanceFetchOptions,
  VideoFetchOptions,
  PlaylistFetchOptions,
  ChannelFetchOptions,
  CommentFetchOptions,
  SearchOptions,
  TrendingOptions,
  PopularOptions,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
} from "./classes/index";
import axios from "axios";
import fs from "fs-extra";

/**
 * @name fetchInstances
 * @description Fetches active instances.
 * @param {InstanceFetchOptions} [opts] - Search options.
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
  let instances: Array<Instance> = [];
  await axios.get("https://api.invidious.io/instances.json").then((res) => {
    //Only push instances that meet the search criteria.
    res.data.forEach((instance: any) => {
      //It is possible the user only provides some of the options.
      if (
        (!opts.url || opts.url === instance[1].uri) &&
        (!opts.type || opts.type === "all" || instance[1].type === opts.type) &&
        (!opts.region ||
          opts.region === "all" ||
          instance[1].region === opts.region) &&
        (opts.api_allowed === undefined ||
          opts.api_allowed === "any" ||
          instance[1].api === opts.api_allowed) &&
        (!opts.limit || opts.limit === 0 || instances.length < opts.limit)
      ) {
        instances.push(
          new Instance(
            instance[1].region,
            instance[1].cors,
            instance[1].api,
            instance[1].type,
            instance[1].uri
          )
        );
      } else return false;
    });
  });
  return instances;
}

/**
 * @name fetchStats
 * @description Fetches stats of an instance.
 * @param {Instance} instance - Instance to fetch data from.
 * @example await InvidJS.fetchStats(instance);
 * @returns {Promise<InstanceStats>} Instance stats.
 */
async function fetchStats(instance: Instance): Promise<InstanceStats> {
  if (!instance)
    throw new Error("You must provide an instance to fetch data from!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let stats!: InstanceStats;
  await axios.get(`${instance.url}/api/v1/stats`).then((res) => {
    stats = new InstanceStats(
      res.data.software.name,
      res.data.software.version,
      res.data.software.branch,
      res.data.usage.users.total,
      res.data.usage.users.activeHalfyear,
      res.data.usage.users.activeMonth,
      res.data.openRegistrations
    );
  });
  return stats;
}

/**
 * @name fetchVideo
 * @description Fetches a video and converts it into an object.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Video ID.
 * @param {VideoFetchOptions} [opts] - Fetch options.
 * @example await InvidJS.fetchVideo(instance, "id");
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
    throw new Error("You must provide an instance to fetch data from!");
  if (!id) throw new Error("You must provide a video ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Video;
  let formats: Array<Format> = [];
  let params = `${instance.url}/api/v1/videos/${id}?fields=title,videoId,description,publishedText,viewCount,likeCount,dislikeCount,lengthSeconds,adaptiveFormats,formatStreams,author,authorId`;
  if (opts.region) params += `&region=${opts.region}`;
  await axios.get(params).then((res) => {
    res.data.formatStreams
      .concat(res.data.adaptiveFormats)
      .forEach((format: any) => {
        let container = format.container
          ? format.container
          : format.type.split("/")[1].split(";")[0];
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
    switch (opts.type) {
      case "full": {
        info = new Video(
          res.data.title,
          id,
          formats,
          res.data.author,
          res.data.authorId,
          res.data.description,
          res.data.publishedText,
          res.data.viewCount,
          res.data.likeCount,
          res.data.dislikeCount,
          res.data.lengthSeconds
        );
        break;
      }
      case "basic":
      default: {
        info = new Video(res.data.title, id, formats);
        break;
      }
      case "minimal": {
        info = new Video(res.data.title, id);
        break;
      }
    }
  });
  return info;
}

/**
 * @name fetchComments
 * @description Fetches comments of a video.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Video ID.
 * @param {CommentFetchOptions} [opts] - Fetch options.
 * @example await InvidJS.fetchComments(instance, "id");
 * @returns {Promise<Comment[]>} Comments array.
 */
async function fetchComments(
  instance: Instance,
  id: string,
  opts: CommentFetchOptions = {
    sorting: CommentSorting.Top,
    limit: 0,
  }
): Promise<Comment[]> {
  if (!instance)
    throw new Error("You must provide an instance to fetch data from!");
  if (!id) throw new Error("You must provide a video ID to fetch comments!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let comments: Array<Comment> = [];
  let params = `${instance.url}/api/v1/comments/${id}`;
  if (opts.sorting) params += `?sort_by=${opts.sorting}`;
  await axios.get(params).then((res) => {
    res.data.comments.forEach((comment: any) => {
      if (!opts.limit || opts.limit === 0 || comments.length < opts.limit)
        comments.push(
          new Comment(comment.author, comment.authorId, comment.content)
        );
    });
  });
  return comments;
}

/**
 * @name fetchPlaylist
 * @description Fetches a playlist and converts it into an object.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Playlist ID.
 * @param {PlaylistFetchOptions} [opts] - Fetch options.
 * @example await InvidJS.fetchPlaylist(instance, "id");
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
    throw new Error("You must provide an instance to fetch data from!");
  if (!id) throw new Error("You must provide a playlist ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Playlist;
  let videos: Array<Video> = [];
  let params = `${instance.url}/api/v1/playlists/${id}?fields=title,playlistId,videos,author,authorId,description,videoCount`;
  await axios.get(params).then((res) => {
    res.data.videos.forEach((video: any) => {
      if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
        videos.push(new Video(video.title, video.videoId));
    });
    switch (opts.type) {
      case "full": {
        let author = res.data.author ? res.data.author : "SYSTEM";
        let authorId = res.data.authorId ? res.data.authorId : "-1";
        let description = res.data.description
          ? res.data.description
          : "This playlist was created by the system.";
        info = new Playlist(
          res.data.title,
          id,
          videos,
          author,
          authorId,
          description,
          res.data.videos.length
        );
        break;
      }
      case "basic":
      default: {
        info = new Playlist(res.data.title, id, videos);
        break;
      }
      case "minimal": {
        info = new Playlist(res.data.title, id);
        break;
      }
    }
  });
  return info;
}

/**
 * @name fetchChannel
 * @description Fetches a channel and converts it into an object.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} id - Channel ID.
 * @param {ChannelFetchOptions} [opts] - Fetch options.
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
    throw new Error("You must provide an instance to fetch data from!");
  if (!id) throw new Error("You must provide a channel ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Channel;
  let params = `${instance.url}/api/v1/channels/${id}?fields=author,authorId,subCount,totalViews,description,authorVerified,latestVideos`;
  await axios.get(params).then((res) => {
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
  });
  return info;
}

/**
 * @name searchContent
 * @description Searches content based on the query and search options.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {string} query - Search query.
 * @param {SearchOptions} [opts] - Search options.
 * @example await InvidJS.searchContent(instance, "search");
 * @returns {Promise<Array<Channel | Playlist | Video>>} Array of search results.
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
    throw new Error("You must provide an instance to fetch data from!");
  if (!query) throw new Error("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.url}/api/v1/search?q=${query}`;
  if (opts.page) params += `&page=${opts.page}`;
  if (opts.sorting) params += `&sort_by=${opts.sorting}`;
  if (opts.date) params += `&date=${opts.date}`;
  if (opts.duration) params += `&duration=${opts.duration}`;
  if (opts.type) params += `&type=${opts.type}`;
  if (opts.features) params += `&features=${opts.features}`;
  if (opts.region) params += `&region=${opts.region}`;
  let results: Array<Channel | Playlist | Video> = [];
  await axios.get(params).then((res) => {
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
            results.push(new Playlist(result.title, result.playlistId, videos));
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
  });
  return results;
}

/**
 * @name fetchTrending
 * @description Fetches trending videos.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {TrendingOptions} [opts] - Search options.
 * @example await InvidJS.fetchTrending(instance);
 * @returns {Promise<Array<Video>>} Array of search results.
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
    throw new Error("You must provide an instance to fetch data from!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.url}/api/v1/trending`;
  if (opts.region) params += `?region=${opts.region}`;
  if (opts.type) params += `&type=${opts.type}`;
  let results: Array<Video> = [];
  await axios.get(params).then((res) => {
    res.data.forEach((result: any) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId));
    });
  });
  return results;
}

/**
 * @name fetchPopular
 * @description Searches content based on the query and search options.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {PopularOptions} [opts] - Search options.
 * @example await InvidJS.fetchPopular(instance);
 * @returns {Promise<Array<Video>>} Array of search results.
 */
async function fetchPopular(
  instance: Instance,
  opts: PopularOptions = {
    limit: 0,
  }
): Promise<Array<Video>> {
  if (!instance)
    throw new Error("You must provide an instance to fetch data from!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.url}/api/v1/popular`;
  let results: Array<Video> = [];
  await axios.get(params).then((res) => {
    res.data.forEach((result: any) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId));
    });
  });
  return results;
}

/**
 * @name downloadSource
 * @description Fetches a video stream and saves it into a file.
 * @param {Instance} instance - Instance to fetch data from.
 * @param {Video} video - Video to fetch stream from.
 * @param {Format} source - Format to download.
 * @param {string} path - Path to save downloaded stream to. Do not include the file name.
 * @returns {File} Source file.
 */
async function downloadSource(
  instance: Instance,
  video: Video,
  source: Format,
  path: string = "./"
): Promise<any> {
  if (!instance)
    throw new Error("You must provide an instance to fetch data from!");
  if (!video) throw new Error("You must provide a valid video object!");
  if (!source)
    throw new Error(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  //TODO: Download sources with multi-connection in mind.
  return true;
}

export {
  fetchInstances,
  fetchStats,
  fetchVideo,
  fetchComments,
  fetchPlaylist,
  fetchChannel,
  searchContent,
  fetchTrending,
  fetchPopular,
  downloadSource,
};

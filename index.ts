import {
  Channel,
  Playlist,
  Video,
  Format,
  Instance,
  InstanceStats,
  InstanceFetchOptions,
  VideoFetchOptions,
  PlaylistFetchOptions,
  SearchOptions,
  TrendingOptions,
  PopularOptions,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  Sorting,
} from "./classes/index";
import axios from "axios";
import { IReadStream } from "memfs/lib/volume";

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
 * @param {Instance} instance - Instance to fetch stats from.
 * @example await InvidJS.fetchStats(instance);
 * @returns {Promise<InstanceStats>} Instance stats.
 */
async function fetchStats(instance: Instance): Promise<InstanceStats> {
  if (!instance)
    throw new Error("You must provide an instance to fetch videos from!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let stats!: InstanceStats;
  await axios.get(`${instance.getURL()}/api/v1/stats`).then((res) => {
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
 * @param {Instance} instance - Instance to fetch videos from.
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
    throw new Error("You must provide an instance to fetch videos from!");
  if (!id) throw new Error("You must provide a video ID to fetch it!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Video;
  let formats: Array<Format> = [];
  await axios.get(`${instance.getURL()}/api/v1/videos/${id}`).then((res) => {
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
 * @name fetchPlaylist
 * @description Fetches a playlist and converts it into an object.
 * @param {Instance} instance - Instance.
 * @param {string} id - Playlist ID.
 * @param {PlaylistFetchOptions} [opts] - Fetch options.
 * @example await InvidJS.fetchPlaylist(instance, "id");
 * @returns {Promise<Playlist>} Playlist object.
 */
async function fetchPlaylist(
  instance: Instance,
  id: string,
  opts: PlaylistFetchOptions = {
    playlist_type: FetchTypes.Basic,
    limit: 0,
  }
): Promise<Playlist> {
  if (!instance)
    throw new Error("You must provide an instance to fetch videos from!");
  if (!id) throw new Error("You must provide a video ID to fetch it!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let info!: Playlist;
  let videos: Array<Video> = [];
  await axios.get(`${instance.getURL()}/api/v1/playlists/${id}`).then((res) => {
    res.data.videos.forEach((video: any) => {
      if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
        videos.push(new Video(video.title, video.videoId));
    });
    switch (opts.playlist_type) {
      case "full": {
        let author = res.data.author ? res.data.author : "SYSTEM";
        let description = res.data.description
          ? res.data.description
          : "This playlist was created by the system.";
        info = new Playlist(
          res.data.title,
          id,
          videos,
          author,
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
 * @name searchContent
 * @description Searches content based on the query and search options.
 * @param {Instance} instance - Instance.
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
    sorting: Sorting.Relevance,
    type: ContentTypes.Video,
    region: "US",
    limit: 0,
  }
): Promise<Array<Channel | Playlist | Video>> {
  if (!instance)
    throw new Error("You must provide an instance to fetch videos from!");
  if (!query) throw new Error("You must provide a search query!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.getURL()}/api/v1/search?q=${query}`;
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
              new Channel(
                result.author,
                result.authorId,
                result.authorVerified,
                result.subCount,
                result.videoCount
              )
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
 * @param {Instance} instance - Instance.
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
    throw new Error("You must provide an instance to fetch videos from!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.getURL()}/api/v1/trending`;
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
 * @param {Instance} instance - Instance.
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
    throw new Error("You must provide an instance to fetch videos from!");
  if (instance.checkAPIAccess() === false || instance.checkAPIAccess() === null)
    throw new Error(
      "The instance you provided does not support API requests or is offline!"
    );
  let params = `${instance.getURL()}/api/v1/popular`;
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
 * @name fetchStream
 * @description Fetches a video stream and allows its playback.
 * @param {Format} source - Video to fetch stream from.
 * @returns {Promise<IReadStream>} Readable stream.
 */
async function fetchStream(
  instance: Instance,
  video: Video,
  source: Format
): Promise<IReadStream> {
  if (!source)
    throw new Error(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  let response = await axios.get(
    `${instance.getURL()}/latest_version?id=${video.id}&itag=${source.tag}`,
    {
      responseType: "stream",
    }
  );
  return response.data;
}

export {
  fetchInstances,
  fetchStats,
  fetchVideo,
  fetchPlaylist,
  searchContent,
  fetchTrending,
  fetchPopular,
  fetchStream,
};

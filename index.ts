import {
  FullVideo,
  BasicVideo,
  PlaylistVideo,
  FullPlaylist,
  BasicPlaylist,
  Instance,
  InstanceStats,
  InstanceFetchOptions,
  VideoFetchOptions,
  PlaylistFetchOptions,
  VideoFormat,
  AudioFormat,
} from "./classes/index";
import axios from "axios";
import { fs } from "memfs";

export let InvidJS = {
  //Fetches active instances.
  /**
   * @param {InstanceFetchOptions} [opts] - Search options.
   * @returns {Promise<Instance[]>} Array of instance objects.
   */
  fetchInstances: async function (
    opts: InstanceFetchOptions = {
      url: undefined,
      type: "all",
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
          (!opts.type ||
            opts.type === "all" ||
            instance[1].type === opts.type) &&
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
  },

  //Fetches stats of an instance.
  /**
   *
   * @param {Instance} instance - Instance to fetch stats from.
   * @returns {Promise<InstanceStats>} Instance stats.
   */
  fetchStats: async function (instance: Instance): Promise<InstanceStats> {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (
      instance.checkAPIAccess() === false ||
      instance.checkAPIAccess() === null
    )
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
  },

  //Fetches a video and converts it into an object.
  /**
   * @param {Instance} instance - Instance to fetch videos from.
   * @param {string} id - Video ID.
   * @param {VideoFetchOptions} [opts] - Fetch options.
   * @returns {Promise<FullVideo | BasicVideo>} Video object.
   */
  fetchVideo: async function (
    instance: Instance,
    id: string,
    opts: VideoFetchOptions = {
      type: "basic",
    }
  ): Promise<FullVideo | BasicVideo> {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (!id) throw new Error("You must provide a video ID to fetch it!");
    if (
      instance.checkAPIAccess() === false ||
      instance.checkAPIAccess() === null
    )
      throw new Error(
        "The instance you provided does not support API requests or is offline!"
      );
    let info!: FullVideo | BasicVideo;
    let formats: Array<AudioFormat | VideoFormat> = [];
    await axios.get(`${instance.getURL()}/api/v1/videos/${id}`).then((res) => {
      res.data.formatStreams
        .concat(res.data.adaptiveFormats)
        .forEach((format: any) => {
          if (!format.type.startsWith("audio")) {
            formats.push(
              new VideoFormat(
                format.url,
                format.itag,
                format.type,
                format.contaner
              )
            );
          } else {
            formats.push(
              new AudioFormat(
                format.url,
                format.itag,
                format.type,
                format.container,
                format.audioQuality,
                format.audioSampleRate,
                format.audioChannels
              )
            );
          }
        });
      switch (opts.type) {
        case "full": {
          info = new FullVideo(
            res.data.title,
            id,
            res.data.description,
            res.data.publishedText,
            res.data.viewCount,
            res.data.likeCount,
            res.data.dislikeCount,
            res.data.lengthSeconds,
            formats
          );
          break;
        }
        case "basic": 
        default: {
          info = new BasicVideo(res.data.title, id, formats);
          break;
        }
      }
    });
    return info;
  },

  //Fetches a playlist and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Playlist ID.
   * @param {PlaylistFetchOptions} [opts] - Fetch options.
   * @returns {Promise<FullPlaylist | BasicPlaylist>} Playlist object.
   */
  fetchPlaylist: async function (
    instance: Instance,
    id: string,
    opts: PlaylistFetchOptions = {
      playlist_type: "basic",
      limit: 0,
    }
  ): Promise<FullPlaylist | BasicPlaylist> {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (!id) throw new Error("You must provide a video ID to fetch it!");
    if (
      instance.checkAPIAccess() === false ||
      instance.checkAPIAccess() === null
    )
      throw new Error(
        "The instance you provided does not support API requests or is offline!"
      );
    let info!: FullPlaylist | BasicPlaylist;
    let videos: Array<PlaylistVideo> = [];
    await axios
      .get(`${instance.getURL()}/api/v1/playlists/${id}`)
      .then((res) => {
        res.data.videos.forEach((video: any) => {
          if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
            videos.push(new PlaylistVideo(video.title, video.videoId));
        });
        switch (opts.playlist_type) {
          case "full": {
            info = new FullPlaylist(
              res.data.title,
              res.data.author,
              res.data.description,
              res.data.videos.length,
              videos
            );
            break;
          }
          case "basic":
          default: {
            info = new BasicPlaylist(res.data.title, videos);
            break;
          }
        }
      });
    return info;
  },

  //Fetches a video stream and allows its playback.
  /**
   * @param {VideoFormat | AudioFormat} source - Video to fetch stream from.
   * @returns {Promise<any>} Readable stream.
   */
  fetchStream: async function (
    instance: Instance,
    video: FullVideo | BasicVideo | PlaylistVideo,
    source: VideoFormat | AudioFormat
  ): Promise<any> {
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
    let stream = response.data.pipe(
      fs.createWriteStream(`tmp.${source.container}`)
    );
    return stream;
  },
};

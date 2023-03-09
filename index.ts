import {
  FullVideo,
  BasicVideo,
  PlaylistVideo,
  FullPlaylist,
  BasicPlaylist,
  Instance,
  InstanceSearchOptions,
  VideoFormat,
  AudioFormat,
} from "./classes/index";
import axios from "axios";
import { fs } from "memfs";

export let InvidJS = {
  //Fetches all active instance links.
  /**
   * @param {InstanceSearchOptions} [opts] - Search options.
   * @returns {Promise<Instance[]>} Array of instance objects.
   */
  fetchInstances: async function (
    opts: InstanceSearchOptions = {
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

  //Fetches a video and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Video ID.
   * @returns {Promise<FullVideo>} FullVideo object.
   */
  fetchFullVideo: async function (
    instance: Instance,
    id: string
  ): Promise<FullVideo> {
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
    let info!: FullVideo;
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
    });
    return info;
  },

  //Fetches a barebones video and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Video ID.
   * @returns {Promise<BasicVideo>} BasicVideo object.
   */
  fetchBasicVideo: async function (
    instance: Instance,
    id: string
  ): Promise<BasicVideo> {
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
    let info!: BasicVideo;
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
                format.container
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
      info = new BasicVideo(res.data.title, id, formats);
    });
    return info;
  },

  //Fetches a playlist and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Playlist ID.
   * @returns {Promise<FullPlaylist>} FullPlaylist object.
   */
  fetchFullPlaylist: async function (
    instance: Instance,
    id: string
  ): Promise<FullPlaylist> {
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
    let info!: FullPlaylist;
    let videos: Array<PlaylistVideo> = [];
    await axios
      .get(`${instance.getURL()}/api/v1/playlists/${id}`)
      .then((res) => {
        res.data.videos.forEach((video: any) => {
          videos.push(new PlaylistVideo(video.title, video.videoId));
        });
        info = new FullPlaylist(
          res.data.title,
          res.data.author,
          res.data.description,
          res.data.videos.length,
          videos
        );
      });
    return info;
  },

  //Fetches a basic playlist and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Playlist ID.
   * @returns {Promise<BasicPlaylist>} BasicPlaylist object.
   */
  fetchBasicPlaylist: async function (
    instance: Instance,
    id: string
  ): Promise<BasicPlaylist> {
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
    let info!: BasicPlaylist;
    let videos: Array<PlaylistVideo> = [];
    await axios
      .get(`${instance.getURL()}/api/v1/playlists/${id}`)
      .then((res) => {
        res.data.videos.forEach((video: any) => {
          videos.push(new PlaylistVideo(video.title, video.videoId));
        });
        info = new BasicPlaylist(res.data.title, videos);
      });
    return info;
  },

  //Fetches a video stream and allows its playback.
  /**
   * @param {VideoFormat | AudioFormat} source - Video to fetch stream from.
   * @returns {Promise<any>} Readable stream.
   */
  getStream: async function (
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

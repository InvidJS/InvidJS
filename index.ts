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
import got from "got";

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
    await fetch("https://api.invidious.io/instances.json").then((res) =>
      res.json().then((json: any) => {
        //Only push instances that meet the search criteria.
        json.forEach((instance: any) => {
          //It is possible the user only provides some of the options.
          if (
            (!opts.url || opts.url === instance[1].uri) &&
            (!opts.type ||
              opts.type === "all" ||
              instance[1].type === opts.type) &&
            (!opts.region ||
              opts.region === "all" ||
              instance[1].region === opts.region) &&
            (opts.api_allowed === undefined || opts.api_allowed === "any" || instance[1].api === opts.api_allowed) &&
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
      })
    );
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
    await fetch(`${instance.getURL()}/api/v1/videos/${id}`).then((res) =>
      res.json().then((json: any) => {
        json.formatStreams
          .concat(json.adaptiveFormats)
          .forEach((format: any) => {
            if (!format.type.startsWith("audio")) {
              formats.push(
                new VideoFormat(format.url, format.itag, format.type)
              );
            } else {
              formats.push(
                new AudioFormat(
                  format.url,
                  format.itag,
                  format.type,
                  format.audioQuality,
                  format.audioSampleRate,
                  format.audioChannels
                )
              );
            }
          });
        info = new FullVideo(
          json.title,
          id,
          json.description,
          json.publishedText,
          json.viewCount,
          json.likeCount,
          json.dislikeCount,
          json.lengthSeconds,
          formats
        );
      })
    );
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
    await fetch(`${instance.getURL()}/api/v1/videos/${id}`).then((res) =>
      res.json().then((json: any) => {
        json.formatStreams
          .concat(json.adaptiveFormats)
          .forEach((format: any) => {
            if (!format.type.startsWith("audio")) {
              formats.push(
                new VideoFormat(format.url, format.itag, format.type)
              );
            } else {
              formats.push(
                new AudioFormat(
                  format.url,
                  format.itag,
                  format.type,
                  format.audioQuality,
                  format.audioSampleRate,
                  format.audioChannels
                )
              );
            }
          });
        info = new BasicVideo(json.title, id, formats);
      })
    );
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
    await fetch(`${instance.getURL()}/api/v1/playlists/${id}`).then((res) =>
      res.json().then((json: any) => {
        json.videos.forEach((video: any) => {
          videos.push(new PlaylistVideo(video.title, video.videoId));
        });
        info = new FullPlaylist(
          json.title,
          json.author,
          json.description,
          json.videos.length,
          videos
        );
      })
    );
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
    await fetch(`${instance.getURL()}/api/v1/playlists/${id}`).then((res) =>
      res.json().then((json: any) => {
        json.videos.forEach((video: any) => {
          videos.push(new PlaylistVideo(video.title, video.videoId));
        });
        info = new BasicPlaylist(json.title, videos);
      })
    );
    return info;
  },

  //Fetches all videos from a playlist and converts them into an array.
  /**
   *
   * @param {Instance} instance - Instance.
   * @param {FullPlaylist | BasicPlaylist} playlist - Playlist to fetch videos from.
   * @returns {Promise<BasicVideo[]>} Array of BasicVideo objects.
   */
  fetchVideosFromPlaylist: async function (
    instance: Instance,
    playlist: FullPlaylist | BasicPlaylist
  ): Promise<BasicVideo[]> {
    if (!playlist)
      throw new Error(
        "You must provide a valid playlist to fetch videos from!"
      );
    let videos: any = [];
    for (const video of playlist.videos) {
      videos.push(await this.fetchBasicVideo(instance, video.id));
    }
    return videos;
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
    let stream = got.stream(
      `${instance.getURL()}/latest_version?id=${video.id}&itag=${source.tag}`
    )
    return stream;
  },
};

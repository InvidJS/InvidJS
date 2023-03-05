import {
  FullVideo,
  BasicVideo,
  PlaylistVideo,
  FullPlaylist,
  BasicPlaylist,
  Instance,
  Constants,
  VideoFormat,
  AudioFormat,
} from "../classes/index.js";
import * as fs from "fs-extra";
import * as ffmpeg from "ffmpeg-static";
import fetch from "node-fetch";
import got from "got";

let InvidJS = {
  //Fetches all active instance links.
  /**
   * @param {string} [type] - Instance type. Allowed types are: "https", "i2p", "onion", "all". Default is "all".
   * @returns {Promise<string[]>} Array of instance URLs.
   */
  fetchInstanceLinks: async function (type = "all") {
    if (!Constants.allowedTypes.includes(type))
      throw new Error("Invalid type! Valid types are: https, i2p, onion, all.");
    let instances = [];
    await fetch("https://api.invidious.io/instances.json").then((res) =>
      res.json().then((json) => {
        json.forEach((element) => {
          if (type === element[1].type || type === "all")
            instances.push(element[1].uri);
        });
      })
    );
    return instances;
  },

  //Fetches a single instance and converts it into an object.
  /**
   * @param {string} uri - Instance URL.
   * @returns {Promise<Instance>} Instance object.
   */
  fetchInstance: async function (uri) {
    if (!uri) throw new Error("You must provide a valid instance!");
    let info = undefined;
    await fetch("https://api.invidious.io/instances.json").then((res) =>
      res.json().then((json) => {
        let found = json.filter((instance) => instance[1].uri === uri);
        if (!found)
          throw new Error(
            "Error fetching instance: instance does not exist or is not online!"
          );
        let instance = found[0][1];
        info = new Instance(
          instance.region,
          instance.cors,
          instance.api,
          instance.type,
          instance.uri
        );
      })
    );
    return info;
  },

  //Fetches a video and converts it into an object.
  /**
   * @param {Instance} instance - Instance.
   * @param {string} id - Video ID.
   * @returns {Promise<FullVideo>} FullVideo object.
   */
  fetchFullVideo: async function (instance, id) {
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
    let info = undefined;
    let formats = [];
    await fetch(`${instance.getURL()}/api/v1/videos/${id}`).then((res) =>
      res.json().then((json) => {
        json.formatStreams.concat(json.adaptiveFormats).forEach((format) => {
          if (!format.type.startsWith("audio")) {
            formats.push(new VideoFormat(format.url, format.itag, format.type));
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
  fetchBasicVideo: async function (instance, id) {
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
    let info = undefined;
    let formats = [];
    await fetch(`${instance.getURL()}/api/v1/videos/${id}`).then((res) =>
      res.json().then((json) => {
        json.formatStreams.concat(json.adaptiveFormats).forEach((format) => {
          if (!format.type.startsWith("audio")) {
            formats.push(new VideoFormat(format.url, format.itag, format.type));
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
        info = new BasicVideo(json.title, formats);
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
  fetchFullPlaylist: async function (instance, id) {
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
    let info = undefined;
    let videos = [];
    await fetch(`${instance.getURL()}/api/v1/playlists/${id}`).then((res) =>
      res.json().then((json) => {
        json.videos.forEach((video) => {
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
  fetchBasicPlaylist: async function (instance, id) {
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
    let info = undefined;
    let videos = [];
    await fetch(`${instance.getURL()}/api/v1/playlists/${id}`).then((res) =>
      res.json().then((json) => {
        json.videos.forEach((video) => {
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
  fetchVideosFromPlaylist: async function (instance, playlist) {
    if (!playlist)
      throw new Error(
        "You must provide a valid playlist to fetch videos from!"
      );
    let videos = [];
    for (const video of playlist.videos) {
      videos.push(await this.fetchBasicVideo(instance, video.id));
    }
    return videos;
  },

  //Fetches a video stream and allows its playback.
  /**
   * @param {VideoFormat} video - Video to fetch stream from.
   * @returns {Promise<Readable>} Readable stream.
   */
  getVideoStream: async function (video) {},

  //Fetches an audio stream and allows its playback.
  /**
   *
   * @param {AudioFormat} audio - Audio to fetch stream from.
   * @returns {Promise<Readable>} Readable stream.
   */
  getAudioStream: async function (audio) {},
};

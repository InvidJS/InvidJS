import { Video, Playlist, Instance, Constants } from "../classes/index.js";
import * as fs from "fs-extra";
import * as ffmpeg from "ffmpeg-static";
import fetch from "node-fetch";
import got from "got";

let InvidJS = {
  fetchInstanceLinks: async function (type) {
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

  getInstance: async function (uri) {
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

  fetchVideo: async function (instance, id) {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (!id) throw new Error("You must provide a video ID to fetch it!");
    if ((await this.getInstance(instance)).api_active === false)
      throw new Error(
        "The instance you provided does not support API requests or is offline!"
      );
    let info = undefined;
    await fetch(`${instance}/api/v1/videos/${id}`).then((res) =>
      res.json().then((json) => {
        info = new Video(
          json.title,
          json.description,
          json.publishedText,
          json.viewCount,
          json.likeCount,
          json.dislikeCount,
          json.lengthSeconds,
          json.formatStreams,
          json.adaptiveFormats
        );
      })
    );
    return info;
  },

  fetchPlaylist: async function (instance, id) {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (!id) throw new Error("You must provide a video ID to fetch it!");
    if ((await this.getInstance(instance)).api_active === false)
      throw new Error(
        "The instance you provided does not support API requests or is offline!"
      );
    let info = undefined;
    let videos = [];
    await fetch(`${instance}/api/v1/playlists/${id}`).then((res) =>
      res.json().then((json) => {
        info = new Playlist(
          json.title,
          json.author,
          json.description,
          json.videos.length,
          json.videos
        );
      })
    );
    return info;
  },

  getVideoStream: async function (instance, id) {
    if (!instance)
      throw new Error("You must provide an instance to fetch videos from!");
    if (!id) throw new Error("You must provide a video ID to fetch it!");
    if ((await this.getInstance(instance)).api_active === false)
      throw new Error(
        "The instance you provided does not support API requests or is offline!"
      );
    let streamtag = undefined;
    let stream = undefined;
    let video = await this.fetchVideo(instance, id);
    let streams = video.adaptiveFormats;
    streamtag = streams[0].itag;
    stream = got.stream(`${instance}/latest_version?id=${id}&itag=${streamtag}`);
    return stream;
  },
};

console.log(
  await InvidJS.fetchInstanceLinks("all")
);

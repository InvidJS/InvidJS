import got, { HTTPError, RequestError } from "got";
import { QueryParams } from "../../utils/Query.js";
import { ChannelPlaylistsSorting, ChannelVideosSorting } from "../enums.js";
import { APIError } from "../errors/APIError.js";
import { APIDownError } from "../errors/APIDownError.js";
import { InvalidArgumentError } from "../errors/InvalidArgumentError.js";
import { MissingArgumentError } from "../errors/MissingArgumentError.js";
import { UnknownError } from "../errors/UnknownError.js";
import {
  CommonOptions,
  ChannelPlaylistsOptions,
  ChannelVideosOptions,
} from "../interfaces.js";
import { Instance } from "./Instance.js";
import { Playlist } from "./Playlist.js";
import { Video } from "./Video.js";
import { ServerError } from "../errors/ServerError.js";

const useragent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";

/**
 * @name Channel
 * @description Channel object. Can be Minimal, Basic or Full.
 * @param {string} name - Channel name.
 * @param {string} id - Channel ID.
 * @param {number} [subs] - Number of subscribers (basic or full only).
 * @param {string} [description] - Channel description (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {boolean} [isVerified] - Is channel verified? (full only)
 * @param {Array<Video>} [latest_videos] - Latest videos (full only).
 */
export class Channel {
  public name: string;
  public id: string;
  public subs?: number;
  public description?: string;
  public views?: number;
  public isVerified?: boolean;
  public latest_videos?: Array<Video>;
  constructor(
    name: string,
    id: string,
    subs?: number,
    description?: string,
    views?: number,
    isVerified?: boolean,
    latest_videos?: Array<Video>,
  ) {
    this.name = name;
    this.id = id;
    this.subs = subs;
    this.description = description;
    this.views = views;
    this.isVerified = isVerified;
    this.latest_videos = latest_videos;
  }

  /**
   * @name fetchRelatedChannels
   * @deprecated This feature is broken on YouTube's side.
   * @description Fetches related channels.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {CommonOptions} [opts] - Related fetch options.
   * @example await channel.fetchRelatedChannels(instance);
   * @example await channel.fetchRelatedChannels(instance, {limit: 5});
   * @returns {Promise<Array<Channel>>} Array of related channels.
   */
  public fetchRelatedChannels = async (
    instance: Instance,
    opts: CommonOptions = {
      limit: 0,
    },
  ): Promise<Array<Channel>> => {
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
    const channels: Array<Channel> = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/channels`;
    const res = await got.get(queryURL);
    const json = await JSON.parse(res.body);
    try {
      json.relatedChannels.forEach((channel: any) => {
        if (!opts.limit || opts.limit === 0 || channels.length < opts.limit)
          channels.push(new Channel(channel.author, channel.authorId));
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      }
      if (err instanceof RequestError) {
        throw new UnknownError(err.message);
      }
    }
    return channels;
  };

  /**
   * @name fetchChannelPlaylists
   * @description Fetches latest channel playlists.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {ChannelPlaylistsOptions} [opts] -  Playlist fetch options.
   * @example await channel.fetchChannelPlaylists(instance);
   * @example await channel.fetchChannelPlaylists(instance, {limit: 3});
   * @returns {Promise<Array<Playlist>>} Array of channel playlists.
   */
  public fetchChannelPlaylists = async (
    instance: Instance,
    opts: ChannelPlaylistsOptions = {
      limit: 0,
      sorting: ChannelPlaylistsSorting.Newest,
    },
  ): Promise<Array<Playlist>> => {
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
    const playlists: Array<Playlist> = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/playlists`;
    const params = new QueryParams();
    if (opts.sorting) params.sort_by = opts.sorting;
    const searchParams = params.createQuery();
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    try {
      json.playlists.forEach((playlist: any) => {
        if (!opts.limit || opts.limit === 0 || playlists.length < opts.limit)
          playlists.push(new Playlist(playlist.title, playlist.playlistId));
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      }
      if (err instanceof RequestError) {
        throw new UnknownError(err.message);
      }
    }
    return playlists;
  };

  /**
   * @name fetchChannelVideos
   * @description Fetches latest channel videos.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {ChannelVideosOptions} [opts] - Video fetch options.
   * @example await channel.fetchChannelVideos(instance);
   * @example await channel.fetchChannelVideos(instance, {limit: 7});
   * @returns {Promise<Array<Video>>} Array of channel videos.
   */
  public fetchChannelVideos = async (
    instance: Instance,
    opts: ChannelVideosOptions = {
      limit: 0,
      sorting: ChannelVideosSorting.Newest,
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
    const videos: Array<Video> = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/videos`;
    const params = new QueryParams();
    if (opts.sorting) params.sort_by = opts.sorting;
    const searchParams = params.createQuery();
    const res = await got.get(queryURL, {
      searchParams: searchParams,
      headers: { "User-Agent": useragent },
    });
    const json = await JSON.parse(res.body);
    try {
      json.videos.forEach((video: any) => {
        if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
          videos.push(new Video(video.title, video.videoId));
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      }
      if (err instanceof RequestError) {
        throw new UnknownError(err.message);
      }
    }
    return videos;
  };
}

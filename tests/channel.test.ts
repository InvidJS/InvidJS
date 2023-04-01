import { Channel, Playlist, Video, FetchTypes } from "../classes";
import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Channel fetch test", () => {
  test("Channel must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A")
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch minimal channel.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Minimal,
        })
      ).id
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch basic channel.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Basic,
        })
      ).subs
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch full channel.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Full,
        })
      ).isVerified
    ).not.toBeUndefined();
  }, 50000);
});

describe("Channel endpoint test", () => {
  test("Must fetch related channels correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const channels = await InvidJS.fetchRelatedChannels(instances[0], channel);
    expect(channels).not.toHaveLength(0);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 50000);

  test("Must respect limit on related channels.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const channels = await InvidJS.fetchRelatedChannels(instances[0], channel, {
      limit: 3,
    });
    expect(channels).toHaveLength(3);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 50000);

  test("Must fetch playlists correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const playlists = await InvidJS.fetchChannelPlaylists(
      instances[0],
      channel
    );
    expect(playlists).not.toHaveLength(0);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 50000);

  test("Must respect limit on playlists.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const playlists = await InvidJS.fetchChannelPlaylists(
      instances[0],
      channel,
      {
        limit: 5,
      }
    );
    expect(playlists).toHaveLength(5);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 50000);

  test("Must fetch videos correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const videos = await InvidJS.fetchChannelVideos(instances[0], channel);
    expect(videos).not.toHaveLength(0);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 50000);

  test("Must respect limit on videos.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    const videos = await InvidJS.fetchChannelVideos(instances[0], channel, {
      limit: 7,
    });
    expect(videos).toHaveLength(7);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 50000);
});

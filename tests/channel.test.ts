import { Channel, Playlist, Video, FetchTypes } from "../classes";
import * as InvidJS from "../index";

describe("Channel fetch test", () => {
  test("Channel must be fetched correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A")
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch minimal channel.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Minimal,
        })
      ).id
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch basic channel.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Basic,
        })
      ).subs
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch full channel.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {
          type: FetchTypes.Full,
        })
      ).isVerified
    ).not.toBeUndefined();
  }, 30000);

  test("Must throw an error if API is blocked.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    try {
      await InvidJS.fetchChannel(instances[0], "UCzm1WKIw8XK4x7HNkHhOM_A");
    } catch (error: any) {
      expect(error.message).toBe(
        "The instance you provided does not support API requests or is offline!"
      );
    }
  }, 30000);
});

describe("Channel endpoint test", () => {
  test("Must fetch related channels correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let channels = await InvidJS.fetchRelatedChannels(instances[0], channel);
    expect(channels).not.toHaveLength(0);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 30000);

  test("Must respect limit on related channels.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let channels = await InvidJS.fetchRelatedChannels(instances[0], channel, {
      limit: 3,
    });
    expect(channels).toHaveLength(3);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 30000);

  test("Must fetch playlists correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let playlists = await InvidJS.fetchChannelPlaylists(instances[0], channel);
    expect(playlists).not.toHaveLength(0);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 30000);

  test("Must respect limit on playlists.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let playlists = await InvidJS.fetchChannelPlaylists(instances[0], channel, {
      limit: 5,
    });
    expect(playlists).toHaveLength(5);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 30000);

  test("Must fetch videos correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let videos = await InvidJS.fetchChannelVideos(instances[0], channel);
    expect(videos).not.toHaveLength(0);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 30000);

  test("Must respect limit on videos.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    let videos = await InvidJS.fetchChannelVideos(instances[0], channel, {
      limit: 7,
    });
    expect(videos).toHaveLength(7);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 30000);

  test("Must throw an error if API is blocked.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    let channel = await InvidJS.fetchChannel(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    try {
      await InvidJS.fetchRelatedChannels(instances[0], channel);
    } catch (error: any) {
      expect(error.message).toBe(
        "The instance you provided does not support API requests or is offline!"
      );
    }
  }, 30000);
});

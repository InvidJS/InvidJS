import { Channel, Playlist, Video } from "../classes";
import * as InvidJS from "../index";

describe("Channel endpoint test", () => {
  test("Must fetch related channels correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channels = await InvidJS.fetchRelatedChannels(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    expect(channels).not.toHaveLength(0);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 30000);

  test("Must respect limit on related channels.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let channels = await InvidJS.fetchRelatedChannels(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw",
      {
        limit: 3,
      }
    );
    expect(channels).toHaveLength(3);
    expect(channels[0]).toBeInstanceOf(Channel);
  }, 30000);

  test("Must fetch playlists correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let playlists = await InvidJS.fetchChannelPlaylists(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    expect(playlists).not.toHaveLength(0);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 30000);

  test("Must respect limit on playlists.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let playlists = await InvidJS.fetchChannelPlaylists(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw",
      {
        limit: 5,
      }
    );
    expect(playlists).toHaveLength(5);
    expect(playlists[0]).toBeInstanceOf(Playlist);
  }, 30000);

  test("Must fetch videos correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let videos = await InvidJS.fetchChannelVideos(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw"
    );
    expect(videos).not.toHaveLength(0);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 30000);

  test("Must respect limit on videos.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let videos = await InvidJS.fetchChannelVideos(
      instances[0],
      "UCRjXNz9JNSuE8n-Oej4Rflw",
      {
        limit: 7,
      }
    );
    expect(videos).toHaveLength(7);
    expect(videos[0]).toBeInstanceOf(Video);
  }, 30000);

  test("Must throw an error if API is blocked.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    try {
      await InvidJS.fetchRelatedChannels(
        instances[0],
        "UCRjXNz9JNSuE8n-Oej4Rflw"
      );
    } catch (error: any) {
      expect(error.message).toBe(
        "The instance you provided does not support API requests or is offline!"
      );
    }
  }, 30000);
});

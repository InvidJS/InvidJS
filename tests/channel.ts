import { Playlist } from "../api/classes/Playlist.js";
import { Video } from "../api/classes/Video.js";
import { MissingArgumentError } from "../api/errors/MissingArgumentError.js";
import { NotFoundError } from "../api/errors/NotFoundError.js";
import * as InvidJS from "../index.js";

import { test } from "uvu";
import * as assert from "uvu/assert";

const instances = await InvidJS.fetchInstances({
  api_allowed: true,
  health: 100,
});
const instance = instances[Math.floor(Math.random() * instances.length)];
console.log("Testing on instance: " + instance.url);

test("Channel must be fetched correctly", async () => {
  assert.is.not(
    await InvidJS.fetchChannel(instance, "UCsLiV4WJfkTEHH0b9PmRklw"),
    undefined,
  );
});

test("Must be able to fetch minimal channel", async () => {
  assert.is.not(
    (
      await InvidJS.fetchChannel(instance, "UCsLiV4WJfkTEHH0b9PmRklw", {
        type: InvidJS.FetchTypes.Minimal,
      })
    ).id,
    undefined,
  );
});

test("Must be able to fetch basic channel", async () => {
  assert.is.not(
    (
      await InvidJS.fetchChannel(instance, "UCsLiV4WJfkTEHH0b9PmRklw", {
        type: InvidJS.FetchTypes.Basic,
      })
    ).subs,
    undefined,
  );
});

test("Must be able to fetch full channel", async () => {
  assert.is.not(
    (
      await InvidJS.fetchChannel(instance, "UCsLiV4WJfkTEHH0b9PmRklw", {
        type: InvidJS.FetchTypes.Full,
      })
    ).isVerified,
    undefined,
  );
});

test("Must fetch playlists correctly", async () => {
  const channel = await InvidJS.fetchChannel(
    instance,
    "UCRjXNz9JNSuE8n-Oej4Rflw",
  );
  const playlists = await channel.fetchChannelPlaylists(instance);
  assert.is.not(playlists.length, 0);
  assert.instance(playlists[0], Playlist);
});

test("Must respect limit on playlists", async () => {
  const channel = await InvidJS.fetchChannel(
    instance,
    "UCRjXNz9JNSuE8n-Oej4Rflw",
  );
  const playlists = await channel.fetchChannelPlaylists(instance, {
    limit: 5,
  });
  assert.is(playlists.length, 5);
  assert.instance(playlists[0], Playlist);
});

test("Must fetch videos correctly", async () => {
  const channel = await InvidJS.fetchChannel(
    instance,
    "UCRjXNz9JNSuE8n-Oej4Rflw",
  );
  const videos = await channel.fetchChannelVideos(instance);
  assert.is.not(videos.length, 0);
  assert.instance(videos[0], Video);
});

test("Must respect limit on videos", async () => {
  const channel = await InvidJS.fetchChannel(
    instance,
    "UCRjXNz9JNSuE8n-Oej4Rflw",
  );
  const videos = await channel.fetchChannelVideos(instance, {
    limit: 7,
  });
  assert.is(videos.length, 7);
  assert.instance(videos[0], Video);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchChannel();
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if ID is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchChannel(instance);
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if invalid ID is provided", async () => {
  try {
    await InvidJS.fetchChannel(instance, "UCzm1WKIw8XK4x7HNkHhOM_");
  } catch (err) {
    assert.instance(err, NotFoundError);
  }
});

test.run();

import { Channel } from "../api/classes/Channel.js";
import { Playlist } from "../api/classes/Playlist.js";
import { InvalidArgumentError } from "../api/errors/InvalidArgumentError.js";
import { MissingArgumentError } from "../api/errors/MissingArgumentError.js";
import * as InvidJS from "../index.js";

import { test } from "uvu";
import * as assert from "uvu/assert";

const instances = await InvidJS.fetchInstances({
  api_allowed: true,
  health: 100,
});
const instance = instances[Math.floor(Math.random() * instances.length)];
console.log("Testing on instance: " + instance.url);

test("Content must be fetched correctly", async () => {
  const videos = await InvidJS.searchContent(instance, "typescript");
  assert.is.not(videos.length, 0);
});

test("Content type must be respected", async () => {
  const result = await InvidJS.searchContent(instance, "typescript", {
    type: InvidJS.ContentTypes.Playlist,
  });
  assert.instance(result[0], Playlist);
  assert.instance(result[1], Playlist);
  assert.instance(result[2], Playlist);
});

test("Limit must be respected", async () => {
  const videos = await InvidJS.searchContent(instance, "typescript", {
    limit: 5,
  });
  assert.is(videos.length, 5);
});

test("Multiple filters must apply correctly", async () => {
  const result = await InvidJS.searchContent(instance, "typescript", {
    limit: 18,
    type: InvidJS.ContentTypes.Channel,
  });
  assert.instance(result[0], Channel);
  assert.instance(result[1], Channel);
  assert.instance(result[2], Channel);
  assert.is(result.length, 18);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.searchContent();
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if query is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.searchContent(instance);
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if limit is invalid", async () => {
  try {
    await InvidJS.searchContent(instance, "typescript", { limit: -1 });
  } catch (err) {
    assert.instance(err, InvalidArgumentError);
  }
});

test.run();

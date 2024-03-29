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

test("Video must be fetched correctly", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
  assert.is.not(video, undefined);
});

test("Must be able to fetch minimal video", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw", {
    type: InvidJS.FetchTypes.Minimal,
  });
  assert.is.not(video.id, undefined);
});

test("Must be able to fetch basic video", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw", {
    type: InvidJS.FetchTypes.Basic,
  });
  assert.is.not(video.formats, undefined);
});

test("Must be able to fetch full video", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw", {
    type: InvidJS.FetchTypes.Full,
  });
  assert.is.not(video.thumbnails, undefined);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchVideo();
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if ID is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchVideo(instance);
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if invalid ID is provided", async () => {
  try {
    await InvidJS.fetchVideo(instance, "jNQXAC9IVR");
  } catch (err: any) {
    assert.instance(err, NotFoundError);
  }
});

test.run();

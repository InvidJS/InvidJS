import { ContentBlockedError } from "../api/errors/ContentBlockedError.js";
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

test("Source must be saved as a blob correctly", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
  if (video.formats) {
    const source = video.formats[4];
    const result = await InvidJS.saveBlob(instance, video, source, {
      parts: 5,
    });
    assert.is.not(result.size, 0);
  }
});

test("Source must be saved as a stream correctly", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
  if (video.formats) {
    const source = video.formats[4];
    const result = await InvidJS.saveStream(instance, video, source);
    assert.is.not(result, undefined);
  }
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.saveStream();
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if video is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.saveStream(instance);
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if source is not provided", async () => {
  try {
    const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
    // @ts-expect-error
    await InvidJS.saveStream(instance, video);
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail on forbidden videos", async () => {
  try {
    const video = await InvidJS.fetchVideo(instance, "v4T6k-hkUzU");
    await InvidJS.saveBlob(
      instance,
      video,
      // @ts-expect-error
      video.formats[4],
    );
  } catch (err: any) {
    assert.instance(err, ContentBlockedError);
  }
});

test.run();

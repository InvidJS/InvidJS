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

test("Comments must be fetched correctly", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
  const comments = await InvidJS.fetchComments(instance, video);
  assert.is.not(comments.length, 0);
});

test("Limit must be respected", async () => {
  const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
  const comments = await InvidJS.fetchComments(instance, video, { limit: 5 });
  assert.is(comments.length, 5);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchComments();
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if video is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchComments(instance);
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if limit is invalid", async () => {
  try {
    const video = await InvidJS.fetchVideo(instance, "jNQXAC9IVRw");
    await InvidJS.fetchComments(instance, video, { limit: -1 });
  } catch (err: any) {
    assert.instance(err, InvalidArgumentError);
  }
});

test.run();

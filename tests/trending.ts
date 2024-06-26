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

test("Trending content must be fetched correctly", async () => {
  const videos = await InvidJS.fetchTrending(instance);
  assert.is.not(videos.length, 0);
});

test("Limit must be respected", async () => {
  const videos = await InvidJS.fetchTrending(instance, { limit: 3 });
  assert.is(videos.length, 3);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchTrending();
  } catch (err: any) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if limit is invalid", async () => {
  try {
    await InvidJS.fetchTrending(instance, { limit: -1 });
  } catch (err: any) {
    assert.instance(err, InvalidArgumentError);
  }
});

test.run();

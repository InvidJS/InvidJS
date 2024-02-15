import { InvalidArgumentError } from "../api/errors/InvalidArgumentError.js";
import { MissingArgumentError } from "../api/errors/MissingArgumentError.js";
import * as InvidJS from "../index.js";

import { test } from "uvu";
import * as assert from "uvu/assert";

const instances = await InvidJS.fetchInstances({
  api_allowed: true,
  health: 99,
});
const instance = instances[Math.floor(Math.random() * instances.length)];
console.log("Testing on instance: " + instance.url);

test("Popular content must be fetched correctly", async () => {
  const videos = await InvidJS.fetchPopular(instance);
  assert.is.not(videos.length, 0);
});

test("Limit must be respected", async () => {
  const videos = await InvidJS.fetchPopular(instance, { limit: 3 });
  assert.is(videos.length, 3);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchPopular();
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if limit is invalid", async () => {
  try {
    await InvidJS.fetchPopular(instance, { limit: -1 });
  } catch (err) {
    assert.instance(err, InvalidArgumentError);
  }
});

test.run();

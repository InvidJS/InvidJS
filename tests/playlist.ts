import { InvalidArgumentError } from "../api/errors/InvalidArgumentError.js";
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

test("Playlist must be fetched correctly", async () => {
  const playlist = await InvidJS.fetchPlaylist(
    instance,
    "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
  );
  assert.is.not(playlist, undefined);
});

test("Limit must be respected", async () => {
  const playlist = await InvidJS.fetchPlaylist(
    instance,
    "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
    { limit: 5 },
  );
  assert.is(playlist.videos?.length, 5);
});

test("Must be able to fetch minimal playlist", async () => {
  const playlist = await InvidJS.fetchPlaylist(
    instance,
    "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
    { type: InvidJS.FetchTypes.Minimal },
  );
  assert.is.not(playlist.id, undefined);
});

test("Must be able to fetch basic playlist", async () => {
  const playlist = await InvidJS.fetchPlaylist(
    instance,
    "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
    { type: InvidJS.FetchTypes.Basic },
  );
  assert.is.not(playlist.videos, undefined);
});

test("Must be able to fetch full playlist", async () => {
  const playlist = await InvidJS.fetchPlaylist(
    instance,
    "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
    { type: InvidJS.FetchTypes.Full },
  );
  assert.is.not(playlist.description, undefined);
});

test("Must be able to fetch a mix and fill it with data", async () => {
  const mix = await InvidJS.fetchPlaylist(instance, "RDMM", {
    type: InvidJS.FetchTypes.Full,
  });
  assert.is.not(mix.description, undefined);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchPlaylist();
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if ID is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchPlaylist(instance);
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if invalid ID is provided", async () => {
  try {
    await InvidJS.fetchPlaylist(instance, "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1");
  } catch (err) {
    assert.instance(err, NotFoundError);
  }
});

test("Must fail if limit is invalid", async () => {
  try {
    await InvidJS.fetchPlaylist(
      instance,
      "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
      { limit: -1 },
    );
  } catch (err) {
    assert.instance(err, InvalidArgumentError);
  }
});

test.run();

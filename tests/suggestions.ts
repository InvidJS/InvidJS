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

test("Suggestions must be fetched correctly", async () => {
  const suggestions = await InvidJS.fetchSearchSuggestions(
    instance,
    "typescript",
  );
  assert.is.not(suggestions.length, 0);
});

test("Must fail if instance is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchSearchSuggestions();
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test("Must fail if query is not provided", async () => {
  try {
    // @ts-expect-error
    await InvidJS.fetchSearchSuggestions(instance);
  } catch (err) {
    assert.instance(err, MissingArgumentError);
  }
});

test.run();

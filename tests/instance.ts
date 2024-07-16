import { APIDownError } from "../api/errors/APIDownError.js";
import { InvalidArgumentError } from "../api/errors/InvalidArgumentError.js";
import * as InvidJS from "../index.js";

import { test } from "uvu";
import * as assert from "uvu/assert";

test("Instances should fetch correctly", async () => {
  const instances = await InvidJS.fetchInstances();
  assert.is.not(instances.length, 0);
});

test("Only a single instance should be fetched if a URL is given", async () => {
  const instances = await InvidJS.fetchInstances({
    url: "https://yewtu.be",
  });
  assert.is(instances.length, 1);
  assert.is(instances[0].url, "https://yewtu.be");
});

test("Instances type should be respected", async () => {
  const instances = await InvidJS.fetchInstances({
    type: InvidJS.InstanceTypes.i2p,
  });
  assert.is(instances[0].type, InvidJS.InstanceTypes.i2p);
});

test("Instances region should be respected", async () => {
  const instances = await InvidJS.fetchInstances({ region: "US" });
  assert.is(instances[0].region, "US");
});

test("Instance API status should be respected", async () => {
  const instances = await InvidJS.fetchInstances({ api_allowed: false });
  assert.is(instances[0].api_allowed, false);
});

test("Instances limit should be respected", async () => {
  const instances = await InvidJS.fetchInstances({ limit: 5 });
  assert.is(instances.length, 5);
});

test("Multiple filters must apply correctly", async () => {
  const instances = await InvidJS.fetchInstances({
    api_allowed: true,
    limit: 3,
    type: InvidJS.InstanceTypes.https,
  });
  assert.is(instances[0].type, InvidJS.InstanceTypes.https);
  assert.is(instances[0].api_allowed, true);
  assert.is(instances.length, 3);
});

test("Sorting by API access must be respected", async () => {
  const instances = await InvidJS.fetchInstances({
    sorting: InvidJS.InstanceSorting.API,
  });
  assert.is(instances[0].api_allowed, true);
  assert.is.not(instances[instances.length - 1].api_allowed, true);
});

test("Sorting by type must be respected", async () => {
  const instances = await InvidJS.fetchInstances({
    sorting: InvidJS.InstanceSorting.Type,
  });
  assert.is(instances[0].type, InvidJS.InstanceTypes.https);
  assert.is(instances[instances.length - 1].type, InvidJS.InstanceTypes.i2p);
});

test("Must throw an error if limit is invalid", async () => {
  try {
    await InvidJS.fetchInstances({ limit: -1 });
  } catch (err: any) {
    assert.instance(err, InvalidArgumentError);
  }
});

test("Must throw an error if health is invalid", async () => {
  try {
    await InvidJS.fetchInstances({ health: -1 });
  } catch (err: any) {
    assert.instance(err, InvalidArgumentError);
  }
});

test("Instance stats must be fetched correctly", async () => {
  const instances = await InvidJS.fetchInstances({
    api_allowed: true,
    health: 100,
  });
  assert.is.not(await instances[0].fetchStats(), undefined);
});

test("Custom instance test", async () => {
  const instance = await InvidJS.getInstance("https://y.hc.ws");
  assert.is(instance.url, "https://y.hc.ws");
});

test.run();

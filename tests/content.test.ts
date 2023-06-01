import * as InvidJS from "../index";
import { Channel } from "../api/classes";

jest.retryTimes(5);
describe("Search test", () => {
  test("Suggestions must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.fetchSearchSuggestions(instances[0], "typescript")
    ).not.toHaveLength(0);
  }, 60000);

  test("Content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.searchContent(instances[0], "typescript")
    ).not.toHaveLength(0);
  }, 60000);

  test("Content type must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const result = await InvidJS.searchContent(instances[0], "typescript", {
      type: InvidJS.ContentTypes.Channel,
    });
    expect(result[0]).toBeInstanceOf(Channel);
    expect(result[1]).toBeInstanceOf(Channel);
    expect(result[2]).toBeInstanceOf(Channel);
  }, 60000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.searchContent(instances[0], "typescript", { limit: 5 })
    ).toHaveLength(5);
  }, 60000);

  test("Multiple filters must apply correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const result = await InvidJS.searchContent(instances[0], "typescript", {
      type: InvidJS.ContentTypes.Channel,
      limit: 18,
    });
    expect(result[0]).toBeInstanceOf(Channel);
    expect(result[1]).toBeInstanceOf(Channel);
    expect(result[2]).toBeInstanceOf(Channel);
    expect(result).toHaveLength(18);
  }, 60000);
});

describe("Popular fetch test", () => {
  test("Popular content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(await InvidJS.fetchPopular(instances[0])).not.toHaveLength(0);
  }, 60000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(await InvidJS.fetchPopular(instances[0], { limit: 3 })).toHaveLength(
      3
    );
  }, 60000);
});

describe("Trending fetch test", () => {
  test("Trending content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(await InvidJS.fetchTrending(instances[0])).not.toHaveLength(0);
  }, 60000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.fetchTrending(instances[0], { limit: 3 })
    ).toHaveLength(3);
  }, 60000);
});

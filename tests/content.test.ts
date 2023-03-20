import { ContentTypes, Channel } from "../classes";
import * as InvidJS from "../index";

describe("Search test", () => {
  test("Content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      await InvidJS.searchContent(instances[0], "typescript")
    ).not.toHaveLength(0);
  }, 30000);

  test("Content type must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    const result = await InvidJS.searchContent(instances[0], "typescript", {
      type: ContentTypes.Channel,
    });
    expect(result[0]).toBeInstanceOf(Channel);
    expect(result[1]).toBeInstanceOf(Channel);
    expect(result[2]).toBeInstanceOf(Channel);
  }, 30000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      await InvidJS.searchContent(instances[0], "typescript", { limit: 5 })
    ).toHaveLength(5);
  }, 30000);

  test("Multiple filters must apply correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    const result = await InvidJS.searchContent(instances[0], "typescript", {
      type: ContentTypes.Channel,
      limit: 18,
    });
    expect(result[0]).toBeInstanceOf(Channel);
    expect(result[1]).toBeInstanceOf(Channel);
    expect(result[2]).toBeInstanceOf(Channel);
    expect(result).toHaveLength(18);
  }, 30000);
});

describe("Popular fetch test", () => {
  test("Popular content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(await InvidJS.fetchPopular(instances[0])).not.toHaveLength(0);
  }, 30000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(await InvidJS.fetchPopular(instances[0], { limit: 3 })).toHaveLength(
      3
    );
  }, 30000);
});

describe("Trending fetch test", () => {
  test("Trending content must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(await InvidJS.fetchTrending(instances[0])).not.toHaveLength(0);
  }, 30000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      await InvidJS.fetchTrending(instances[0], { limit: 3 })
    ).toHaveLength(3);
  }, 30000);
});

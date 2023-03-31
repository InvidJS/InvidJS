import { FetchTypes } from "../classes";
import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Video fetch test", () => {
  test("Video must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ")
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch minimal video.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {
          type: FetchTypes.Minimal,
        })
      ).id
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch basic video.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {
          type: FetchTypes.Basic,
        })
      ).formats
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch full video.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {
          type: FetchTypes.Full,
        })
      ).description
    ).not.toBeUndefined();
  }, 50000);
});

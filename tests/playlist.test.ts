import { FetchTypes } from "../classes";
import * as InvidJS from "../index";

describe("Playlist fetch test", () => {
  test("Playlist must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      await InvidJS.fetchPlaylist(
        instances[0],
        "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN"
      )
    ).not.toBeUndefined();
  }, 30000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
          { limit: 5 }
        )
      ).videos
    ).toHaveLength(5);
  }, 30000);

  test("Must be able to fetch minimal playlist.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: FetchTypes.Minimal }
        )
      ).id
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch basic playlist.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: FetchTypes.Basic }
        )
      ).videos
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch full playlist.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: FetchTypes.Full }
        )
      ).description
    ).not.toBeUndefined();
  }, 30000);

  test("Must be able to fetch a mix and fill it with data.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(
      (
        await InvidJS.fetchPlaylist(instances[0], "RDMM", {
          type: FetchTypes.Full,
        })
      ).description
    ).not.toBeUndefined();
  }, 30000);
});

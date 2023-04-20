import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Playlist fetch test", () => {
  test("Playlist must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      await InvidJS.fetchPlaylist(
        instances[0],
        "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN"
      )
    ).not.toBeUndefined();
  }, 50000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p",
          { limit: 5 }
        )
      ).videos
    ).toHaveLength(5);
  }, 50000);

  test("Must be able to fetch minimal playlist.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: InvidJS.FetchTypes.Minimal }
        )
      ).id
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch basic playlist.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: InvidJS.FetchTypes.Basic }
        )
      ).videos
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch full playlist.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchPlaylist(
          instances[0],
          "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN",
          { type: InvidJS.FetchTypes.Full }
        )
      ).description
    ).not.toBeUndefined();
  }, 50000);

  test("Must be able to fetch a mix and fill it with data.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(
      (
        await InvidJS.fetchPlaylist(instances[0], "RDMM", {
          type: InvidJS.FetchTypes.Full,
        })
      ).description
    ).not.toBeUndefined();
  }, 50000);
});

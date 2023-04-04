import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Comments fetch test", () => {
  test("Comments must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const video = await InvidJS.fetchVideo(instances[0], "jNQXAC9IVRw");
    expect(await InvidJS.fetchComments(instances[0], video)).not.toHaveLength(
      0
    );
  }, 50000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const video = await InvidJS.fetchVideo(instances[0], "jNQXAC9IVRw");
    expect(
      await InvidJS.fetchComments(instances[0], video, { limit: 5 })
    ).toHaveLength(5);
  }, 50000);
});

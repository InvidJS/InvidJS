import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Source validation test", () => {
  test("Source must be validated correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const video = await InvidJS.fetchVideo(instances[0], "jNQXAC9IVRw");
    if (video.formats) {
      let source = video.formats[4];
      let result = await InvidJS.validateSource(instances[0], video, source);
      expect(result).toBe(true);
    }
  }, 500000);
});

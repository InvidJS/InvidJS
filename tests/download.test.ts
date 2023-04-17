import * as InvidJS from "../index";
import fs from "fs-extra";
import { SaveSourceTo } from "../classes";

jest.retryTimes(5);
describe("Source fetch test", () => {
  test("Source must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    const video = await InvidJS.fetchVideo(instances[0], "jNQXAC9IVRw");
    if (video.formats) {
      let source = video.formats[4];
      await InvidJS.fetchSource(instances[0], video, source, {
        parts: 10,
      });
      let exists = await fs.exists(`${video.id}.${source.container}`);
      expect(exists).toBe(true);
      fs.unlink(`${video.id}.${source.container}`);
    }
  }, 500000);
});

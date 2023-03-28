import * as InvidJS from "../index";
import fs from "fs-extra";
import { SaveSourceTo } from "../classes";

describe("Source fetch test", () => {
  test("Source must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      url: "https://invidious.snopyta.org",
    });
    const video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    if (video.formats) {
      let source = video.formats[4];
      await InvidJS.fetchSource(instances[0], video, source, {
        saveTo: SaveSourceTo.File,
        parts: 5,
      });
      let exists = await fs.exists(`${video.id}.${source.container}`);
      expect(exists).toBe(true);
      fs.unlink(`${video.id}.${source.container}`);
    }
  }, 500000);

  test("Memory source must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      url: "https://invidious.snopyta.org",
    });
    const video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    if (video.formats) {
      let source = video.formats[4];
      let buffer = await InvidJS.fetchSource(instances[0], video, source, {
        saveTo: SaveSourceTo.Memory,
        parts: 5,
      });
      expect(buffer).not.toBeUndefined();
    }
  }, 500000);
});

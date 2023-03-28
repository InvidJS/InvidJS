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
        await InvidJS.fetchSource(instances[0], video, source, {saveTo: SaveSourceTo.File, parts: 5});
        let exists = await fs.exists(`${video.id}.${source.container}`);
        expect(exists).toBe(true);
    }
  }, 500000);
});

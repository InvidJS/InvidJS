import * as InvidJS from "../index";

describe("Comments fetch test", () => {
  test("Comments must be fetched correctly.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    expect(await InvidJS.fetchComments(instances[0], video)).not.toHaveLength(
      0
    );
  }, 30000);

  test("Limit must be respected.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    let video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    expect(
      await InvidJS.fetchComments(instances[0], video, { limit: 5 })
    ).toHaveLength(5);
  }, 30000);

  test("Must throw an error if API is blocked.", async () => {
    let instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    let video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    try {
      await InvidJS.fetchComments(instances[0], video);
    } catch (error: any) {
      expect(error.message).toBe(
        "The instance you provided does not support API requests or is offline!"
      );
    }
  }, 30000);
});

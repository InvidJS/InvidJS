import * as InvidJS from "../index";

describe("Comments fetch test", () => {
  test("Comments must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://invidious.snopyta.org" });
    const video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    expect(await InvidJS.fetchComments(instances[0], video)).not.toHaveLength(
      0
    );
  }, 50000);

  test("Limit must be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://invidious.snopyta.org" });
    const video = await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
    expect(
      await InvidJS.fetchComments(instances[0], video, { limit: 5 })
    ).toHaveLength(5);
  }, 50000);
});

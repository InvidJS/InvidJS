// @ts-nocheck
import { ErrorCodes } from "../classes";
import * as InvidJS from "../index";

describe("Errors test", () => {
  test("Must throw an error if arguments are missing.", async () => {
    try {
      await InvidJS.fetchVideo();
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.MissingArgument);
    }
  }, 30000);

  test("Must throw an error if arguments are invalid.", async () => {
    try {
      await InvidJS.fetchInstances({ limit: -1 });
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.InvalidArgument);
    }
  }, 30000);

  test("Must throw an error if API returns an error.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    try {
      await InvidJS.fetchVideo(instances[0], "9-RjN9gF954");
    } catch (error: any) {
      console.error(error);
      expect(error.code).toBe(ErrorCodes.APIError);
    }
  }, 30000);

  test("Must throw an error if API is blocked.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    try {
      await InvidJS.fetchStats(instances[0]);
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.APIBlocked);
    }
  }, 30000);
});

// @ts-nocheck
import { ErrorCodes } from "../classes";
import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Errors test", () => {
  test("Must throw an error if arguments are missing.", async () => {
    try {
      await InvidJS.fetchVideo();
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.MissingArgument);
    }
  }, 50000);

  test("Must throw an error if arguments are invalid.", async () => {
    try {
      await InvidJS.fetchInstances({ limit: -1 });
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.InvalidArgument);
    }
  }, 50000);

  test("Must throw an error if API returns an error.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    try {
      await InvidJS.fetchVideo(instances[0], "9-RjN9gF954");
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.APIError);
    }
  }, 50000);

  test("Must throw an error if API is blocked.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    try {
      await InvidJS.fetchStats(instances[0]);
    } catch (error: any) {
      expect(error.code).toBe(ErrorCodes.APIBlocked);
    }
  }, 50000);
});

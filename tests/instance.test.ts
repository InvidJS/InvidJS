import { InstanceTypes } from "../classes";
import * as InvidJS from "../index";

describe("Instance fetch test", () => {
  test("Instances should fetch correctly.", async () => {
    const instances = await InvidJS.fetchInstances();
    expect(instances).not.toHaveLength(0);
  }, 50000);

  test("Only a single instance should be fetched if a URL is given.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(instances).toHaveLength(1);
    expect(instances[0].url).toBe("https://y.com.sb");
  }, 50000);

  test("Instances type should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ type: InstanceTypes.i2p });
    expect(instances[0].type).toBe(InstanceTypes.i2p);
  }, 50000);

  test("Instances region should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ region: "PL" });
    expect(instances[0].region).toBe("PL");
  }, 50000);

  test("Instance API status should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ api_allowed: false });
    expect(instances[0].api_allowed).toBe(false);
  }, 50000);

  test("Instances limit should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ limit: 5 });
    expect(instances).toHaveLength(5);
  }, 50000);

  test("Multiple filters must apply correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      type: InstanceTypes.https,
      api_allowed: true,
      limit: 3,
    });
    expect(instances[0].type).toBe(InstanceTypes.https);
    expect(instances[0].api_allowed).toBe(true);
    expect(instances).toHaveLength(3);
  }, 50000);
});

describe("Instance stats fetch test", () => {
  test("Instance stats must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://y.com.sb" });
    expect(await InvidJS.fetchStats(instances[0])).not.toBeUndefined();
  }, 50000);

  test("Must throw an error if API is blocked.", async () => {
    const instances = await InvidJS.fetchInstances({ url: "https://yewtu.be" });
    try {
      await InvidJS.fetchStats(instances[0]);
    } catch (error: any) {
      expect(error.message).toBe(
        "The instance you provided does not support API requests or is offline!"
      );
    }
  }, 50000);
});

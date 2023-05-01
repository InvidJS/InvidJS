import * as InvidJS from "../index";

jest.retryTimes(5);
describe("Instance fetch test", () => {
  test("Instances should fetch correctly.", async () => {
    const instances = await InvidJS.fetchInstances();
    expect(instances).not.toHaveLength(0);
  }, 50000);

  test("Only a single instance should be fetched if a URL is given.", async () => {
    const instances = await InvidJS.fetchInstances({
      url: "https://invidious.snopyta.org",
    });
    expect(instances).toHaveLength(1);
    expect(instances[0].url).toBe("https://invidious.snopyta.org");
  }, 50000);

  test("Instances type should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({
      type: InvidJS.InstanceTypes.i2p,
    });
    expect(instances[0].type).toBe(InvidJS.InstanceTypes.i2p);
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

  test("Instances health should be respected.", async () => {
    const instances = await InvidJS.fetchInstances({ health: 90 });
    expect(instances[0].health).toBeGreaterThanOrEqual(90);
  }, 50000);

  test("Multiple filters must apply correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      type: InvidJS.InstanceTypes.https,
      api_allowed: true,
      limit: 3,
    });
    expect(instances[0].type).toBe(InvidJS.InstanceTypes.https);
    expect(instances[0].api_allowed).toBe(true);
    expect(instances).toHaveLength(3);
  }, 50000);
});

describe("Instance stats fetch test", () => {
  test("Instance stats must be fetched correctly.", async () => {
    const instances = await InvidJS.fetchInstances({
      health: 95,
      api_allowed: true,
    });
    expect(await InvidJS.fetchStats(instances[0])).not.toBeUndefined();
  }, 50000);
});

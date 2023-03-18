import * as InvidJS from "../index";

describe("Instance stats fetch test", () => {
    test("Instance stats must be fetched correctly.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchStats(instances[0])).not.toBeUndefined();
    }, 30000)

    test("Must throw an error if API is blocked.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchStats(instances[0]);
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    }, 30000)
})
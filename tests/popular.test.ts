import * as InvidJS from "../index";

describe("Popular fetch test", () => {
    test("Popular content must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchPopular(instance[0])).not.toBeNull();
    })

    test("Limit must be respected.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPopular(instance[0], {limit: 3}))).toHaveLength(3);
    })    

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchPopular(instance[0]);
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    })
})
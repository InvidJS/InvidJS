import * as InvidJS from "../index";

describe("Comments fetch test", () => {
    test("Comments must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchComments(instance[0], "dQw4w9WgXcQ")).not.toHaveLength(0);
    }, 30000)

    test("Limit must be respected.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchComments(instance[0], "dQw4w9WgXcQ", {limit: 5})).toHaveLength(5);
    }, 30000)

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchComments(instance[0], "dQw4w9WgXcQ");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    }, 30000)
})
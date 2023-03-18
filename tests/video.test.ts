import { FetchTypes } from "../classes";
import * as InvidJS from "../index";

describe("Video fetch test", () => {
    test("Video must be fetched correctly.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ")).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch minimal video.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {type: FetchTypes.Minimal})).id).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch basic video.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {type: FetchTypes.Basic})).formats).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch full video.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ", {type: FetchTypes.Full})).description).not.toBeUndefined();
    }, 30000)

    test("Must throw an error if API is blocked.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchVideo(instances[0], "dQw4w9WgXcQ");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    }, 30000)
})
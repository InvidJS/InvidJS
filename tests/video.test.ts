import { FetchTypes } from "../classes";
import { InvidJS } from "../index";

describe("Video fetch test", () => {
    test("Video must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchVideo(instance[0], "DleL5C130DU")).not.toBeNull();
    })

    test("Must be able to fetch minimal video.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instance[0], "DleL5C130DU", {type: FetchTypes.Minimal})).id).not.toBe(undefined);
    })

    test("Must be able to fetch basic video.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instance[0], "DleL5C130DU", {type: FetchTypes.Basic})).formats).not.toBe(undefined);
    })

    test("Must be able to fetch full video.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchVideo(instance[0], "DleL5C130DU", {type: FetchTypes.Full})).description).not.toBe(undefined);
    })

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchVideo(instance[0], "DleL5C130DU");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    })
})
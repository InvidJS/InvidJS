import { FetchTypes } from "../classes";
import * as InvidJS from "../index";

describe("Channel fetch test", () => {
    test("Channel must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchChannel(instance[0], "UCzm1WKIw8XK4x7HNkHhOM_A")).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch minimal channel.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchChannel(instance[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {type: FetchTypes.Minimal})).id).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch basic channel.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchChannel(instance[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {type: FetchTypes.Basic})).subs).not.toBeUndefined();
    }, 30000)

    test("Must be able to fetch full channel.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchChannel(instance[0], "UCzm1WKIw8XK4x7HNkHhOM_A", {type: FetchTypes.Full})).isVerified).not.toBeUndefined();
    }, 30000)

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchChannel(instance[0], "UCzm1WKIw8XK4x7HNkHhOM_A");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    }, 30000)
})
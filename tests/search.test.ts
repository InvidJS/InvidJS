import { Channel, ContentTypes } from "../classes";
import * as InvidJS from "../index";

describe("Search test", () => {
    test("Content must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.searchContent(instance[0], "typescript")).not.toBeNull();
    })
    
    test("Content type must be respected.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        let result = await InvidJS.searchContent(instance[0], "typescript", {type: ContentTypes.Channel});
        expect(result[0]).toBeInstanceOf(Channel);
    })

    test("Limit must be respected.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.searchContent(instance[0], "typescript", {limit: 5}))).toHaveLength(5);
    })

    test("Multiple filters must apply correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        let result = await InvidJS.searchContent(instance[0], "typescript", {type: ContentTypes.Channel, limit: 18});
        expect(result[0]).toBeInstanceOf(Channel);
        expect(result).toHaveLength(18);
    })

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.searchContent(instance[0], "typescript");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    })
})
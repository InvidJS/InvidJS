import { FetchTypes } from "../classes";
import * as InvidJS from "../index";

describe("Playlist fetch test", () => {
    test("Playlist must be fetched correctly.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN")).not.toBeNull();
    })

    test("Limit must be respected.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u3EnFgzz0Q9sSjSrJLmiq1p", {limit: 5})).videos).toHaveLength(5);
    })

    test("Must be able to fetch minimal playlist.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN", {playlist_type: FetchTypes.Minimal})).id).not.toBe(undefined);
    })

    test("Must be able to fetch basic playlist.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN", {playlist_type: FetchTypes.Basic})).videos).not.toBe(undefined);
    })

    test("Must be able to fetch full playlist.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN", {playlist_type: FetchTypes.Full})).description).not.toBe(undefined);
    })

    test("Must be able to fetch a mix and fill it with data.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect((await InvidJS.fetchPlaylist(instance[0], "RDMM", {playlist_type: FetchTypes.Full})).description).not.toBe(undefined);
    })

    test("Must throw an error if API is blocked.", async () => {
        let instance = await InvidJS.fetchInstances({url: "https://yewtu.be"});
        try {
            await InvidJS.fetchPlaylist(instance[0], "PLLvh8tVbc6u0a0Gwlgkm1SudMLm-kyYPN");
        } catch (error: any) {
            expect(error.message).toBe("The instance you provided does not support API requests or is offline!")
        }
    })
})
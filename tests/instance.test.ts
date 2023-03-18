import { InstanceTypes } from "../classes";
import * as InvidJS from "../index";

describe("Instance fetch test", () => {
    test("Instances should fetch correctly with no options.", async () => {
        expect(await InvidJS.fetchInstances()).not.toHaveLength(0);
    })

    test("Only a single instance should be fetched if a URL is given.", async () => {
        expect(await InvidJS.fetchInstances({url: "https://y.com.sb"})).toHaveLength(1);
    })

    
    test("Instances type should be respected.", async () => {
        expect(await InvidJS.fetchInstances({type: InstanceTypes.i2p})).toHaveLength(1);
    })

    test("Instances region should be respected.", async () => {
        expect(await InvidJS.fetchInstances({region: "PL"})).toHaveLength(1);
    })

    test("Instance API status should be respected.", async () => {
        expect(await InvidJS.fetchInstances({api_allowed: false})).toHaveLength(3);
    })

    test("Instances limit should be respected.", async () => {
        expect(await InvidJS.fetchInstances({limit: 5})).toHaveLength(5);
    })

    test("Multiple filters must apply correctly.", async () => {
        expect(await InvidJS.fetchInstances({type: InstanceTypes.https, api_allowed: true, limit: 3})).toHaveLength(3);
    })
})
import { InstanceTypes } from "../classes";
import * as InvidJS from "../index";

describe("Instance fetch test", () => {
    test("Instances should fetch correctly.", async () => {
        let instances = await InvidJS.fetchInstances();
        expect(instances).not.toHaveLength(0);
    }, 30000)

    test("Only a single instance should be fetched if a URL is given.", async () => {
        let instances = await InvidJS.fetchInstances({url: "https://y.com.sb"});
        expect(instances).toHaveLength(1);
        expect(instances[0].url).toBe("https://y.com.sb");
    }, 30000)

    
    test("Instances type should be respected.", async () => {
        let instances = await InvidJS.fetchInstances({type: InstanceTypes.i2p});
        expect(instances[0].type).toBe(InstanceTypes.i2p);
    }, 30000)

    test("Instances region should be respected.", async () => {
        let instances = await InvidJS.fetchInstances({region: "PL"});
        expect(instances[0].region).toBe("PL");
    }, 30000)

    test("Instance API status should be respected.", async () => {
        let instances = await InvidJS.fetchInstances({api_allowed: false});
        expect(instances[0].api_allowed).toBe(false);
    }, 30000)

    test("Instances limit should be respected.", async () => {
        let instances = await InvidJS.fetchInstances({limit: 5});
        expect(instances).toHaveLength(5);
    }, 30000)

    test("Multiple filters must apply correctly.", async () => {
        let instances = await InvidJS.fetchInstances({type: InstanceTypes.https, api_allowed: true, limit: 3});
        expect(instances[0].type).toBe(InstanceTypes.https);
        expect(instances[0].api_allowed).toBe(true);
        expect(instances).toHaveLength(3);
    }, 30000)
})
import { VideoInfo } from '../classes/videoInfo.js';
import { InstanceInfo } from '../classes/instanceInfo.js';
import * as fs from "fs-extra";
import * as ffmpeg from "ffmpeg-static";
import fetch from "node-fetch";

let Constants = {
    allowedTypes: ["https", "i2p", "onion", "all"]
}

let InvidJS = {
    fetchInstanceLinks: async function(type) {
        if (!Constants.allowedTypes.includes(type)) throw new Error("Invalid type!");
        let instances = [];
        await fetch("https://api.invidious.io/instances.json").then(res => res.json().then(json => {
            json.forEach(element => {
                if (type === element[1].type || type === "all") instances.push(element[1].uri);
            });
        }));
        return instances;
    },

    getInstance: async function(uri) {
        if (!uri) throw new Error("You must provide a valid instance!");
        let info = undefined;
        await fetch("https://api.invidious.io/instances.json").then(res => res.json().then(json => {
            let found = json.filter((instance) => instance[1].uri === uri);
            if (!found) throw new Error("You must provide a valid instance!");
            let instance = found[0][1];
            info = new InstanceInfo(instance.region, instance.cors, instance.api, instance.type, instance.uri);
        }));
        return info;
    },

    fetchVideoInfo: async function(instance, id) {
        if (!instance) throw new Error("You must provide an instance to fetch videos!")
        if (!id) throw new Error("You must provide a video ID to fetch it!")
        if ((await this.getInstance(instance)).api_active === false) throw new Error("The instance you provided does not support API requests!")
        let info = undefined;
        await fetch(`${instance}/api/v1/videos/${id}`).then(res => res.json().then(json => {
            info = new VideoInfo(json.title, json.description, json.publishedText, json.viewCount, json.likeCount, json.dislikeCount, json.lengthSeconds);
        }))
        return info;
    }
}

console.log(await InvidJS.getInstance("https://yewtu.be"))
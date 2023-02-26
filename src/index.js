let Dependencies = {
    ffmpeg: require('ffmpeg-static'),
    fs: require("fs-extra"),
}

let Constants = {
    allowedTypes: ["https", "i2p", "onion", "all"]
}

let InvJS = {
    fetchInstances: async function(type) {
        if (!Constants.allowedTypes.includes(type)) throw new Error("Invalid type!");
        let instances = [];
        await fetch("https://api.invidious.io/instances.json").then(res => res.json().then(json => {
            json.forEach(element => {
                if (type === element[1].type || type === "all") instances.push(element[1].uri);
            });
        }));
        return instances;
    }
}

InvJS.fetchInstances("all");

module.exports = InvJS;
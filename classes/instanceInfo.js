export class InstanceInfo {
    constructor(region, cors_active, api_active, type, uri) {
        this.region = region;
        this.cors_active = cors_active;
        this.api_active = api_active;
        this.type = type;
        this.uri = uri;
    }
}
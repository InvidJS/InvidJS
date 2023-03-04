/**
 * @class Instance - Instance Info
 */
export class Instance {
  /**
   * @param {string} region  - Region of the instance
   * @param {boolean} cors_allowed  - Is CORS allowed?
   * @param {boolean} api_allowed  - Is API allowed?
   * @param {string} type  - Type of the instance
   * @param {string} uri  - URL of the instance
   */
  constructor(region, cors_allowed, api_allowed, type, uri) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.uri = uri;
  }
}

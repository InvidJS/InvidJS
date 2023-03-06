/**
 * @class Instance - Instance Info
 */
export class Instance {
  region: string;
  cors_allowed: boolean;
  api_allowed: boolean;
  type: string;
  uri: string;
  /**
   * @param {string} region  - Region of the instance
   * @param {boolean} cors_allowed  - Is CORS allowed?
   * @param {boolean} api_allowed  - Is API allowed?
   * @param {string} type  - Type of the instance
   * @param {string} uri  - URL of the instance
   */
  constructor(
    region: string,
    cors_allowed: boolean,
    api_allowed: boolean,
    type: string,
    uri: string
  ) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.uri = uri;
  }

  /**
   *
   * @returns {boolean} Is API allowed?
   */
  checkAPIAccess(): boolean {
    return this.api_allowed;
  }

  /**
   *
   * @returns {string} Instance URL.
   */
  getURL(): string {
    return this.uri;
  }
}

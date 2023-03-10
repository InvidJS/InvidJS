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

/**
 * @class InstanceStats - Instance Stats
 */
export class InstanceStats {
  software_name: string;
  software_version: string;
  software_branch: string;
  users_total: number;
  users_active_halfyear: number;
  users_active_month: number;
  registrations: boolean;
  /**
   *
   * @param {string} software_name - Software Name
   * @param {string} software_version - Software Version
   * @param {string} software_branch - Software Branch
   * @param {number} users_total - Total Users
   * @param {number} users_active_halfyear - Users active in the last 6 months
   * @param {number} users_active_month - Users active in the last month
   * @param {boolean} registrations - Is registration allowed?
   */
  constructor(
    software_name: string,
    software_version: string,
    software_branch: string,
    users_total: number,
    users_active_halfyear: number,
    users_active_month: number,
    registrations: boolean,
  ) {
    this.software_name = software_name;
    this.software_version = software_version;
    this.software_branch = software_branch;
    this.users_total = users_total;
    this.users_active_halfyear = users_active_halfyear;
    this.users_active_month = users_active_month;
    this.registrations = registrations;
  }
}

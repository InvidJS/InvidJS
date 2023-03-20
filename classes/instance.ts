/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} region  - Region of the instance.
 * @param {boolean} cors_allowed  - Is CORS allowed?
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {string} type  - Type of the instance.
 * @param {string} url  - URL of the instance.
 */
export class Instance {
  public region: string;
  public cors_allowed: boolean;
  public api_allowed: boolean;
  public type: string;
  public url: string;
  constructor(
    region: string,
    cors_allowed: boolean,
    api_allowed: boolean,
    type: string,
    url: string
  ) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.url = url;
  }
}

/**
 * @name InstanceStats
 * @description Statistics about an instance.
 *
 * @param {string} software_name - Name of the software (usually Invidious).
 * @param {string} software_version - Version of the software.
 * @param {string} software_branch - Cloned branch.
 * @param {number} users_total - Total users.
 * @param {number} users_active_halfyear - Users active in the last 6 months.
 * @param {number} users_active_month - Users active in the last month.
 * @param {boolean} registrations - Is registration allowed?
 */
export class InstanceStats {
  public software_name: string;
  public software_version: string;
  public software_branch: string;
  public users_total: number;
  public users_active_halfyear: number;
  public users_active_month: number;
  public registrations: boolean;
  constructor(
    software_name: string,
    software_version: string,
    software_branch: string,
    users_total: number,
    users_active_halfyear: number,
    users_active_month: number,
    registrations: boolean
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

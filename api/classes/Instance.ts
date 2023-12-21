import got, { HTTPError, RequestError } from "got";
import * as Enums from "../enums.js";
import { InstanceStats } from "./InstanceStats.js";
import { SoftwareStats } from "./SoftwareStats.js";
import { UserStats } from "./UserStats.js";
import { APIError } from "../errors/APIError.js";
import { APINotAvailableError } from "../errors/APINotAvailableError.js";
import { UnknownError } from "../errors/UnknownError.js";

const useragent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";

/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} region  - Region of the instance.
 * @param {boolean} cors_allowed  - Is CORS allowed?
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {Enums.InstanceTypes} type  - Type of the instance.
 * @param {string} url  - URL of the instance.
 * @param {number} [daily_health] - Latest reported health of the instance.
 * @param {number} [monthly_health] - Health of the instance (last 30 days).
 * @param {number} [health] - Health of the instance (last 90 days).
 */
export class Instance {
  public region: string;
  public cors_allowed: boolean;
  public api_allowed: boolean;
  public type: Enums.InstanceTypes;
  public url: string;
  public daily_health?: number;
  public monthly_health?: number;
  public health?: number;
  constructor(
    region: string,
    cors_allowed: boolean,
    api_allowed: boolean,
    type: Enums.InstanceTypes,
    url: string,
    daily_health?: number,
    monthly_health?: number,
    health?: number,
  ) {
    this.region = region;
    this.cors_allowed = cors_allowed;
    this.api_allowed = api_allowed;
    this.type = type;
    this.url = url;
    this.daily_health = daily_health;
    this.monthly_health = monthly_health;
    this.health = health;
  }

  /**
   * @name fetchStats
   * @description Fetches stats of an instance.
   * @example await instance.fetchStats();
   * @returns {Promise<InstanceStats>} Instance stats object.
   */
  public async fetchStats(): Promise<InstanceStats> {
    if (this.api_allowed === false || this.api_allowed === null)
      throw new APINotAvailableError(
        "The instance you provided does not support API requests or is offline!",
      );
    let stats!: InstanceStats;
    try {
      const res = await got.get(`${this.url}/api/v1/stats`, {
        headers: { "User-Agent": useragent },
      });
      const json = await JSON.parse(res.body);
      const software = new SoftwareStats(
        json.software.name,
        json.software.version,
        json.software.branch,
      );
      const users = new UserStats(
        json.usage.users.total,
        json.usage.users.activeHalfyear,
        json.usage.users.activeMonth,
        json.openRegistrations,
      );
      stats = new InstanceStats(software, users);
    } catch (err) {
      if (err instanceof HTTPError) {
        throw new APIError(err.message);
      }
      if (err instanceof RequestError) {
        throw new UnknownError(err.message);
      }
    }
    return stats;
  }
}

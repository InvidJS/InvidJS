import got, { HTTPError, RequestError } from "got";
import * as Enums from "../enums.js";
import { InstanceStats } from "./InstanceStats.js";
import { SoftwareStats } from "./SoftwareStats.js";
import { UserStats } from "./UserStats.js";
import { APIError } from "../errors/APIError.js";
import { APIDownError } from "../errors/APIDownError.js";
import { UnknownError } from "../errors/UnknownError.js";
import { ServerError } from "../errors/ServerError.js";

const useragent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";

/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} url  - URL of the instance.
 * @param {Enums.InstanceTypes} type  - Type of the instance.
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {number} [health] - Instance uptime.
 * @param {string} [region]  - Region of the instance.
 * @param {boolean} [cors_allowed]  - Is CORS allowed?
 */
export class Instance {
  public url: string;
  public type: Enums.InstanceTypes;
  public api_allowed: boolean;
  public health?: number;
  public region?: string;
  public cors_allowed?: boolean;
  constructor(
    url: string,
    type: Enums.InstanceTypes,
    api_allowed: boolean,
    health?: number,
    region?: string,
    cors_allowed?: boolean,
  ) {
    this.url = url;
    this.type = type;
    this.api_allowed = api_allowed;
    this.health = health;
    this.region = region;
    this.cors_allowed = cors_allowed;
  }

  /**
   * @name fetchStats
   * @description Fetches stats of an instance.
   * @example await instance.fetchStats();
   * @returns {Promise<InstanceStats>} Instance stats object.
   */
  public async fetchStats(): Promise<InstanceStats> {
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
    } catch (err: any) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    }
    return stats;
  }
}

import { SoftwareStats } from "./SoftwareStats.js";
import { UserStats } from "./UserStats.js";

/**
 * @name InstanceStats
 * @description Statistics about an instance.
 *
 * @param {SoftwareStats} software - Software stats.
 * @param {UserStats} users - User stats.
 */
export class InstanceStats {
  public software: SoftwareStats;
  public users: UserStats;
  constructor(software: SoftwareStats, users: UserStats) {
    this.software = software;
    this.users = users;
  }
}

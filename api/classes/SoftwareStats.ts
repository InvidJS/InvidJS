/**
 * @name SoftwareStats
 * @description Statistics about software.
 *
 * @param {string} name - Name of the software (usually Invidious).
 * @param {string} version - Version of the software.
 * @param {string} branch - Cloned branch.
 */
export class SoftwareStats {
  public name: string;
  public version: string;
  public branch: string;
  constructor(name: string, version: string, branch: string) {
    this.name = name;
    this.version = version;
    this.branch = branch;
  }
}

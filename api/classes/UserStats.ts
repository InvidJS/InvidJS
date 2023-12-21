/**
 * @name UserStats
 * @description Statistics about users.
 *
 * @param {number} total - Total users.
 * @param {number} halfYear - Users active in the last 6 months.
 * @param {number} month - Users active in the last month.
 * @param {boolean} reg_allowed - Is registration allowed?
 */
export class UserStats {
  public total: number;
  public halfYear: number;
  public month: number;
  public reg_allowed: boolean;
  constructor(
    total: number,
    halfYear: number,
    month: number,
    reg_allowed: boolean,
  ) {
    this.total = total;
    this.halfYear = halfYear;
    this.month = month;
    this.reg_allowed = reg_allowed;
  }
}

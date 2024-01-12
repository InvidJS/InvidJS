export class QueryParams {
  public fields?: string;
  public region?: string;
  public sort_by?: string;
  public limit?: number;
  public q?: string;
  public page?: number;
  public date?: string;
  public duration?: string;
  public type?: string;
  public features?: string;
  public id?: string;
  public itag?: string;

  public createQuery() {
    let query = Object.fromEntries(
      Object.entries(this).filter(([key, value]) => value !== undefined)
    );
    return new URLSearchParams(query);
  }
}

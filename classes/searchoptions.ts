export type InstanceSearchOptions = {
  url?: string;
  type?: "https" | "onion" | "i2p" | "all";
  region?: string;
  api_allowed?: boolean | "any";
  limit?: number;
};
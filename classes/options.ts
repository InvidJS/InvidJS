export type InstanceFetchOptions = {
  url?: string;
  type?: "https" | "onion" | "i2p" | "all";
  region?: string;
  api_allowed?: boolean | "any";
  limit?: number;
};

export type PlaylistFetchOptions = {
  playlist_type?: "full" | "basic";
  videos_type?: "full" | "basic";
  limit?: number;
};

export type VideoFetchOptions = {
  type?: "full" | "basic";
};
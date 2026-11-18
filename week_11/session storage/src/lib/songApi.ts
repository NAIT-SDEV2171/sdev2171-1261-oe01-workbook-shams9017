// todo: request the public /songs catalogue without a bearer token
// todo: return the songs array from the response to the song hook

import { requestJson } from "./api";
import type { Song } from "../types/song";

export async function getSongs(): Promise<Song[]> {
  const body = await requestJson("/songs");
  return body.songs;
}


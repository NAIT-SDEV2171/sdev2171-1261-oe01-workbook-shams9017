// todo: define the saved playlist type including its selected songs
// todo: fetch the current user’s saved playlists through the protected /playlists route
// todo: send a post request when there is no saved id and a put request when editing a saved playlist
// todo: attach the bearer token and send the title, goal, and selected song ids
// todo: return the response so the caller can check the status before reading the saved data

import { protectedGet, request } from "./api";
import { type Song } from "../types/song";


export type SavedPlaylist = {
  id: string; userId: string; title: string; goal: string;
  songIds: string[]; songs: Song[]; songCount: number;
};

export function getPlaylists(token: string) {
  return protectedGet("/playlists", token);
}

export function savePlaylist(token: string, id: string | null, title: string, goal: string, songIds: string[]) {
  return request(id ? `/playlists/${id}` : "/playlists", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, goal, songIds }),
  });
}

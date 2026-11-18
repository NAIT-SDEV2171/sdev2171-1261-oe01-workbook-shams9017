// todo: store selected songs, the current playlist id, and the last saved details in shared state
// todo: add songs without duplicates and remove songs by id
// todo: load an existing playlist into shared state or clear it to start a new one
// todo: save the title, goal, and selected song ids using the current token
// todo: check the response status and sign out if the token was rejected
// todo: update shared state with the saved response only after a successful save
// todo: expose the state and actions through a playlist hook

import { createContext, useContext, useState, type ReactNode } from "react";
import { parseResponse } from "../lib/api";
import { savePlaylist, type SavedPlaylist } from "../lib/playlistApi";
import type { Song } from "../types/song";
import { useAuth } from "./AuthContext";
export type PlaylistDetails = {
  title: string;
  goal: string;
  songCount: number;
};
type PlaylistContextValue = {
  addedSongs: Song[];
  playlistId: string | null;
  savedPlaylistDetails: PlaylistDetails | null;
  savePlaylistDetails: (details: PlaylistDetails) => Promise<void>;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  openPlaylist: (playlist: SavedPlaylist) => void;
  startNewPlaylist: () => void;
};
const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined,
);
export function PlaylistProvider({ children }: { children: ReactNode }) {
  const { authToken, signOut } = useAuth();
  const [addedSongs, setAddedSongs] = useState<Song[]>([]);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [savedPlaylistDetails, setSavedPlaylistDetails] =
    useState<PlaylistDetails | null>(null);
  function openPlaylist(playlist: SavedPlaylist) {
    setPlaylistId(playlist.id);
    setAddedSongs(playlist.songs);
    setSavedPlaylistDetails({
      title: playlist.title,
      goal: playlist.goal,
      songCount: playlist.songIds.length,
    });
  }
  async function savePlaylistDetails(details: PlaylistDetails) {
    const response = await savePlaylist(
      authToken,
      playlistId,
      details.title,
      details.goal,
      addedSongs.map((song) => song.id),
    );
    if (response.status === 401) signOut();

    // commit shared details only after the backend confirms the playlist was saved.
    const { playlist } = await parseResponse(response);
    openPlaylist(playlist);
  }
  function startNewPlaylist() {
    // a new draft has no saved id, so submitting it creates a separate playlist.
    setPlaylistId(null);
    setAddedSongs([]);
    setSavedPlaylistDetails(null);
  }
  function addSong(song: Song) {
    setAddedSongs((current) =>
      current.some((item) => item.id === song.id)
        ? current
        : [...current, song],
    );
  }
  function removeSong(id: string) {
    setAddedSongs((current) => current.filter((song) => song.id !== id));
  }
  return (
    <PlaylistContext.Provider
      value={{
        addedSongs,
        playlistId,
        savedPlaylistDetails,
        savePlaylistDetails,
        addSong,
        removeSong,
        openPlaylist,
        startNewPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
export function usePlaylist() {
  const value = useContext(PlaylistContext);
  if (!value) throw new Error("");
  return value;
}

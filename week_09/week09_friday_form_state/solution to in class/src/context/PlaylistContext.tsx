import { createContext, useContext, useState, type ReactNode } from "react";
import type { Song } from "../data/songs";

// todo: add a PlaylistDetails type with title: string, goal: string, and songCount: number.
// add savedPlaylistDetails: PlaylistDetails | null to the context value type.
// add savePlaylistDetails: (details: PlaylistDetails) => void to the same type.

export type PlaylistDetails = {
  title: string;
  goal: string;
  songCount: number;
};

// this type describes the selection and actions that all screens can access.
type PlaylistContextValue = {
  addedSongs: Song[];
  savedPlaylistDetails: PlaylistDetails | null;
  savePlaylistDetails: (details: PlaylistDetails) => void;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
};

// context lets components below a provider access the value it supplies.
// undefined is the fallback when no matching provider exists above the consumer.
const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined,
);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  // this is the only playlist selection state in the app.
  // useState owns the value here; context makes it available to both screens.
  const [addedSongs, setAddedSongs] = useState<Song[]>([]);

  // todo: create savedPlaylistDetails state here, initially null.
  // add savePlaylistDetails to commit a validated details object to that state.
  // include savedPlaylistDetails and savePlaylistDetails in the provider value below.
  // keep title, goal, and validation error drafts local to the form screen.

  const [savedPlaylistDetails, setSavedPlaylistDetails] =
    useState<PlaylistDetails | null>(null);

  function savePlaylistDetails(details: PlaylistDetails) {
    // the form calls this action only after its validation checks pass.
    setSavedPlaylistDetails(details);
  }

  function addSong(song: Song) {
    // current is the latest selection, including any updates requested by either screen.
    // some checks for a matching id so the same song cannot be added twice.
    // spread creates a new array containing the existing songs and the new song.
    setAddedSongs((current) =>
      current.some((item) => item.id === song.id)
        ? current
        : [...current, song],
    );
  }

  function removeSong(id: string) {
    // filter creates a new selection without this song.
    // the update reaches both screens because they read this same state owner.
    setAddedSongs((current) => current.filter((song) => song.id !== id));
  }

  return (
    // the provider supplies the current selection and its update functions to children.
    // consumers receive the updated value when the selection changes.
    <PlaylistContext.Provider
      value={{
        addedSongs,
        addSong,
        removeSong,
        savedPlaylistDetails,
        savePlaylistDetails,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

// this custom hook gives screens a simple way to read the context with useContext.
// calling it in two screens reads the provider; it does not create two selections.
export function usePlaylist() {
  const playlist = useContext(PlaylistContext);

  // this message identifies a screen placed outside the shared provider.
  if (playlist === undefined) {
    throw new Error("usePlaylist must be used inside PlaylistProvider");
  }

  return playlist;
}

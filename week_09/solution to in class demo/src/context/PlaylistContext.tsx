// this file is the planned home for the shared playlist selection and its actions.

// why this file is here:
// the context folder groups the playlist-sharing code outside the screen routes.
// keeping this file outside src/app prevents expo router from treating it as a screen.
// the folder name is only an organizational choice; it does not make state shared.
// sharing will come from one provider wrapped around both routes in src/app/_layout.tsx.
//
// step 1 - add the imports here:
// import createContext, useContext, useState, and the ReactNode type from react.
// import the existing Song type from ../data/songs.
import { createContext, useContext, useState, type ReactNode } from "react";

import type { Song } from "../data/songs";

//
// step 2 - describe the value that the context will provide:
// define a PlaylistContextValue type containing addedSongs, addSong, and removeSong.
// addedSongs is an array of Song objects, addSong receives a Song, and removeSong receives an id.

type PlaylistContextValue = {
  addedSongs: Song[];
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
};
//
// step 3 - create the context here:
// create PlaylistContext using the value type, with undefined as its fallback.
// this context lets components access the nearest provider's value.
// it does not own the playlist state itself.

const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined,
);

//
// step 4 - create and export a PlaylistProvider component here:
// accept children so the provider can surround the navigation stack.
// move the addedSongs state from src/app/index.tsx into this component.
// this component will become the only owner of the playlist selection.

export function PlaylistProvider({ children }: { children: ReactNode }) {
  // shared state
  const [addedSongs, setAddedSongs] = useState<Song[]>([]);
  //
  // step 5 - move the update functions inside PlaylistProvider:
  // move addSong from src/app/index.tsx and keep its duplicate check.
  // move removeSong from src/app/playlist.tsx and make it update addedSongs instead of playlistSongs.
  // both actions must update the same state with setAddedSongs.
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
    <PlaylistContext.Provider value={{ addedSongs, addSong, removeSong }}>
      {children}
    </PlaylistContext.Provider>
  );
}
//
// step 6 - supply the shared value from PlaylistProvider:
// return PlaylistContext.Provider around children.
// give its value prop the current addedSongs array and the addSong and removeSong functions.
// screens reading this context will receive the new value when the selection changes.

//
// step 7 - create and export a usePlaylist custom hook here:
// read PlaylistContext with useContext.
// throw a clear error if the value is undefined because the calling component lacks a provider.
// otherwise return the value so screens can access the selection and actions.
// calling this hook from two screens must read one provider, not create two selections.

export function usePlaylist() {
  const playlist = useContext(PlaylistContext);

  if (playlist === undefined) {
    throw new Error("usePlaylist must be used inside PlaylistProvider");
  }

  return playlist;
}

//
// step 8 - connect this file to the app:
// follow the comments in _layout.tsx to wrap the stack with one PlaylistProvider.
// follow the comments in index.tsx and playlist.tsx to replace their separate selections.
// keep screen-specific state local if it does not need to be shared.
//
// verify the completed solution:
// add two songs, open my playlist, remove one, and go back.
// the removed song should show add again, and both counts should agree.
// open my playlist again and confirm the removed song stays removed.

// todo: fetch the public catalogue when the screen opens and when the user retries
// todo: use an async load function with try, catch, and finally to track songs, loading, and errors
// todo: return the list, status, and retry action to both catalogue screens

import { useEffect, useState } from "react";
import { getSongs } from "../lib/songApi";
import type { Song } from "../types/song";

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSongs() {
    setIsLoading(true);
    setError("");

    try {
      const items = await getSongs();
      setSongs(items);
    } catch (error: any) {
      setSongs([]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSongs();
  }, []);

  return { songs, isLoading, error, retry: loadSongs };
}

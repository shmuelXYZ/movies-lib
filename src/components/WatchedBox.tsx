import { useState } from "react";
import { tempWatchedData } from "./App";
import { MuvieRate } from "../types";
import { Summary } from "./Summary";
import { WatchedMoviesList } from "./WatchedMoviesList";

export function WatchedBox() {
  const [watched, setWatched] = useState<MuvieRate[]>(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}

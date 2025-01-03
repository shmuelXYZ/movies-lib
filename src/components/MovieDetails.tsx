import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRate";
import Loader from "./Loader";
import { MovieRate } from "../types";
import { useKeyBoard } from "../hooks/useKeyBoard";

interface MovieAPIResponse {
  Title: string;
  Year: string;
  Actors: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Director: string;
  Genre: string;
  imdbID: string;
}

interface MovieDetailsProps {
  selectedId: string;
  onClose: () => void;
  onAddWatched: (movie: MovieRate) => void;
}

// Safe function to parse runtime
const parseRuntime = (runtimeStr: string): number => {
  // Extract number from string like "120 min"
  const minutes = parseInt(runtimeStr?.split(" ")[0]);
  // Return 0 if NaN, otherwise return the parsed number
  return isNaN(minutes) ? 0 : minutes;
};

const API_KEY = process.env.REACT_APP_API_KEY;

export const MovieDetails = ({
  selectedId,
  onClose,
  onAddWatched,
}: MovieDetailsProps) => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieAPIResponse | null>(null);
  const [userRating, setUserRating] = useState<number>(0);

  const ratingClicks = useRef<number>(0);

  useEffect(() => {
    if (userRating) ratingClicks.current++;
  }, [userRating]);

  // api call for all detailes of the selected movie
  useEffect(() => {
    async function fetchMovieDtails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.log("error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDtails();
  }, [selectedId]);

  // custom hook to close the modal on esc key
  useKeyBoard("Escape", onClose);
  // useEffect(() => {
  //   function callback(e: KeyboardEvent) {
  //     if (e.code === "Escape") {
  //       onClose();
  //       console.log("esc");
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   // cleanup function
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onClose]);

  const handleAdd = () => {
    if (!movie) return; // Guard clause for null movie

    const newMovie: MovieRate = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: parseRuntime(movie.Runtime),
      imdbRating: Number(movie.imdbRating) || 0, // Handle potential NaN
      userRating,
      userRatingClicks: ratingClicks.current,
    };

    onAddWatched(newMovie);
    onClose();
  };

  // chnge the title of the tab
  useEffect(() => {
    if (!movie) return;
    document.title = `Movie | ${movie?.Title}`;
    // cleanup function
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  if (!movie) return null;
  const {
    Title: title,
    // Year: year,
    Actors: actors,
    Poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
  } = movie;

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onClose()}>
              &larr;
            </button>
            <img src={Poster} alt={`movie: ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                size={24}
                maxRating={10}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + add to the list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

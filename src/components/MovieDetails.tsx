import React, { useEffect, useState } from "react";
import StarRating from "./StarRate";
import Loader from "./Loader";

interface MovieDetailsProps {
  selectedId: string;
  onClose: () => void;
}
const apikey = process.env.REACT_APP_API_KEY;

export const MovieDetails = ({ selectedId, onClose }: MovieDetailsProps) => {
  const [movie, setMovie] = useState("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const {
    Title: title,
    Year: year,
    Actors: actors,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchMovieDtails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovieDtails();
  }, [selectedId]);
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
            <img src={poster} alt={`movie: ${movie}`} />
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
              <StarRating size={24} maxRating={10} />
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

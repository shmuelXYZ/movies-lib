import { MovieRate } from "../types";

export const WatchedMoviesList = ({
  watched,
  onDelete,
}: {
  watched: MovieRate[];
  onDelete: (id: string) => void;
}) => {
  return (
    <ul className="list">
      {watched.map((movie: MovieRate) => (
        <WatchedMovie movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
};
export default WatchedMoviesList;

const WatchedMovie = ({
  movie,
  onDelete,
}: {
  movie: MovieRate;
  onDelete: (id: string) => void;
}) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
};

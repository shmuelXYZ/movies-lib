import { MuvieRate } from "../types";

export const WatchedMoviesList = ({ watched }: { watched: MuvieRate[] }) => {
  return (
    <ul className="list">
      {watched.map((movie: MuvieRate) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
};
export default WatchedMoviesList;

const WatchedMovie = ({ movie }: { movie: MuvieRate }) => {
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
      </div>
    </li>
  );
};

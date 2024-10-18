import { Movie } from "./Movie";
import { Muvie } from "../types";

export const MoviesList = ({ movies }: { movies: Muvie[] }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
export default MoviesList;

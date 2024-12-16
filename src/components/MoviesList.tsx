import { Movie } from "./Movie";
import { Muvie } from "../types";

interface MoviesListProps {
  movies: Muvie[];
  onSelectMovie: (id: string) => void;
}

export const MoviesList = ({ movies, onSelectMovie }: MoviesListProps) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};
export default MoviesList;

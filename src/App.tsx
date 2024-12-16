import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { Muvie, MuvieRate } from "./types";
import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { NumResult } from "./components/NumResult";
import { Box } from "./components/Box";
import { Summary } from "./components/Summary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { MoviesList } from "./components/MoviesList";
import Loader from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieDetails } from "./components/MovieDetails";

export const tempWatchedData: MuvieRate[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

export default function App() {
  const apikey = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Muvie[]>([]);
  const [watched, setWatched] = useState<MuvieRate[]>(tempWatchedData);
  const [isloading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handeleSelectedMovie = (id: string) => {
    // setSelectedId((id) => (selectedId === id ? null : id));
    setSelectedId((selectedId) => (selectedId === id ? null : id));
    console.log(selectedId, id);
  };

  const resetSelctedMovie = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    async function fetchMoveis() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`
        );
        if (!res.ok) {
          throw new Error("somthing went wrong");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMoveis();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MoviesList movies={movies} onSelectMovie={handeleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onClose={resetSelctedMovie} />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import { Muvie, MovieRate } from "./types";
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

export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: any) => acc + cur / arr.length,
    0
  );

export default function App() {
  const apikey = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Muvie[]>([]);
  const [watched, setWatched] = useState<MovieRate[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handeleSelectedMovie = (id: string) => {
    // setSelectedId((id) => (selectedId === id ? null : id)); this not work
    setSelectedId((selectedId) => (selectedId === id ? null : id));
    console.log(selectedId, id);
  };

  const resetSelctedMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatchedMovie = (movie: MovieRate) => {
    const newID = movie.imdbID;

    const isMovieExist = watched.filter((m) => m.imdbID === newID);
    setWatched((watched) =>
      isMovieExist.length > 0 ? watched : [...watched, movie]
    );
  };

  const handleDeleteFromWatchedList = (id: string) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMoveis() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("somthing went wrong");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (err) {
        const error = err as Error;
        if ((err as Error).name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    resetSelctedMovie();
    fetchMoveis();
    // cleanup function for aborting race condition
    return () => {
      controller.abort();
    };
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
            <MovieDetails
              selectedId={selectedId}
              onClose={resetSelctedMovie}
              onAddWatched={handleAddWatchedMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteFromWatchedList}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

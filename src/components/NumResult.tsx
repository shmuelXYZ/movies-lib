import { Muvie } from "../types";

// import Muvie from "../types";
export function NumResult({ movies }: { movies: Muvie[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

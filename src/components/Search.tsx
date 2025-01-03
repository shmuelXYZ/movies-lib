import { useRef } from "react";
import { useKeyBoard } from "../hooks/useKeyBoard";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<null | any>(null);

  // custom hook control the search and listen to enter press
  useKeyBoard("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

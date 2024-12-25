import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<null | any>(null);
  // control the search and listen to enter press
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      console.log(document.activeElement, inputEl);
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    // cleanup function
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

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

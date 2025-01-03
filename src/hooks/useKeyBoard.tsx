import { useEffect } from "react";

// custom hook to listen to keyboard events and action accordently
export const useKeyBoard = (key: string, action: () => void) => {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLocaleLowerCase() === key.toLocaleLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", callback);
    // cleanup function
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
};

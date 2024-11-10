import { ReactNode } from "react";

export interface Muvie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MuvieRate {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface BoxProps {
  children: ReactNode;
}

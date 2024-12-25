import { ReactNode } from "react";

export interface Muvie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieRate {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
  userRatingClicks?: number;
}

export interface BoxProps {
  children: ReactNode;
}

import { BoxProps } from "../types";
export function NavBar({ children }: BoxProps) {
  return <nav className="nav-bar">{children}</nav>;
}

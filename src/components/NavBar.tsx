import { Logo } from "./Logo";
import { Search } from "./Search";
import { NumResult } from "./NumResult";

export function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResult />
    </nav>
  );
}

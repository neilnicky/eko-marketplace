import Cart from "../common/Cart";
import HeaderOptions from "./HeaderOptions";
import HeaderProfile from "./HeaderProfile";
import SearchBar from "./SearchBar";

export default function AppHeader() {
  return (
    <header className="bg-card shadow-sm py-2 px-4 fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-2 sm:gap-4 border-b border-border">
      <HeaderOptions />
      <SearchBar />
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <Cart />
        <HeaderProfile />
      </div>
    </header>
  );
}

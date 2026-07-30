import { ClerkLoaded, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="bg-surface py-5">
      <Container className="flex items-center justify-between">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center gap-5 justify-end">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>{user ? <UserButton /> : <SignIn />}</ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;

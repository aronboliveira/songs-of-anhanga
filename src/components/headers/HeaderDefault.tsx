import LogoutButton from "../buttons/LogoutButton";
export default function HeaderDefault({
  isLoggedIn,
}: {
  isLoggedIn?: boolean;
}): JSX.Element {
  return (
    <header className="site-header">
      <nav className="main-nav">
        <div className="nav-left">
          <a href="/" className="nav-logo">
            Folklore RPG
          </a>
          <a href="#story" className="nav-link">
            Story
          </a>
          <a href="#characters" className="nav-link">
            Characters
          </a>
          <a href="#world" className="nav-link">
            World
          </a>
        </div>
        <div className="nav-right">
          {isLoggedIn && <LogoutButton />}
          <a href="/login" className="nav-button">
            Login
          </a>
          <a href="/register" className="nav-button">
            Register
          </a>
        </div>
      </nav>
    </header>
  );
}

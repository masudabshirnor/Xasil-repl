import { useState } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";

export default function Header({
  user,
  onLogin,
  onRegister,
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand">
          <div className="brand-mark">
            <span className="brand-x">X</span>
            <span className="brand-swoosh">⌒</span>
          </div>

          <div className="brand-copy">
            <strong>XASIL</strong>
            <span>STABILITY, BOOKED.</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <a href="#stays">Stays</a>
          <a href="#halls">Halls & Events</a>
          <a href="#destinations">Destinations</a>
          <a href="#partners">List your property</a>
          <a href="#support">Help</a>
        </nav>

        <div className="desktop-actions">
          {!user ? (
            <>
              <button className="btn-login" onClick={onLogin}>
                Sign in
              </button>

              <button className="btn-register" onClick={onRegister}>
                Create account
              </button>
            </>
          ) : (
            <div className="user-menu">
              <button className="user-button">
                <User size={18} />
                <span>{user.email}</span>
                <ChevronDown size={16} />
              </button>

              <div className="user-dropdown">
                <a href="#bookings">My bookings</a>
                <a href="#favorites">Favorites</a>
                <a href="#profile">Profile</a>
                <button onClick={onLogout}>Sign out</button>
              </div>
            </div>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <a href="#stays">Stays</a>
          <a href="#halls">Halls & Events</a>
          <a href="#destinations">Destinations</a>
          <a href="#partners">List your property</a>
          <a href="#support">Help</a>

          {!user ? (
            <div className="mobile-auth-actions">
              <button onClick={onLogin}>Sign in</button>
              <button className="mobile-register" onClick={onRegister}>
                Create account
              </button>
            </div>
          ) : (
            <>
              <a href="#bookings">My bookings</a>
              <a href="#favorites">Favorites</a>
              <button onClick={onLogout}>Sign out</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
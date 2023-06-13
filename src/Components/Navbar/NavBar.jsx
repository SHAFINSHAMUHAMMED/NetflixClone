import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <div className='navbar'>
      <div className="logo-container">
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
      </div>

      <div className="nav-links">
        <a href="/tvshows" className="nav-link">TV Shows</a>
        <a href="/movies" className="nav-link">Movies</a>
        <a href="/mylist" className="nav-link">My List</a>
      </div>

      <img className='avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" />
    </div>
  );
}

export default NavBar;

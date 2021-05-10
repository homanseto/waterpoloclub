import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../../../redux';

import './Navbar.css';

const Navbar = (props) => {
  const [navbarLists, setNavbarLists] = useState([
    'about',
    'login',
    'courses',
    'events',
  ]);
  const userData = useSelector((state) => state.user);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const handleScroll = () => {
    const currentSrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentSrollPos ? true : false);
    setPrevScrollPos(currentSrollPos);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // console.log(prevScrollPos);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(isLoggedIn);
    if (isLoggedIn === 'true') {
      setNavbarLists(['about', 'account', 'courses', 'events', 'logout']);
    } else {
      setNavbarLists(['about', 'login', 'courses', 'events']);
    }
  }, [userData]);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top water-polo-navbar"
        style={{ top: visible ? '0' : '-70px' }}
      >
        <NavLink to="/" className="navbar-brand">
          <h2 className="navbar-waterpolo-title">New Water Polo.</h2>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbar-click navbar-waterpolo-click"
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav ml-auto">
            {navbarLists.map((list, i) => {
              return list === 'logout' ? (
                <NavLink
                  className="nav-link"
                  to={`/login`}
                  key={`${list}-0${i}`}
                >
                  <li
                    key={`${list}-0${i}`}
                    className="nav-item nav-waterpolo-item"
                    onClick={handleLogout}
                  >
                    {list[0].toUpperCase() + list.slice(1)}
                  </li>
                </NavLink>
              ) : (
                <li
                  className="nav-item nav-waterpolo-item"
                  key={`${list}-0${i}`}
                >
                  <NavLink
                    className="nav-link"
                    to={`/${list}`}
                    key={`${list}-0${i}`}
                  >
                    {list[0].toUpperCase() + list.slice(1)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

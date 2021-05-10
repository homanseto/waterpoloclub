import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminCourses from './AdminCourses/AdminCourse';
import HomePage from './HomePage/HomePage';
import Events from './AdminEvents/AdminEvents';

import './Admin.css';

const adminLists = ['home', 'courses', 'events'];

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="wrapper">
      <nav className={isOpen ? 'nav-admin-menu active' : 'nav-admin-menu'}>
        <ul className="nav-menu-items">
          {adminLists.map((list, index) => {
            return (
              <li key={index}>
                {list === 'home' ? (
                  <NavLink to="/account">{list}</NavLink>
                ) : (
                  <NavLink to={`/account/${list}`}>{list}</NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="navbar admin-navbar ">
        <NavLink to="#" className="menu-bars ">
          <FontAwesomeIcon
            icon={faBars}
            onClick={handleSideBar}
            color="hsl(0, 0%, 15%)"
          />
        </NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route
            path="/account"
            default
            exact
            component={(props) => <HomePage {...props} />}
          />
          <Route
            path="/account/courses"
            exact
            component={(props) => <AdminCourses {...props} />}
          />
          <Route
            path="/account/events"
            exact
            component={(props) => <Events {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Admin;

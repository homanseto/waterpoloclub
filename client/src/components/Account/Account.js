import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from './User/User';
import Admin from './Admin/Admin';

const Account = (props) => {
  const { history } = props;
  const userData = useSelector((state) => state.user);
  const role = localStorage.getItem('role');
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'false') {
      history.push('/login');
    }
  }, [userData]);

  return <div>{role === 'user' ? <User {...props} /> : <Admin />}</div>;
};

export default Account;

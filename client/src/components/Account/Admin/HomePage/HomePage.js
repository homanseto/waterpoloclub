import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { updateMe, updatePassword } from '../../../../redux';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const getUsername = localStorage.getItem('username');
  const getUserEmail = localStorage.getItem('email');

  const [account, setAccount] = useState({
    userName: getUsername || null,
    email: getUserEmail || null,
  });

  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
  });

  const handleAccount = (e) => {
    const { value, name } = e.target;
    setAccount((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleInformationUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMe(account.userName, account.email));
  };

  const handlePassword = (e) => {
    const { value, name } = e.target;
    setPasswordUpdate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword(
        passwordUpdate.oldPassword,
        passwordUpdate.newPassword,
        passwordUpdate.newConfirmPassword
      )
    );
  };
  return (
    <div className="adminHomePage">
      <div className="row">
        <form className="user" onSubmit={handleInformationUpdate}>
          <h1>Account Information</h1>
          <div className="form-group">
            <label className="log-page-label">Username</label>
            <input
              name="userName"
              type="test"
              className="form-control"
              value={account.userName}
              onChange={handleAccount}
            ></input>
            <label className="log-page-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={account.email}
              onChange={handleAccount}
            ></input>
            <br></br>
            <button type="submit" className="btn change-btn">
              Change Information
            </button>
          </div>
        </form>
        <form className="user" onSubmit={handlePasswordUpdate}>
          <h1>Account Password</h1>
          <div className="form-group">
            <label className="log-page-label">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.oldPassword}
              onChange={handlePassword}
            ></input>
            <label className="log-page-label">New Password</label>
            <input
              name="newPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.newPassword}
              onChange={handlePassword}
            ></input>
            <label className="log-page-label">Confirm New Password</label>
            <input
              name="newConfirmPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.newConfirmPassword}
              onChange={handlePassword}
            ></input>
            <br></br>
            <button type="submit" className="btn change-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;

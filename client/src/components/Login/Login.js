import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { fetchUser, signUpUser } from '../../redux';

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [sigUpForm, setSignUpForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = (e) => {
    const { value, name } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUser(loginForm.email, loginForm.password));
  };

  const handleSignUp = (e) => {
    const { value, name } = e.target;
    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signUpUser(
        sigUpForm.username,
        sigUpForm.email,
        sigUpForm.password,
        sigUpForm.confirmPassword
      )
    );
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      history.push('/account');
    }
  }, [userData]);

  return (
    <div>
      <h1 className="error-message">{userData && userData.error}</h1>
      <div className="row">
        <div className="col">
          <form className="box" onSubmit={handleLoginSubmit}>
            <h1 className="login-heading">Login</h1>
            <div className="form-group">
              <label className="log-page-label">Email address</label>
              <input
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLogin}
                className="form-control"
              ></input>
              <label className="logPageLabel">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={loginForm.password}
                onChange={handleLogin}
              ></input>
              <a href="#">Forgot your password?</a>
              <br></br>
              <button type="submit" className="btn login-btn">
                login
              </button>
            </div>
          </form>
        </div>
        <div className="col">
          <form className="box" onSubmit={handleSignUpSubmit}>
            <h1 className="login-heading">Sign Up</h1>
            <div className="form-group">
              <label className="log-page-label">Username</label>
              <input
                name="username"
                type="test"
                className="form-control"
                value={sigUpForm.username}
                onChange={handleSignUp}
              ></input>
              <label className="log-page-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={sigUpForm.email}
                onChange={handleSignUp}
              ></input>
              <label className="logPageLabel">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={sigUpForm.password}
                onChange={handleSignUp}
              ></input>
              <label className="logPageLabel">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                value={sigUpForm.confirmPassword}
                onChange={handleSignUp}
              ></input>

              <br></br>
              <button type="submit" className="btn login-btn">
                sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

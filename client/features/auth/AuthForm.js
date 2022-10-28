import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div className="auth-form">
      <span>Enter Credentials Below</span>
      <hr/>
      <form onSubmit={handleSubmit} name={name}>
        <div className ="username">
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
       
        <div className="password">
          <label htmlFor="password">
            <small className="pass">Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
      <div>
        <Link to="/">
          <button>Continue As Guest</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;

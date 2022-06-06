import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const LoginForm: React.FC<any> = ({ signInHandler, errorMsg }) => {
  const navigate = useNavigate();

  const loading = useSelector((state: any) => state.currentUser.loading);

  return (
    <>
      {loading && "LOADING..."}
      <form className="SignIn-form" onSubmit={signInHandler}>
        <h1>Sign In Form</h1>
        <p>Email Address</p>
        <input
          autoComplete="none"
          name="signInEmail"
          type="email"
          placeholder="Ex:example@example.com"
        />
        <p>Password</p>
        <input
          type="password"
          name="signInPassword"
          placeholder="Password"
          autoComplete="false"
        />

        <div style={{ margin: "10px 0" }}>
          <input type="checkbox" name="stayLogged" id="" />
          <label htmlFor="stayLogged"> Remember This User</label>
          {/* <p>
            In case of refreshing the page you will be automatically loggedin
          </p> */}
        </div>

        <p style={{ color: "red" }}>{errorMsg}</p>

        <input type="submit" value="Sign In" />
        <p>- or -</p>
        <button onClick={() => navigate("/signup")}>Create New Account</button>
      </form>
    </>
  );
};

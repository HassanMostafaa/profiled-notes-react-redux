import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const LoginForm: React.FC<any> = ({ signInHandler, errorMsg }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const loading = useSelector((state: any) => state.currentUser.loading);

  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
    }
  }, []);

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          name="signInPassword"
          placeholder="Password"
          autoComplete="false"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ margin: "10px 0" }}>
          <input type="checkbox" name="stayLogged" id="" />
          <label htmlFor="stayLogged"> Remember This User</label>
        </div>
        <p style={{ color: "red" }}>{errorMsg}</p>
        <input type="submit" value="Sign In" />{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            setEmail("");
            setPassword("");
          }}
        >
          Clear History
        </button>
        <p>- or -</p>
        <button onClick={() => navigate("/signup")}>Create New Account</button>
      </form>
    </>
  );
};

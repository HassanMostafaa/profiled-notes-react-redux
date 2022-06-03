import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signUpHandler = async (e: any) => {
    e.preventDefault();

    if (
      e.target.signUpPassword.value === e.target.reEnterSignUpPassword.value
    ) {
      setLoading(true);
      const { signUpEmail, signUpUserName, signUpPassword } = e.target;
      try {
        const res = await axios.post(
          "https://profiled-notes-json-server.herokuapp.com/users",
          {
            id: uuidv4(),
            email: signUpEmail.value,
            password: signUpPassword.value,
            userName: signUpUserName.value,
            createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
            notes: [],
          }
        );

        setLoading(false);
        navigate("/");
      } catch (error: any) {
        setLoading(false);
        alert(error);
      }
    } else {
      alert("passwords doesn't match");
    }
  };

  return (
    <>
      {" "}
      {loading && " LOADING ..."}
      <form
        className="sign-up-form"
        onSubmit={signUpHandler}
        autoComplete="off"
      >
        <h1>Sign Up Form</h1>
        <p>Email Address</p>
        <input
          autoComplete="off"
          type="email"
          placeholder="Ex:example@example.com"
          name="signUpEmail"
        />
        <p>User Name</p>
        <input
          autoComplete="off"
          type="text"
          placeholder="Ex:ExampleText"
          name="signUpUserName"
        />
        <p>Password</p>
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          name="signUpPassword"
        />
        <p>Re-Enter Password</p>
        <input
          autoComplete="off"
          type="password"
          name="reEnterSignUpPassword"
          placeholder="Re-Enter Password"
        />
        <br />
        <br />
        <input type="submit" value="Sign Up" />
        <p>- or -</p>
        <button onClick={() => navigate("/")}>Already have an Account?</button>
      </form>
    </>
  );
};

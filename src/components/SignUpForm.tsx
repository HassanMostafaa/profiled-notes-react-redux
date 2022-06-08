import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpNameView, setSignUpNameView] = useState("");

  const signUpHandler = async (e: any) => {
    e.preventDefault();

    if (
      e.target.signUpPassword.value === e.target.reEnterSignUpPassword.value
    ) {
      setLoading(true);
      const { signUpEmail, signUpPassword } = e.target;
      try {
        const res = await axios.get(
          `https://profiled-notes-json-server.herokuapp.com/users?email=${signUpEmail.value}`
        );
        const data: any = await res.data;
        // console.log(data);
        if (data[0] === undefined) {
          const res = await axios.post(
            "https://profiled-notes-json-server.herokuapp.com/users",
            {
              id: uuidv4(),
              email: signUpEmail.value,
              password: signUpPassword.value,
              userName: signUpNameView,
              createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
              notes: [],
            }
          );
          await res.data;
          // console.log("First Time Email");
          setLoading(false);
          navigate("/");
        } else {
          alert("Email already Used");
          setLoading(false);
        }
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
      {loading && " LOADING ..."}
      <h1>Sign Up Form</h1>
      <form className="sign-up-form" onSubmit={signUpHandler}>
        <p>User Name</p>
        <input
          autoComplete="off"
          type="text"
          placeholder="Ex:ExampleText"
          name="signUpUserName"
          value={signUpNameView}
          onChange={(e) => setSignUpNameView(e.target.value.trim())}
        />

        <p>Email Address</p>
        <input
          autoComplete="off"
          type="email"
          placeholder="Ex:example@example.com"
          name="signUpEmail"
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

        <div>
          <br />
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      <p>- or -</p>
      <button onClick={() => navigate("/")}>Already have an Account?</button>
    </>
  );
};

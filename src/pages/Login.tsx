import { LoginForm } from "./../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginCurrentUser } from "./../redux/currentUser/currentUserSlice";
import { useState } from "react";

export const SignIn = () => {
  const { logged, loading } = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch<any>();
  const [errorMsg, setErrorMsg] = useState("");

  const signInHandler = async (e: any) => {
    e.preventDefault();
    const email = e.target.signInEmail.value;
    const password = e.target.signInPassword.value;
    const rememberMe = e.target.stayLogged.checked;
    localStorage.setItem("autoLog", "true");

    if (!!email && !!password) {
      await dispatch(
        loginCurrentUser({
          email,
          password,
          rememberMe,
        })
      );

      if (!loading || !logged) {
        setErrorMsg("Invalid Email Address or Password");
        setTimeout(() => {
          setErrorMsg("");
        }, 6000);
      }
    } else {
      setErrorMsg("Invalid Input values");
    }
  };

  return (
    <div>
      <div className="SignIn-container">
        <LoginForm signInHandler={signInHandler} errorMsg={errorMsg} />
      </div>
    </div>
  );
};

import { LoginForm } from "./../components/LoginForm";
import { useDispatch } from "react-redux";
import { loginCurrentUser } from "./../redux/currentUser/currentUserSlice";
export const SignIn = () => {
  const dispatch = useDispatch<any>();

  const signInHandler = (e: any) => {
    e.preventDefault();

    //for remember me function  e.target.stayLogged.checked if(true) save it to localstorage

    dispatch(
      loginCurrentUser({
        email: e.target.signInEmail.value,
        password: e.target.signInPassword.value,
      })
    );
  };
  return (
    <div>
      <div className="SignIn-container">
        <LoginForm signInHandler={signInHandler} />
      </div>
    </div>
  );
};

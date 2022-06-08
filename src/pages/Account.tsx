import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCurrentUserAccount,
  signOutCurrentUser,
} from "../redux/currentUser/currentUserSlice";
import { useNavigate } from "react-router-dom";

export const Account: React.FC = () => {
  const { notes, email, password, createdAt, userName, id } = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  const { logged } = useSelector((state: any) => state.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccountHandler = () => {
    const sure = window.confirm(
      "Are you sure you want to Delete Your Account?"
    );
    if (sure) {
      dispatch(deleteCurrentUserAccount({ id }));
      navigate("/");
    } else {
      alert("Account deletion canceled");
    }
  };

  const signOutHandler = () => {
    dispatch(signOutCurrentUser());
    navigate("/");
  };

  if (!logged) {
    navigate("/");
  }

  return (
    <div className="accountInfo">
      <h3>{userName}</h3>
      <p>email : {email}</p>
      <p>Password : {password}</p>
      <p>Account Registration Date {createdAt}</p>
      <p>Number Of Notes {notes.length}</p>
      <button onClick={signOutHandler}>Sign Out</button>
      <button onClick={deleteAccountHandler}>Delete Account</button>
    </div>
  );
};

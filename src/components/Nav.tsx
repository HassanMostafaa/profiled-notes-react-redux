import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Nav = () => {
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  return (
    <nav>
      <div className="logo">
        <h1>Notes</h1>
      </div>
      <div className="menu">
        <NavLink to="/">Home</NavLink>

        <p>{currentUser.userName && currentUser.userName}</p>
      </div>
    </nav>
  );
};

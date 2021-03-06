import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutCurrentUser,
  deleteCurrentUserAccount,
} from "../redux/currentUser/currentUserSlice";
import "../styles/navStyles.scss";

export const Nav: React.FC = () => {
  const currentUser = useSelector((state: any) =>
    state.currentUser.currentUser ? state.currentUser.currentUser : null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <nav>
      <div className="logo">
        <h1>Notes</h1>
      </div>
      <div className="menu">
        {
          <NavLink to="/" onClick={() => setShowUserInfo(false)}>
            Home
          </NavLink>
        }

        <div className="userInfo">
          {currentUser !== null && currentUser.userName !== undefined ? (
            <>
              <NavLink to="account" onClick={() => setShowUserInfo(false)}>
                Account
              </NavLink>
              <div
                style={{
                  cursor: "pointer",
                  position: "relative",
                  padding: " 0 10px",
                }}
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                {currentUser.userName}
                {showUserInfo && (
                  <div className="userInfoOptions">
                    <button
                      onClick={() => {
                        dispatch(signOutCurrentUser());
                        navigate("/");
                      }}
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={() => {
                        const sure = window.confirm(
                          "Are you sure you want to Delete Your Account?"
                        );
                        if (sure) {
                          dispatch(
                            deleteCurrentUserAccount({ id: currentUser.id })
                          );
                          navigate("/");
                        } else {
                          alert("Account deletion canceled");
                        }
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

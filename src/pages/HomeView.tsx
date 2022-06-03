import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCurrentUserAccount,
  signOutCurrentUser,
} from "../redux/currentUser/currentUserSlice";

export const HomeView: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const { userName, email, createdAt, id, password, notes } = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.currentUser.loading);
  const signOutHandler = () => {
    console.log("Sign Out Btn");
    dispatch(signOutCurrentUser());
  };

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

  return (
    <div className="container">
      {loading && "LOADING..."}
      <h1>HomeView</h1>
      <p>{userName}</p>
      <p>{email}</p>
      <p>{createdAt}</p>
      <p>{id}</p>
      <p>{password}</p>
      <div style={{ padding: "10px 0px" }}>
        <h3>Notes</h3>
        {notes.map((note: any, ix: number) => (
          <div
            key={ix}
            style={{
              padding: "5px",
              border: "1px solid grey",
              margin: "10px 0",
            }}
          >
            <p>{note.noteTitle}</p>
            <p>{note.noteBody}</p>
          </div>
        ))}
      </div>
      <button onClick={signOutHandler}>Sign Out</button>
      <button onClick={deleteAccountHandler}>Delete Account</button>
    </div>
  );
};

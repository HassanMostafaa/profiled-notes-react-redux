import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCurrentUserAccount,
  signOutCurrentUser,
} from "../redux/currentUser/currentUserSlice";
import { NewNoteForm } from "../components/NewNoteForm";
import { HomeViewNote } from "../components/HomeViewNote";

export const HomeView: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const { userName, email, createdAt, id, password, notes } = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  const orderedNotes = [...notes].reverse();

  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.currentUser.loading);
  const signOutHandler = () => {
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
      <br></br>
      <NewNoteForm />
      <div style={{ padding: "10px 0px" }}>
        <h3>Notes</h3>
        {orderedNotes.map((note: any, ix: number) => (
          <HomeViewNote key={ix} note={note} />
        ))}
      </div>
      <button onClick={signOutHandler}>Sign Out</button>
      <button onClick={deleteAccountHandler}>Delete Account</button>
      <br></br> <br></br>
    </div>
  );
};

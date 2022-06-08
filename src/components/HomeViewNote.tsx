import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteFromCurrentUser } from "../redux/currentUser/currentUserSlice";

export const HomeViewNote: React.FC<any> = ({ note }) => {
  const dispatch = useDispatch();
  const { email, password, notes, id } = useSelector(
    (state: any) => state.currentUser.currentUser
  );

  const { noteBody, noteTitle } = note;

  const deleteNoteHandler = () => {
    dispatch(deleteNoteFromCurrentUser({ id, note, notes, password, email }));
  };
  return (
    <>
      <div
        className="homeViewNote"
        style={{
          padding: "20px",
          border: "1px solid grey",
          margin: "10px 0",
          background: note.noteColor,
        }}
      >
        <h4>{noteTitle}</h4>
        <pre>{noteBody}</pre>
        <button onClick={deleteNoteHandler}>Delete Note</button>
      </div>
    </>
  );
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteFromCurrentUser } from "../redux/currentUser/currentUserSlice";

export const HomeViewNote: React.FC<any> = ({ note }) => {
  const dispatch = useDispatch();
  const { email, password, notes, id } = useSelector(
    (state: any) => state.currentUser.currentUser
  );

  const deleteNoteHandler = () => {
    dispatch(deleteNoteFromCurrentUser({ id, note, notes, password, email }));
  };
  return (
    <>
      <div
        style={{
          padding: "5px",
          border: "1px solid grey",
          margin: "10px 0",
        }}
      >
        <p>{note.noteTitle}</p>
        <p>{note.noteBody}</p>
        <button onClick={deleteNoteHandler}>Delete Note</button>
      </div>
    </>
  );
};

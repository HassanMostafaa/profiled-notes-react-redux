import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNoteToCurrentUser } from "../redux/currentUser/currentUserSlice";

export const NewNoteForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );

  const addNoteHandler = async (e: any) => {
    e.preventDefault();
    const noteTitle = e.target.newNoteTitle.value;
    const noteBody = e.target.newNoteBody.value;

    await dispatch(
      addNoteToCurrentUser({ note: { noteTitle, noteBody }, currentUser })
    );
  };

  return (
    <div style={{ border: "1px solid grey", textAlign: "center" }}>
      <form onSubmit={addNoteHandler}>
        <h1>New Note</h1>
        <p>Note Title | If Empty will be with today's date</p>
        <input type="text" placeholder="Note Title" name={"newNoteTitle"} />
        <p>Note Content</p>
        <input type="text" placeholder="Note" name={"newNoteBody"} />
        <br />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
};

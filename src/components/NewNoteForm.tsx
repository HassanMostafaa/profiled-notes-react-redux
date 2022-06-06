import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNoteToCurrentUser } from "../redux/currentUser/currentUserSlice";
import "../styles/newNoteForm.scss";
import moment from "moment";

export const NewNoteForm: React.FC<any> = () => {
  const [noteColor, setNoteColor] = useState("#fff2b5");
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );

  const addNoteHandler = async (e: any) => {
    e.preventDefault();
    let noteTitle =
      e.target.newNoteTitle.value || moment().format("MMMM Do YYYY, h:mm:ss a");
    let noteBody = e.target.newNoteBody.value;

    await dispatch(
      addNoteToCurrentUser({
        note: { noteTitle, noteBody, noteColor },
        currentUser,
      })
    );
  };
  const changeNoteColor = (e: any) => {
    const selectedColor = e.target.getAttribute("data-color");
    setNoteColor(selectedColor);
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        padding: "20px",
        // backgroundColor: noteColor,
      }}
    >
      <form onSubmit={addNoteHandler}>
        <div className="colorSelector">
          <p>Color Selector</p>
          <div className="colors">
            <div
              onClick={changeNoteColor}
              data-color="#fff2b5"
              className={
                noteColor === "#fff2b5"
                  ? "color lemon selectedColor"
                  : "color lemon"
              }
            ></div>
            <div
              onClick={changeNoteColor}
              data-color="#c7efc4"
              className={
                noteColor === "#c7efc4"
                  ? "color grass selectedColor"
                  : "color grass"
              }
            ></div>
            <div
              onClick={changeNoteColor}
              data-color="#f9f9f9"
              className={
                noteColor === "#f9f9f9"
                  ? "color clean selectedColor"
                  : "color clean"
              }
            ></div>
            <div
              onClick={changeNoteColor}
              data-color="#c4e5ff"
              className={
                noteColor === "#c4e5ff"
                  ? "color skyBlue selectedColor"
                  : "color skyBlue"
              }
            ></div>
            <div
              onClick={changeNoteColor}
              data-color="#dec6fb"
              className={
                noteColor === "#dec6fb"
                  ? "color pinky selectedColor"
                  : "color pinky"
              }
            ></div>
            <div
              onClick={changeNoteColor}
              data-color="#FFC3F4"
              className={
                noteColor === "#FFC3F4"
                  ? "color rose selectedColor"
                  : "color rose"
              }
            ></div>
          </div>
        </div>
        <h1>New Note</h1>
        <p>Note Title | If Empty will be with today's date</p>
        <input
          type="text"
          placeholder={`${moment().format("MMMM Do YYYY, h:mm:ss a")}`}
          name={"newNoteTitle"}
        />
        <p>Note Content</p>
        <input type="text" placeholder="Note" name={"newNoteBody"} />
        <br />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
};

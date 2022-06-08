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

  const colors = [
    { hex: "#fff2b5", class: "lemon" },
    { hex: "#c7efc4", class: "grass" },
    { hex: "#f9f9f9", class: "clean" },
    { hex: "#c4e5ff", class: "skyBlue" },
    { hex: "#dec6fb", class: "pinky" },
    { hex: "#FFC3F4", class: "rose" },
  ];

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
            {colors.map((color, ix) => (
              <div
                key={ix}
                onClick={changeNoteColor}
                data-color={color.hex}
                className={
                  noteColor === color.hex
                    ? `color ${color.class} selectedColor`
                    : `color ${color.class}`
                }
              ></div>
            ))}
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
        {/* <input type="text" placeholder="Note" name={"newNoteBody"} /> */}
        <textarea name="newNoteBody" id="" rows={5} cols={22}></textarea>
        <br />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
};

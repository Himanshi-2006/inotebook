import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { trashNote, pinNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className={`card my-3 shadow ${note.isPinned ? "border border-warning border-3" : ""}`}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <i
              className={`fa-solid mx-2 ${
                note.isPinned ? "fa-thumbtack text-warning" : "fa-thumbtack"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => pinNote(note._id)}
            ></i>

            <h5 className="card-title"> {note.title} </h5>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="fa-regular fa-trash-can mx-2 "
              onClick={() => {
                trashNote(note._id);
                props.showAlert("Moved to trash Successfully", "Success");
              }}
            ></i>
          </div>

          <p className="card-text">{note.description}</p>

          <p className="mt-2">
            <span className="badge bg-primary">{note.tag}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

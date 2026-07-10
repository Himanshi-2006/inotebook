import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { trashNote, pinNote } = context;
  const { note, updateNote } = props;

  const getTagColor = (tag) => {
    switch (tag) {
      case "Study":
        return "primary"; // Blue

      case "Work":
        return "warning"; // Yellow

      case "Personal":
        return "success"; // Green

      case "Shopping":
        return "danger"; // Red

      case "Ideas":
        return "info"; // Cyan

      case "Goals":
        return "dark"; // Black

      case "Fitness":
        return "secondary"; // Gray

      default:
        return "light";
    }
  };

  const getBorderColor = (tag) => {
    switch (tag) {
      case "Study":
        return "#0d6efd";

      case "Work":
        return "#ffc107";

      case "Personal":
        return "#198754";

      case "Shopping":
        return "#dc3545";

      case "Ideas":
        return "#0dcaf0";

      case "Goals":
        return "#212529";

      case "Fitness":
        return "#6c757d";

      default:
        return "#adb5bd";
    }
  };

  return (
    <div className="col-md-3">
      <div
        className={`card my-3 shadow ${note.isPinned ? "border border-warning border-3" : ""} `}
        style={{ borderLeft: `6px solid ${getBorderColor(note.tag)}` }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            {/* Pin Icon */}
            <i
              className={`fa-solid mx-2 ${
                note.isPinned ? "fa-thumbtack text-warning" : "fa-thumbtack"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => pinNote(note._id)}
            ></i>
            {/* Title */}
            <h5 className="card-title"> {note.title} </h5>
            {/* Edit icon */}
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            {/* Delete Icon */}
            <i
              className="fa-regular fa-trash-can mx-2 "
              onClick={() => {
                trashNote(note._id);
                props.showAlert("Moved to trash Successfully", "Success");
              }}
            ></i>
          </div>
          {/* Description */}
          <p className="card-text">
            <ReactMarkdown>{note.description}</ReactMarkdown>
          </p>
          {/* Tag */}
          <span
            className={`badge ${
              note.tag === "Others"
                ? "bg-light text-dark border"
                : `bg-${getTagColor(note.tag)}`
            }`}
          >
            {note.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

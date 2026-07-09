import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // ------Get all note---------
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // -----------Add a note------------
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    // Logic for adding a note
    // console.log("Adding a new note.");
    const note = json;
    setNotes(notes.concat(note));
  };

  // ---------Delete a note---------
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    //logic for deleting a note
    console.log(`deleting note with ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // --------Edit a note----------
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let i = 0; i < newNotes.length; i++) {
          if (newNotes[i]._id === id) {
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }

        setNotes(newNotes);
      }
    }
  };

  //--------pin a note--------
  const pinNote = async (id) => {
    await fetch(`${host}/api/notes/pinnote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          isPinned: !note.isPinned,
        };
      }

      return note;
    });

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, pinNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

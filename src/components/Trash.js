import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Trash = () => {
  const context = useContext(noteContext);
  const { getTrashNotes, restoreNote, deleteForever } = context;

  const [trashNotes, setTrashNotes] = useState([]);

  useEffect(() => {
    fetchTrash();
    // eslint-disable-next-line
  }, []);

  const fetchTrash = async () => {
    const notes = await getTrashNotes();
    setTrashNotes(notes);
  };

  return (
    <>
      <div className="container my-4">
        <h2 style={{ marginTop: "80px" }}>🗑 Trash</h2>

        {trashNotes.length === 0 ? (
          <h5 className="text-muted mt-4">Trash is empty.</h5>
        ) : (
          <div className="row">
            {trashNotes.map((note) => (
              <div className="col-md-3" key={note._id}>
                <div className="card my-3">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>

                    <p className="card-text">{note.description}</p>

                    <span className="badge bg-secondary">{note.tag}</span>

                    <div className="mt-3 d-flex justify-content-between">
                      {/* Restore button */}
                      <button
                        className="btn btn-success btn-sm"
                        onClick={async () => {
                          await restoreNote(note._id);
                          fetchTrash();
                        }}
                      >
                        ♻ Restore
                      </button>

                      {/* Delete forever button */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to permanently delete this note?\n\nThis action cannot be undone.",
                          );

                          if (!confirmDelete) return;

                          await deleteForever(note._id);
                          fetchTrash();
                        }}
                      >
                        Delete Forever
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Trash;

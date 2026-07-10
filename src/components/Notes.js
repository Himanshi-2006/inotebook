import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [searchTag, setSearchTag] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Filter by tag
  const filteredNotes = notes.filter((note) => {
    return searchTag === "" || note.tag === searchTag;
  });

  // Sort by latest and oldest date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortOrder) {
      case "latest":
        return new Date(b.date) - new Date(a.date);

      case "oldest":
        return new Date(a.date) - new Date(b.date);

      case "az":
        return a.title.localeCompare(b.title);

      case "za":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  // Pinned and Unpinned
  const pinnedNotes = sortedNotes.filter((note) => note.isPinned);
  const unPinnedNotes = sortedNotes.filter((note) => !note.isPinned);

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Hidden button for modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Modal
      </button>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    minLength={3}
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Category
                  </label>

                  <select
                    className="form-select"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  >
                    <option value="">Choose Category</option>
                    <option value="Study">📚 Study</option>
                    <option value="Work">💼 Work</option>
                    <option value="Personal">👤 Personal</option>
                    <option value="Shopping">🛒 Shopping</option>
                    <option value="Ideas">💡 Ideas</option>
                    <option value="Goals">🎯 Goals</option>
                    <option value="Fitness">🏋️ Fitness</option>
                    <option value="Others">📌 Others</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="row my-4">
        <div className="row my-3">
          {/* Search */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Search by Category</label>

            <select
              className="form-select"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Study">📚 Study</option>
              <option value="Work">💼 Work</option>
              <option value="Personal">👤 Personal</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Ideas">💡 Ideas</option>
              <option value="Goals">🎯 Goals</option>
              <option value="Fitness">🏋️ Fitness</option>
              <option value="Others">📌 Others</option>
            </select>
          </div>

          {/* Sort */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Sort Notes</label>

            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="latest">🆕 Latest First</option>
              <option value="oldest">📜 Oldest First</option>
              <option value="az">🔤 Title (A-Z)</option>
              <option value="za">🔠 Title (Z-A)</option>
            </select>
          </div>
        </div>

        <h2>Your Notes</h2>

        {filteredNotes.length === 0 ? (
          <h5 className="text-center text-muted mt-4">
            No notes found in this category.
          </h5>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <>
                {pinnedNotes.map((note) => (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updateNote={updateNote}
                    showAlert={props.showAlert}
                  />
                ))}
              </>
            )}

            {unPinnedNotes.length > 0 && (
              <>
                {unPinnedNotes.map((note) => (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updateNote={updateNote}
                    showAlert={props.showAlert}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Notes;

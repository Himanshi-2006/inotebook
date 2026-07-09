import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);

    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid mt-5 px-4 ">
      <div
        className="card bg-light shadow p-4 w-100"
        style={{
          borderRadius: "15px",
          marginTop: "80px",
          marginBottom: "30px",
        }}
      >
        <h2 className="text-center mb-4">Add a Note</h2>
        
        <form>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              minLength={3}
              required
              onChange={onChange}
            />
          </div>
          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={note.description}
              minLength={5}
              required
              onChange={onChange}
            ></textarea>
          </div>
          {/* Tag */}
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Category
            </label>

            <select
              className="form-select"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              required
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

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary px-4"
              onClick={handleClick}
              disabled={note.title.length < 3 || note.description.length < 5}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;

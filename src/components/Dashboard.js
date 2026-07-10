import noteContext from "../context/notes/noteContext";
import React, { useContext, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, getTrashNotes } = context;

  const categoryCount = {
    Study: 0,
    Work: 0,
    Personal: 0,
    Shopping: 0,
    Ideas: 0,
    Goals: 0,
    Fitness: 0,
    Others: 0,
  };

  notes.forEach((note) => {
    if (categoryCount[note.tag] !== undefined) {
      categoryCount[note.tag]++;
    }
  });

  const data = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Number of Notes",
        data: Object.values(categoryCount),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Notes by Category",
      },
    },
  };

  const [trashCount, setTrashCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getNotes();

      const trashNotes = await getTrashNotes();
      setTrashCount(trashNotes.length);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const totalNotes = notes.filter((note) => !note.isDeleted).length;

  const pinnedNotes = notes.filter(
    (note) => note.isPinned && !note.isDeleted,
  ).length;

  const categories = new Set(
    notes.filter((note) => !note.isDeleted).map((note) => note.tag),
  ).size;

  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{ marginTop: "70px" }}>
        📊 Dashboard
      </h2>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>📝 Notes</h5>
            <h2>{totalNotes}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>📌 Pinned</h5>
            <h2>{pinnedNotes}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>🗑 Trash</h5>
            <h2>{trashCount}</h2>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm text-center p-3">
            <h5>📚 Categories</h5>
            <h2>{categories}</h2>
          </div>
        </div>
      </div>

        {/* Individual category display */}
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>📚 Study</h5>
              <h2>{categoryCount.Study}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>💼 Work</h5>
              <h2>{categoryCount.Work}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>👤 Personal</h5>
              <h2>{categoryCount.Personal}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>🛒 Shopping</h5>
              <h2>{categoryCount.Shopping}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>💡 Ideas</h5>
              <h2>{categoryCount.Ideas}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>🎯 Goals</h5>
              <h2>{categoryCount.Goals}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>🏋️ Fitness</h5>
              <h2>{categoryCount.Fitness}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>📌 Others</h5>
              <h2>{categoryCount.Others}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow p-4 mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;

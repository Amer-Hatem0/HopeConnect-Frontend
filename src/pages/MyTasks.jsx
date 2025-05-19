import { useEffect, useState } from "react";
import axios from "axios";
 import VolunteerNavbar from "../components/VolunteerNavbar";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const volunteerId = user?.id;

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/assigned/${volunteerId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (volunteerId) fetchMyTasks();
  }, [volunteerId]);

  const handleCancelTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/unassign/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to unassign task:", err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/complete/${taskId}`);
      setTasks(tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      ));
    } catch (err) {
      console.error("Failed to mark task as completed:", err);
    }
  };

  return (
    <>   <VolunteerNavbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Assigned Tasks</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">You have no assigned tasks.</p>
      ) : (
        <table className="w-full border border-gray-600">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Assigned At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100 text-black">
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2 capitalize">{task.status}</td>
                <td className="border px-4 py-2">
                  {task.created_at?.split("T")[0] || "N/A"}
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  {task.status !== "completed" && (
                    <>
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleCancelTask(task.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {task.status === "completed" && (
                    <span className="text-green-600 font-semibold">✔ Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div></>
  );
}

export default MyTasks;

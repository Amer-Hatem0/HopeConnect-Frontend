import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerNavbar from "../components/VolunteerNavbar";

function AvailableTasks() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const volunteerId = user?.id;

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks/available");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleVolunteer = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/assign/${taskId}`, {
        volunteerId,
      });
      fetchTasks(); // refresh available tasks
      alert("You have been assigned to the task!");
    } catch (err) {
      console.error("Error volunteering:", err);
      alert("Failed to assign task");
    }
  };

  return (
    <>   <VolunteerNavbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Tasks</h1>
      <table className="w-full border border-gray-600">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.created_at?.split("T")[0] || "N/A"}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleVolunteer(task.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Volunteer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
}

export default AvailableTasks;

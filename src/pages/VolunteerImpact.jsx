import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerNavbar from "../components/VolunteerNavbar";

function VolunteerImpact() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const volunteerId = user?.id;

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/assigned/${volunteerId}`);
        const completed = res.data.filter(task => task.status === "completed");
        setCompletedTasks(completed);
      } catch (err) {
        console.error("Failed to fetch completed tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (volunteerId) {
      fetchCompletedTasks();
    }
  }, [volunteerId]);

  const totalCompleted = completedTasks.length;

  return (
    <>   <VolunteerNavbar />
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Volunteer Impact</h1>

      {loading ? (
        <p className="text-center">Loading your impact...</p>
      ) : (
        <>
          <div className="bg-green-100 p-4 rounded mb-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-700">Impact Summary</h2>
            <p className="mt-2 text-lg">✅ You’ve completed <strong>{totalCompleted}</strong> task(s) successfully!</p>
          </div>

          {totalCompleted > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
              <table className="w-full border border-gray-400">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{task.title}</td>
                      <td className="border px-4 py-2">{task.description}</td>
                      <td className="border px-4 py-2">{task.created_at?.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div></>
  );
}

export default VolunteerImpact;

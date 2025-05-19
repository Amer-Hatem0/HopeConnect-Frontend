// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

// //       // Save all essential user data including id (donor_id or admin/volunteer id)
// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("user", JSON.stringify({
// //         id: res.data.id,
// //         name: res.data.name,
// //         role: res.data.role
// //       }));

      
// //   if (onLogin) onLogin();

// // if (res.data.role === "volunteer") {
// //   navigate("/VolunteerDashboard");
// // } else if (res.data.role === "admin") {
// //   navigate("/dashboard");
// // } else if (res.data.role === "orphan") {
// //   navigate("/OrphanDashboard");
// // } else {
// //   navigate("/user-home");
// // }


// // } catch (err) {
// //   setError("Invalid credentials");
// // }
// // };



// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

//     if (res.data.success) {
//       const token = res.data.token;
//       const user = res.data.user;

//       localStorage.setItem("token", token);

//       let fullUser = {
//         role: user.role,
//         email: user.email,
//         name: user.name,
//       };

//       // 👇 تحديد ID حسب الدور
//       if (user.role === "donor") {
//         const donorRes = await axios.get(`http://localhost:5000/api/donors/by-user/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         fullUser.id = donorRes.data.id;

//       } else if (user.role === "volunteer") {
//         const volRes = await axios.get(`http://localhost:5000/api/volunteers/by-user/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         fullUser.id = volRes.data.id;

//       } else if (user.role === "orphan") {
//         const orphanRes = await axios.get(`http://localhost:5000/api/orphans/by-user/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         fullUser.id = orphanRes.data.id;

//       } else {
//         // admin فقط
//         fullUser.id = user.id;
//       }

//       // 🧠 حفظ اليوزر في localStorage
//       localStorage.setItem("user", JSON.stringify(fullUser));

//       if (onLogin) onLogin();

//       // ✅ التوجيه حسب الدور
//       switch (fullUser.role) {
//         case "admin":
//           navigate("/Dashboard");
//           break;
//         case "donor":
//           navigate("/UserHome");
//           break;
//         case "volunteer":
//           navigate("/VolunteerDashboard");
//           break;
//         case "orphan":
//           navigate("/OrphanDashboard");
//           break;
//         default:
//           navigate("/");
//       }

//     } else {
//       setError(res.data.message || "Login failed");
//     }

//   } catch (err) {
//     console.error(err);
//     setError(err.response?.data?.message || "Login failed");
//   }
// };



//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-96 text-white">
//         <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
//         {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 rounded text-black"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 rounded text-black"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
//           Login
//         </button>
//         <p className="text-sm mt-4 text-center">
//           Don't have an account?{" "}
//           <a href="/register" className="text-purple-400 hover:underline">
//             Register
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
 

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // حفظ البيانات في localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onLogin) onLogin();

      // التوجيه حسب الدور
      switch (res.data.user.role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "donor":
          navigate("/user-home");
          break;
        case "volunteer":
          navigate("/VolunteerDashboard");
          break;
        case "orphan":
          navigate("/OrphanDashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
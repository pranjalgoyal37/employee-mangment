// hooks ->Hooks are built-in functions introduced in React 16.8 that allow functional components to use state, lifecycle methods, and other React features without writing class components.
// state -> state is js object to used to store dynamic data that can change over the time and affect the rendering the components
// useState -> A React hook to store and update the value
// useState[state,function]
// useNavigate hook is used to navigate between routes
// preventDefault -> stop the page from refreshing on from submit
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); // create the navigate instance
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/login", {
        email,
        password,
      });
      //   ⚠️ axios throws an error automatically when the response status code is not in the 200–299 range (like 401, 404, 500, etc.).
      const data = res.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      if (data.role == "admin") {
        console.log("admin");
        navigate("/dashboard/admin");
      } else console.log("User");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
        console.log("Invalid email or password");
      } else {
        setError("Network error or server error");
        console.log(error.message);
      }
    }
  }
  return (
    <>
      <main>
        <center>
          <form action="" className="flex flex-col items-center border p-10">
            <h2>Login</h2>
            <input
              type="email"
              name="username"
              placeholder="Username"
              className="border px-20 py-3 my-10"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border px-20 py-3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="border px-50 py-3 mt-10"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </center>
      </main>
    </>
  );
};

export default LoginPage;

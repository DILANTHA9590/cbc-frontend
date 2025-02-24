import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function Loginpage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: res.access_token,
        })

        .then((res) => {
          console.log("Backend response:", res.data);
          if (res.data.message == "User created") {
            toast.success(
              "Your account is created now you can login via google",
              console.log(res.data)
            );
          } else {
            localStorage.setItem("token", res.data.token);

            if (res.data.user.type == "admin") {
              window.location.href = "/admin";
              console.log("User type:", res.data.user.type);
            } else {
              window.location.href = "/products";
              console.log("User type:", res.data.user.type);
            }
          }
        });
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [value, Setvalue] = useState();

  function login() {
    axios

      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email, //uda thiyena email
        password: password,
      })
      .then((res) => {
        console.log(res);

        if (res.data.user == null) {
          Setvalue(res.data.message);

          toast.error(res.data.message);

          return;
        }

        toast.success(res.data.message);

        localStorage.setItem("token", res.data.token);

        if (res.data.user.type == "admin") {
          // type eka admin nam admin page ekata yavanava
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>
        <p className="text-center text-gray-600">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

        {/* Social Login Buttons */}
        <div className="mt-6">
          <button
            className="flex items-center justify-center w-full p-3 mb-3 border rounded-lg"
            onClick={() => googleLogin()}
          >
            <FcGoogle />
            Sign in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-500">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          className="w-full p-3 text-white transition bg-black rounded-lg hover:bg-gray-800"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setuser] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setuser(res.data);
      });
  }, []);

  console.log(user.type);

  function clickSignUpButton() {
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    }

    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    if (!confirmPassword.trim()) {
      toast.error("Please enter your confirm password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Your confirmation password doesn’t match. Please enter the same password."
      );
      return;
    }

    let type = "customer";
    console.log("defaulttype", type);

    if (user) {
      type = user.type;
      console.log("user type", type);
    }

    console.log("replacetype", type);
    const userData = {
      firstName,
      lastName,
      email,
      password,
      type: type,
    };

    toast.promise(
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Creating user...",
        success: (res) => res.data.message || "User created successfully!",
        error: (error) =>
          error.response?.data?.message ||
          "An error occurred while creating the user.",
      }
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="first Name"
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Last Name"
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={clickSignUpButton}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

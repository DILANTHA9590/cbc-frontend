import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUpUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
    //i set this default type is customer
    let type = "customer";
    console.log("defaulttype", type);

    //check state veribale
    //it help full for if  user is admin and set type admin
    // Then the admin account is created.

    //  user is customer and set type customer
    // Then the customer account is created.

    //if user state is null set type cutomer

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

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Account created successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Error");
      });
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

import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedmiaToSupaBase from "../utils/mediaUpload";
import axios from "axios";

export default function CustomerEditPage() {
  const navigate = useNavigate();
  const customer = useLocation().state.customer;

  console.log(location.email);

  const [email, setEmail] = useState(customer.email);
  const [password, setPassword] = useState(customer.password);
  const [confirmPassword, setConfirmPassword] = useState(customer.password);
  console.log("hashone", password);

  const [firstName, setFirstName] = useState(customer.firstName);
  const [LastName, setLastName] = useState(customer.lastName);
  const [profilePic, setProfilePic] = useState();

  console.log("fuckj;lj;", profilePic);

  // console.log("dddd", LastName);

  async function clickUpdateBtn() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First");
      return;
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toast.error("Passwords are different. Please re-enter");
      return;
    }

    let imgUrl = customer.profilePic;
    console.log("old image", customer.profilePic);

    try {
      if (profilePic) {
        const newImagUrl = await uploadMedmiaToSupaBase(profilePic);
        console.log("ss", newImagUrl);
        imgUrl = newImagUrl;
      }
    } catch (error) {
      console.log(error);
    }

    const updateUserData = {
      email: email,

      firstName: firstName,
      lastName: LastName,
      profilePic: imgUrl,
    };

    if (password !== customer.password) {
      updateUserData.password = password;
    }
    console.log("buttonClick", imgUrl);
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + customer.email,
        updateUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
        toast.success("User updated successfully!");
        // alert("User updated successfully!");
        navigate("/login");
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        toast.error("Failed to update user!");
      });
  }

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg sm:h-[75vh] h-full ">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            disabled
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 text-gray-500 bg-gray-100 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue- 300"
          />
        </div>

        <button
          onClick={clickUpdateBtn}
          className="w-full px-4 py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update User
        </button>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export function CustomerHomePage() {
  const [customer, setCustomer] = useState({});

  const [loaded, setLoaded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to view your details");
      return;
    }
    if (loaded != false) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // setLoaded();
          setCustomer(res.data);

          setLoaded(true);
        })
        .catch((error) => {
          toast.error("Eroor");
        });
    }
  }, []);

  const clickEditBtn = () => {
    navigate("/customereditaccount", {
      state: { customer },
    });
  };
  return (
    <>
      <div className="max-w-4xl p-8 mx-auto space-y-8 bg-white rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-900">
          Your Profile
        </h1>

        <div className="flex justify-center mb-8">
          <img
            className="w-32 h-32 border-4 border-blue-500 rounded-full shadow-lg"
            src={customer.profilePic}
            alt="User Profile"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 mt-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={customer.email || ""}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-3 mt-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={customer.firstName || ""}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-3 mt-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={customer.lastName || ""}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 mt-2 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={"******"}
              readOnly
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="w-full px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:w-auto hover:bg-blue-700"
            onClick={clickEditBtn}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

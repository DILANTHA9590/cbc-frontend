import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function AdminCustomerPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false); // Corrected the typo here

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to view users.");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/getusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
        setLoaded(true); // Set loaded to true once data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoaded(true); // Ensure loading state is set to true even if there's an error
      });
  }, []);

  if (!loaded) {
    return <div>Loading...</div>; // Display a loading message while data is fetching
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Is Blocked</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.isBlock ? "Blocked" : "Active"}</td>{" "}
              {/* Render blocked status */}
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.password}</td>{" "}
              {/* Ensure password is not exposed or handle securely */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

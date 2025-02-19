import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { MdDelete } from "react-icons/md";

export function AdminCustomerPage() {
  const [users, setUsers] = useState([]);

  const [loaded, setLoaded] = useState(false);

  let index = 0;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/getusers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data.users);
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          setLoaded(true);
        });
    }
  }, [loaded]);

  // Function to block/unblock a user
  const updateUserStatus = (userId, newStatus) => {
    const token = localStorage.getItem("token");

    const isblock = {
      isblock: newStatus,
    };

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + `/api/users/updateStatus/${userId}`,
        isblock,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        //me kotasa react state management vala enne me kotasa igena gnna oni mama me mata miss vechacha part ekk
        // methandi / venne  ape me state eka e kiyanne meka dan vada karanne  button eka ebuvamane
        // e button eka  ebuvama api ekata ape setUsers ge parana object eka denava eka apta react state mane ment valin ena deyak
        // ita psse  api setuserge parana object eke thiyena is block eka updtae karanava
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlock: newStatus } : user
          )
        );
        toast.success(
          `User ${newStatus ? "Blocked" : "Unblocked"} successfully`
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update status.");
      });
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-[100vh]  overflow-hidden overflow-y-scroll  ">
        <h1 className="mb-4 text-xl font-bold">Customer Page</h1>
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">count</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">First Name</th>
              <th className="p-2 border border-gray-300">Last Name</th>
              <th className="p-2 border border-gray-300">type</th>
              <th className="p-2 border border-gray-300">Actions</th>
              <th className="p-2 border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border border-gray-300">{(index += 1)}</td>

                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">
                  {user.isBlock ? "Blocked" : "Active"}
                </td>
                <td className="p-2 border border-gray-300">{user.firstName}</td>
                <td className="p-2 border border-gray-300">{user.lastName}</td>
                <td className="p-2 border border-gray-300">{user.type}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    //methana karala thiyenne  ape user is block false kiyala balanava false nam true karanava true nam flase vidihata ape function ekata e adla userge id ekai e usege e velave thiye
                    // isBlock status ekai pass karagannav

                    onClick={() => updateUserStatus(user._id, !user.isBlock)}
                    className={`px-3 py-1 rounded ${
                      user.isBlock
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                </td>

                <td className="p-2 border border-gray-300">
                  <button
                    onClick={() => {
                      let istrue = confirm(
                        `You trying to delete  ${user.email}`
                      );

                      const token = localStorage.getItem("token");
                      if (istrue) {
                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL +
                              "/api/users/" +
                              user._id,
                            {
                              headers: {
                                headers: {
                                  Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                                },
                              },
                            }
                          )
                          .then((res) => {
                            toast.success(res.data.message);
                            setLoaded(false);
                          })
                          .catch(() => {
                            toast.error("Failed to delete user");
                          });
                      }
                    }}
                  >
                    <MdDelete className="w-5 h-5 text-[#96171f]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

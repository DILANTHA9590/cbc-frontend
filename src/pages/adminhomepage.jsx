import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BsGraphUp, BsBox, BsCardChecklist, BsPeople } from "react-icons/bs";
import AdminProductsPage from "./admin/adminproductspage";
import AddproductForm from "./admin/addProductform";
import EditProducts from "./admin/editProductform";
import EditProducttForm from "./admin/editProductform";
import MyOrderPage from "./home/order";
import AdminOrderPage from "./admin/adminOrderpage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AdminCustomerPage } from "./admin/adminCustomer";
import AdminDashboard from "./admin/adminDashBord";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function AdminPage() {
  const navigate = useNavigate();

  const [user, setuser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.type != "admin") {
          toast.error("Unauthorized access");
          navigate("/login");
        } else {
          setuser(res.data);
        }
      })
      .catch(() => {
        console.error(err);
        toast.error("Failed to fetch user data");
        navigate("/login");
      });
  }, []);

  function logOut() {
    window.location.href = "/products";
    localStorage.removeItem("token");
    // Redirect to products page after logout
  }

  return (
    <>
      {/* Full-width container with flex layout */}
      <div className="flex w-full h-screen bg-slate-700">
        {/* Sidebar */}
        <div className="w-[20%] h-screen bg-blue-800 flex flex-col items-center text-white">
          {/* Dashboard Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/dashboard"
          >
            <BsGraphUp />
            Dashboard
          </Link>
          {/* Products Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/products"
          >
            <BsBox />
            Products
          </Link>
          {/* Orders Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/orders"
          >
            <BsCardChecklist />
            Orders
          </Link>
          {/* Customers Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/customers"
          >
            <BsPeople />
            Customers
          </Link>

          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/signup"
          >
            <BsPeople />
            Create Admin Account
          </Link>

          <button
            className="flex items-center justify-start w-full gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:scale-95"
            onClick={logOut}
          >
            <RiLogoutCircleLine className="text-xl" />
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="w-[80%] h-screen bg-blue-400">
          {user != null && (
            <Routes path="/*">
              <Route path="/dashboard" element={<AdminDashboard />} />

              <Route path="/products" element={<AdminProductsPage />} />

              <Route
                path="/products/addProducts"
                element={<AddproductForm />}
              />

              <Route
                path="/products/editProducts"
                element={<EditProducttForm />}
              />
              <Route path="/orders" element={<AdminOrderPage />} />
              <Route path="/customers" element={<AdminCustomerPage />} />
              {/* <Route path="/*" element={<h1>404 Not Found Page</h1>} /> */}
            </Routes>
          )}

          {user == null && (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

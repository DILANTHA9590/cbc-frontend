import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState({ adminCount: 0, customerCount: 0 });
  const [product, setProductcount] = useState(0);
  const [order, setorderCount] = useState(0);
  console.log(users);
  console.log("product", product.products);
  console.log("order", order);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("please login first");

      return;
    }

    const userCountURL =
      import.meta.env.VITE_BACKEND_URL + "/api/users/usercount";
    const ordersURL =
      import.meta.env.VITE_BACKEND_URL + "/api/orders/ordercount";
    const productUrl =
      import.meta.env.VITE_BACKEND_URL + "/api/products/productcount";

    Promise.all([
      // axios.get(userCountURL, { headers: { Authorization: `Bearer ${token}` } }),

      axios.get(userCountURL),
      axios.get(ordersURL),
      axios.get(productUrl),
    ])
      .then(([userRes, ordersRes, productsRes]) => {
        setUsers(userRes.data); // user count data update කිරීම
        // ඔබට වෙනම state variables එක set කරන්න orders, reviews, products සඳහා
        setorderCount(ordersRes.data);
        // setReviews(reviewsRes.data);
        setProductcount(productsRes.data);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-500">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Admins Card */}
          <div className="p-6 text-center transition duration-300 transform bg-orange-400 rounded-lg shadow-lg hover:scale-105">
            <h1 className="text-2xl font-bold text-white">Total Admins</h1>
            <p className="mt-4 text-4xl font-semibold text-white">
              {users.adminCount}
            </p>
          </div>

          {/* Registered Customers Card */}
          <div className="p-6 text-center transition duration-300 transform bg-blue-400 rounded-lg shadow-lg hover:scale-105">
            <h1 className="text-2xl font-bold text-white">
              Registered Customers
            </h1>
            <p className="mt-4 text-4xl font-semibold text-white">
              {users.customerCount}
            </p>
          </div>

          {/* Total Orders Card */}
          <div className="p-6 text-center transition duration-300 transform bg-green-400 rounded-lg shadow-lg hover:scale-105">
            <h1 className="text-2xl font-bold text-white">Total Orders</h1>
            <p className="mt-4 text-4xl font-semibold text-white">
              {order.ordercount}
            </p>
          </div>

          {/* Available Products Card */}
          <div className="p-6 text-center transition duration-300 transform bg-purple-400 rounded-lg shadow-lg hover:scale-105">
            <h1 className="text-2xl font-bold text-white">
              Available Products
            </h1>
            <p className="mt-4 text-4xl font-semibold text-white">
              {product.products}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

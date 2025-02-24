import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCart";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;

  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      navigate("/Cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeldTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order details");
        console.error(err);
      });
  }, [cart, navigate]);

  function handleCheckout() {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order");
      return;
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        {
          orderedItems: cart,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Order placed successfully");
        // navigate("/order-success", { state: { orderId: res.data.orderId } });
        navigate("/order");
      })
      .catch((err) => {
        toast.error("Failed to place order");
        console.error(err);
      });
  }

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full p-4 mx-auto lg:max-w-5xl">
        {/* ✅ Scrollable Content Wrapper */}
        <div className="flex flex-col w-full h-full p-6 overflow-y-auto bg-white rounded-lg shadow-md lg:p-8">
          {/* ✅ Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-collapse border-gray-300 table-fixed">
              <thead className="sticky top-0 bg-gray-100 shadow-md">
                <tr>
                  <th className="p-3 border">Product Image</th>
                  <th className="p-3 border">Product Name</th>
                  <th className="hidden p-3 border sm:table-cell">
                    Product ID
                  </th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <CartCard key={item.productId} {...item} />
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ User Input Form (Grid for large screens) */}
          <div className="p-4 mt-4 rounded-md shadow-sm bg-gray-50">
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Customer Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-lg font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-medium text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ✅ Order Summary Section (Larger Font for Big Screens) */}
          <div className="flex flex-col items-end p-4 mt-4 text-lg border-t sm:text-xl">
            <h1 className="font-bold text-gray-700">
              Total: LKR{" "}
              <span className="text-gray-900">{labeledTotal.toFixed(2)}</span>
            </h1>
            <h1 className="font-bold text-gray-700">
              Discount: LKR{" "}
              <span className="text-green-500">
                {(labeledTotal - total).toFixed(2)}
              </span>
            </h1>
            <h1 className="text-2xl font-bold text-gray-700">
              Grand Total:{" "}
              <span className="text-red-500">LKR {total.toFixed(2)}</span>
            </h1>

            {/* ✅ Checkout Button */}
            <button
              className="w-full p-3 mt-3 font-semibold text-white transition-all duration-300 bg-orange-500 rounded-lg sm:w-[300px] hover:bg-orange-400"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

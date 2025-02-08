import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  useEffect(() => {
    // Fetch the user's orders using their token
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to view your orders.");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch orders. Please try again.");
      });
  }, []);

  const calculateTotalBill = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
      {orders.length > 0 ? (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Order ID</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="text-center cursor-pointer hover:bg-gray-200"
                onClick={() => handleRowClick(order)}
              >
                <td className="p-2 border border-gray-300">{order.orderId}</td>
                <td className="p-2 capitalize border border-gray-300">
                  {order.status}
                </td>
                <td className="p-2 border border-gray-300">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300">
                  LKR{calculateTotalBill(order.orderedItems).toFixed(2)}
                </td>
                {order.reviews == "Delivered" && <td>{order.reviews}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-3/4 p-4 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Name:</strong> {selectedOrder.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Notes:</strong> {selectedOrder.notes || "None"}
            </p>
            <h3 className="mt-4 text-lg font-semibold">Ordered Items</h3>
            <table className="w-full mt-2 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Price</th>
                  <th className="p-2 border border-gray-300">Quantity</th>
                  <th className="p-2 border border-gray-300">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="p-2 border border-gray-300">
                      LKR{parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.quantity}
                    </td>
                    <td className="p-2 border border-gray-300">
                      LKR{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

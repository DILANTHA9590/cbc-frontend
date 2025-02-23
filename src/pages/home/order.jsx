import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textArea, setTextArea] = useState({}); // Separate state for reviews

  console.log("Orders:", orders);

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

  const handleReviewChange = (itemId, value) => {
    setTextArea((prev) => ({
      ...prev,
      [itemId]: value, // Store the review for each item based on itemId
    }));
  };

  const handleReviewSubmit = (itemId) => {
    // Get the review for the specific item
    const reviewText = textArea[itemId];

    if (!reviewText) {
      toast.error("Please enter a review.");
      return;
    }

    // Axios call to update the review on the backend
    const reviewData = {
      reviwes: reviewText,
    };

    // import.meta.env.VITE_BACKEND_URL + "/api/users/" + customer.email,
    //   updateUserData,
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + `/api/products/reviwes/${itemId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        toast.success("Review submitted successfully!");
        console.log(response.data); // Handle the response as needed
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to submit review. Please try again.");
        console.error(error);
      });
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full p-4 bg-black bg-opacity-50">
          {/* ✅ Modal Wrapper with Full Height & Scrollbar */}
          <div className="w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {/* ✅ Scrollable Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* ✅ Centered Title */}
              <h2 className="mb-4 text-xl font-bold text-center text-gray-800">
                Order Details
              </h2>

              {/* ✅ Order Info */}
              <div className="space-y-2 text-gray-700">
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
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Ordered Items
              </h3>

              {/* ✅ Table Wrapper with Scrollable X-Axis */}
              <div className="w-full overflow-x-auto">
                <table className="w-full mt-2 border border-collapse border-gray-300">
                  <thead>
                    <tr className="text-gray-700 bg-gray-100">
                      <th className="p-3 text-left border border-gray-300">
                        Name
                      </th>
                      <th className="p-3 text-left border border-gray-300">
                        Image
                      </th>
                      <th className="p-3 text-left border border-gray-300">
                        Price
                      </th>
                      <th className="p-3 text-left border border-gray-300">
                        Quantity
                      </th>
                      <th className="p-3 text-left border border-gray-300">
                        Total
                      </th>
                      <th className="p-3 text-left border border-gray-300">
                        Reviews
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderedItems.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3 border border-gray-300">
                          {item.name}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <img
                            src={item.image}
                            alt=""
                            className="object-cover w-20 h-12 mx-auto rounded-md"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          LKR {parseFloat(item.price).toFixed(2)}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {item.quantity}
                        </td>
                        <td className="p-3 border border-gray-300">
                          LKR{" "}
                          {(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-3 border border-gray-300 w-[250px]">
                          {selectedOrder.status === "delivered" ? (
                            <div className="relative p-2 border border-gray-300 rounded-md bg-gray-50">
                              {/* ✅ Fixed Review Box on Mobile */}
                              <textarea
                                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={textArea[item.productId] || ""}
                                onChange={(e) =>
                                  handleReviewChange(
                                    item.productId,
                                    e.target.value
                                  )
                                }
                                rows="3"
                              />
                              <button
                                className="w-full px-3 py-1 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                onClick={() =>
                                  handleReviewSubmit(item.productId)
                                }
                              >
                                Submit Review
                              </button>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Review option will be available after delivery.
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>{" "}
            {/* ✅ End of Scrollable Content */}
            {/* ✅ Close Button (Stays at Bottom) */}
            <div className="flex justify-end p-4 border-t border-gray-300 bg-gray-50">
              <button
                className="px-5 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
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

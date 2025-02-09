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
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-3/4 p bg-white h-[80vh] rounded-lg overflow-hidden overflow-y-auto">
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

            <h3 className="mt-4 text-lg font-semibold">Ordered Items</h3>
            <table className="w-full mt-2 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300">Name</th>

                  <th className="p-2 border border-gray-300">Image</th>

                  <th className="p-2 border border-gray-300">Price</th>
                  <th className="p-2 border border-gray-300">Quantity</th>
                  <th className="p-2 border border-gray-300">Total</th>
                  <th className="p-2 border border-gray-300">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="h-auto p-2 border border-gray-300">
                      <center>
                        <img
                          src={item.image}
                          alt=""
                          className="w-[200px] h-[100px]"
                        />
                      </center>
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.productId}
                    </td>
                    <td className="p-2 border border-gray-300">
                      LKR{parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {item.quantity}
                    </td>
                    <td className="p-2 border border-gray-300">
                      LKR{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="w-[200px]">
                      {selectedOrder.status === "delivered" ? (
                        <div className="relative p-2 border border-gray-300">
                          <textarea
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={textArea[item.productId] || ""} // Get review for the specific item
                            onChange={(e) =>
                              handleReviewChange(item.productId, e.target.value)
                            }
                            rows="5"
                          />
                          <center>
                            <button
                              className="px-1 bg-green-500 rounded-sm hover:bg-green-600"
                              onClick={() => handleReviewSubmit(item.productId)}
                            >
                              Submit Review
                            </button>
                          </center>
                        </div>
                      ) : (
                        <p>Review option will be available after delivery.</p>
                      )}
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

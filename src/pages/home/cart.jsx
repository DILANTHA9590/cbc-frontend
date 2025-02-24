import { useEffect, useState } from "react";
import { clearCart, loardCard } from "../../utils/cartfunction";
import CartCard from "../../components/cartCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GiToken } from "react-icons/gi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(loardCard());

    const token = localStorage.getItem("token");

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: loardCard(),
      })
      .then((res) => {
        setTotal(res.data);
        console.log("MY RESPONSE", res.data);

        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeldTotal);
        }
      });
  }, []);

  function clearmyCart() {
    clearCart();

    window.location.reload();
  }

  function onOrderCheckoutClick() {
    //  karaganna puluvan
    navigate("/shipping", {
      state: {
        items: loardCard(),
      },
    });
  }

  return (
    <>
      {cart.length > 0 && (
        <button
          className="px-3 ml-2 bg-green-400 rounded-lg"
          onClick={clearmyCart}
        >
          Clear Cart
        </button>
      )}
      {cart && cart.length > 0 ? (
        <div className="flex flex-col w-full h-full overflow-y-scroll ">
          <table className="w-full ">
            <th>Product Image</th>
            <th>Product Name</th>
            <th className="hidden sm:block">Product Id</th>
            <th>Product qty</th>
            <th>Product Price</th>
            <th>Total</th>

            <td className="text-center"></td>
            {cart.map((item) => {
              return (
                <CartCard
                  key={item.productId}
                  productId={item.productId}
                  qty={item.qty}
                />
              );
            })}
          </table>
          <div className="flex flex-col items-end justify-center p-1 text-xl sm:text-3xl">
            <h1 className="font-bold text-accent">
              Total: LKR. {labeledTotal.toFixed(2)}
            </h1>
            <h1 className="font-bold text-accent">
              Discount: LKR. {(labeledTotal - total).toFixed(2)}
            </h1>
            <h1 className="font-bold text-accent">
              Grand Total: LKR. {total.toFixed(2)}
            </h1>
            <button
              onClick={onOrderCheckoutClick}
              className="bg-orange-500 sm:w-[300px] max-w p-2 rounded mt-2 hover:bg-orange-400
        "
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-2xl text-gray-500">
          No products added
        </div>
      )}
    </>
  );
}

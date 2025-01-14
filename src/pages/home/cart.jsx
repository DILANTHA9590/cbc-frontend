import { useEffect, useState } from "react";
import { loardCard } from "../../utils/cartfunction";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(loardCard());
  });

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
      {cart.map((item) => {
        return (
          <span>
            {item.productId} X {item.qty}
          </span>
        );
      })}
    </div>
  );
}

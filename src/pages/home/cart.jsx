import { useEffect, useState } from "react";
import { loardCard } from "../../utils/cartfunction";

export default function Cart() {
  const [cart, setCart] = (useState = []);
  useEffect(() => {
    SlCreditCard(loardCard());
  });
  return (
    <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
      <h1>Cart Page</h1>
    </div>
  );
}

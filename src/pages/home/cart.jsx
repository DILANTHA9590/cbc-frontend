import { useEffect, useState } from "react";
import { loardCard } from "../../utils/cartfunction";
import CartCard from "../../components/cartCart";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCart(loardCard());
    // console.log(loardCard()); //loard card eka details hariyata avda balaganna puluavn
    //meka hadanne api dan ape checkout karanna onine ethakota apita total price vghe deval ganna
    // oni eka ganna axios call ekk gahanava backend ekata methani api back eke
    // dala thiyenne gety quates kiyala func ekk hadla thiye ekedi apta add cart
    //karapu evage details okkoma enava ethanata
    // thama axios  eka gahala totoal values ganna yannae

    // ethakota  api api req eke denna oni api danatamath add cart karala thiyena item vala visthtara tika
    // e tika api gannava e tika api save karala thiyenne local storage eke uda set loard card kiyala set
    // karan thiyenneth e tika api ethakota e function eka api pass karana ava api eke for loop eka
    //ordered Oteme kata ethakota eya e adala item vala prices okkoma ekathu karala api total
    // price eka denava
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        //api get eka post ekkata maru kara
        // mokda data emty giye ehema unu get req valin godak loku data get valin yavann aba post valin

        //yavanna bari gathiyak thiyenava e nisa loku req ekk yanavane metha pcard eke e nisa post dagaththama loku data yavanmna puluavn
        orderedItems: loardCard(),
      })
      .then((res) => {
        setTotal(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col ">
      <table className="w-full ">
        <th>Product Image</th>
        <th>Product Name</th>
        <th>Product Id</th>
        <th>Product qty</th>
        <th>Product Price</th>
        <th>ToTal</th>

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
      <div className="flex justify-end ">
        {/* //dan me btn eka click karanama order eka plce venn ahadmu */}
        <button
          className="bg-orange-500 w-[300px] p-2 rounded mt-2 hover:bg-orange-400
        "
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

// return (
//   <div className="w-full h-full overflow-y-scroll flex flex-col  items-center">
//     {cart.map((item) => {
//       return (
//         <span className="borde">
//           {item.productId} X {item.qty}
//         </span>
//       );
//     })}
//   </div>
// );
// } meka ain karala props vidihata card hadagannava

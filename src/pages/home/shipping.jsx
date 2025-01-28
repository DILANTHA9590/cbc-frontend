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
        navigate("/orders");
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
      <div className="w-full h-full p-4">
        <div className="flex flex-col w-full h-full overflow-y-scroll ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th className="hidden sm:table-cell">Product Id</th>
                <th>Product Qty</th>
                <th>Product Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartCard
                  key={item.productId}
                  productId={item.productId}
                  qty={item.qty}
                />
              ))}
            </tbody>
          </table>

          <div className="p-4">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-medium">Name</label>
              <input
                type="text"
                className="p-2 border rounded"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="text-lg font-medium">Address</label>
              <input
                type="text"
                className="p-2 border rounded"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label className="text-lg font-medium">Phone</label>
              <input
                type="text"
                className="p-2 border rounded"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-end justify-center p-4 text-xl sm:text-3xl">
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
                className="bg-orange-500 sm:w-[300px] max-w p-2 rounded mt-2 hover:bg-orange-400 text-white"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import { useLocation, useNavigate } from "react-router-dom";
// import CartCard from "../../components/cartCart";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// export default function ShippingPage() {
//   //apata meken hambenne podi json ekk

//   const location = useLocation();
//   const cart = location.state.items;
//   console.log(cart);
//   // apata  use location ekan json eke visthrayk ganna puluavn print karala
//   // console.log(location.state);

//   //apata meken hambenne podi json ekk

//   const navigate = useNavigate();

//   //api meken
//   console.log("kjhgjk", cart);
//   const [total, setTotal] = useState(0);
//   const [labeledTotal, setLabeledTotal] = useState(0);

//   useEffect(() => {
//     // console.log(loardCard()); //loard card eka details hariyata avda balaganna puluavn
//     //meka hadanne api dan ape checkout karanna onine ethakota apita total price vghe deval ganna
//     // oni eka ganna axios call ekk gahanava backend ekata methani api back eke
//     // dala thiyenne gety quates kiyala func ekk hadla thiye ekedi apta add cart
//     //karapu evage details okkoma enava ethanata
//     // thama axios  eka gahala totoal values ganna yannae

//     // ethakota  api api req eke denna oni api danatamath add cart karala thiyena item vala visthtara tika
//     // e tika api gannava e tika api save karala thiyenne local storage eke uda set loard card kiyala set
//     // karan thiyenneth e tika api ethakota e function eka api pass karana ava api eke for loop eka
//     //ordered Oteme kata ethakota eya e adala item vala prices okkoma ekathu karala api total
//     // price eka denava
//     axios
//       .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
//         //api get eka post ekkata maru kara
//         // mokda data emty giye ehema unu get req valin godak loku data get valin yavann aba post valin

//         //yavanna bari gathiyak thiyenava e nisa loku req ekk yanavane metha pcard eke e nisa post dagaththama loku data yavanmna puluavn
//         orderedItems: cart,
//       })
//       .then((res) => {
//         setTotal(res.data);
//         console.log(res.data);
//         // api methanadi kare product eka null naththam vitharak toaotal ekai label totola keai set karanna kiyala
//         //ethakota ape code eka ekapara godak nikan riuun vena eka aduvenava
//         if (res.data.total != null) {
//           setTotal(res.data.total);
//           setLabeledTotal(res.data.labeldTotal);
//         }
//       });
//   }, []);

//   //api methana ahdanne check out eka ebuvama order ekk create venna

//   function createOreder() {
//     // dana  api checkout ebuivama ordser eka create karaganna hdanne checkput eka ebuvama methanin balanava
//     //cus token eka null da kiyala
//     // nul num navththana run vena eka bul naththam
//     //apata userge order eka create karanava cart eken checkout karapu ordered item saha userge datath ekka
//     const token = localStorage.getItem("token");
//     if (token == null) {
//       return;
//     }
//     axios
//       .post(
//         import.meta.env.VITE_BACKEND_URL + "/api/orders",
//         {
//           // meke order database eke ordeid emails me tika backend ekenma api hada[pu eken assign assign venava
//           //methanin api  orderitesms  tika yavana va e vagema api name phoneno saha adress dala yanna hdala thiyenne e nisa
//           // thavakalikava methnanin dala ynnava  e tika danata
//           orderedItems: cart, //me yavanne ape cart eke save vela thiyena orderd items tika
//           name: "dilantha",
//           address: "ampara",
//           phone: "ffffff",
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//       });
//   }

//   // apata  use location ekan json eke visthrayk ganna puluavn print karala
//   // console.log(location.state);

//   // dan  api  useloaction eke thiyena badu tika gannava vble ekketa
//   //methna thiyenne api checkout karaganna yna badu laisthuva
//   // eva api send karala thiyennestate eke item vidihata ethanin api cart eken checkout karana badu tika

//   //i//ita appse api cart eka null da balanava
//   if (cart == null) {
//     toast.error("Cart is emty");
//     //cart eka emty nam api cart page ekata navigate venmna danava
//     navigate("/Cart");
//   }

//   return (
//     <>
//       <div className="w-full h-full">
//         <div className="flex flex-col w-full h-full overflow-y-scroll ">
//           <table className="w-full ">
//             <th>Product Image</th>
//             <th>Product Name</th>
//             <th className="hidden sm:block">Product Id</th>
//             <th>Product qty</th>
//             <th>Product Price</th>
//             <th>Total</th>

//             <td className="text-center"></td>
//             {cart.map((item) => {
//               return (
//                 <CartCard
//                   key={item.productId}
//                   productId={item.productId}
//                   qty={item.qty}
//                 />
//               );
//             })}
//           </table>
//           <div className="flex flex-col items-end justify-center p-1 text-xl sm:text-3xl">
//             <h1 className="font-bold text-accent">
//               Total: LKR. {labeledTotal}
//             </h1>
//             <h1 className="font-bold text-accent">
//               Discount: LKR. {labeledTotal - total}
//             </h1>
//             <h1 className="font-bold text-accent">Grand Total: LKR. {total}</h1>
//             <button
//               className="bg-orange-500 sm:w-[300px] max-w p-2 rounded mt-2 hover:bg-orange-400
//                 "
//               onClick={createOreder}
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // import { useLocation, useNavigate } from "react-router-dom";
// // import CartCard from "../../components/cartCart";
// // import toast from "react-hot-toast";
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function ShippingPage() {
// //   //apata meken hambenne podi json ekk
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const cart = location.state.items;
// //   //api meken
// //   console.log("kjhgjk", cart);
// //   const [total, setTotal] = useState(0);
// //   const [labeledTotal, setLabeledTotal] = useState(0);

// //   useEffect(() => {
// //     // console.log(loardCard()); //loard card eka details hariyata avda balaganna puluavn
// //     //meka hadanne api dan ape checkout karanna onine ethakota apita total price vghe deval ganna
// //     // oni eka ganna axios call ekk gahanava backend ekata methani api back eke
// //     // dala thiyenne gety quates kiyala func ekk hadla thiye ekedi apta add cart
// //     //karapu evage details okkoma enava ethanata
// //     // thama axios  eka gahala totoal values ganna yannae

// //     // ethakota  api api req eke denna oni api danatamath add cart karala thiyena item vala visthtara tika
// //     // e tika api gannava e tika api save karala thiyenne local storage eke uda set loard card kiyala set
// //     // karan thiyenneth e tika api ethakota e function eka api pass karana ava api eke for loop eka
// //     //ordered Oteme kata ethakota eya e adala item vala prices okkoma ekathu karala api total
// //     // price eka denava
// //     axios
// //       .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
// //         //api get eka post ekkata maru kara
// //         // mokda data emty giye ehema unu get req valin godak loku data get valin yavann aba post valin

// //         //yavanna bari gathiyak thiyenava e nisa loku req ekk yanavane metha pcard eke e nisa post dagaththama loku data yavanmna puluavn
// //         orderedItems: cart,
// //       })
// //       .then((res) => {
// //         setTotal(res.data);
// //         console.log(res.data);
// //         // api methanadi kare product eka null naththam vitharak toaotal ekai label totola keai set karanna kiyala
// //         //ethakota ape code eka ekapara godak nikan riuun vena eka aduvenava
// //         if (res.data.total != null) {
// //           setTotal(res.data.total);
// //           setLabeledTotal(res.data.labeldTotal);
// //         }
// //       });
// //   }, []);

// // // apata  use location ekan json eke visthrayk ganna puluavn print karala
// // // console.log(location.state);

// // // dan  api  useloaction eke thiyena badu tika gannava vble ekketa
// // //methna thiyenne api checkout karaganna yna badu laisthuva
// // // eva api send karala thiyennestate eke item vidihata ethanin api cart eken checkout karana badu tika

// // //i//ita appse api cart eka null da balanava
// // if (cart == null) {
// //   toast.error("Cart is emty");
// //   //cart eka emty nam api cart page ekata navigate venmna danava
// //   navigate("/Cart");
// // }

// //   return (
// // //     <>
// //       <div className="w-full h-full">
// //         <div className="flex flex-col w-full h-full overflow-y-scroll ">
// //           <table className="w-full ">
// //             <th>Product Image</th>
// //             <th>Product Name</th>
// //             <th className="hidden sm:block">Product Id</th>
// //             <th>Product qty</th>
// //             <th>Product Price</th>
// //             <th>Total</th>

// //             <td className="text-center"></td>
// //             {cart.map((item) => {
// //               return (
// //                 <CartCard
// //                   key={item.productId}
// //                   productId={item.productId}
// //                   qty={item.qty}
// //                 />
// //               );
// //             })}
// //           </table>
// //           <div className="flex flex-col items-end justify-center p-1 text-xl sm:text-3xl">
// //             <h1 className="font-bold text-accent">
// //               Total: LKR. {labeledTotal}
// //             </h1>
// //             <h1 className="font-bold text-accent">
// //               Discount: LKR. {labeledTotal - total}
// //             </h1>
// //             <h1 className="font-bold text-accent">Grand Total: LKR. {total}</h1>
// //             <button
// //               className="bg-orange-500 sm:w-[300px] max-w p-2 rounded mt-2 hover:bg-orange-400
// //                 "
// //             >
// //               Checkout
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// // //     </>
// // //   );
// // }

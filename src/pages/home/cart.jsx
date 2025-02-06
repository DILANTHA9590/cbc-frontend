import { useEffect, useState } from "react";
import { loardCard } from "../../utils/cartfunction";
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

    const token = localStorage.getItem("token");

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
        // api methanadi kare product eka null naththam vitharak toaotal ekai label totola keai set karanna kiyala
        //ethakota ape code eka ekapara godak nikan riuun vena eka aduvenava
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeldTotal);
        }
      });
  }, []);

  //meka hadala thiyenne checkout btn eka ebuvama venna oni de e tika order db ekatra yanva e api
  ///order karapau item valatamorderid ekk create karala e ti order db eke save venava//ketiyemma kiuvoth order list eka api yavanava
  //  order db ekata ethakota eya e yavana ekata order id ekk creqtate karan db ekes ave venava

  function onOrderCheckoutClick() {
    // dan  api kalin methana check out venna dummy vidihata hdagaththe ehema hariyanne na check out ebuvama  venama page ekkin
    // check out venna api hdaganna oni api ethakota krala thiyennemethana danata card eke add vela thiyena visthrathaRA ekka
    //state eke dala yavanava shipping page ekata apita ethakota shippen page ekata ayanakota ape cart ekthiyena item checkout
    //  karaganna puluvan
    navigate("/shipping", {
      state: {
        items: loardCard(),
      },
    });

    // api metika danna eha paththgta aran giya e kiyanne shipping ekata aran gioya

    // const token = localStorage.getItem("token");
    // if (token == null) {
    //   return;
    // }
    // axios
    //   .post(
    //     import.meta.env.VITE_BACKEND_URL + "/api/orders",
    //     {
    //       // meke order database eke ordeid emails me tika backend ekenma api hada[pu eken assign assign venava
    //       //methanin api  orderitesms  tika yavana va e vagema api name phoneno saha adress dala yanna hdala thiyenne e nisa
    //       // thavakalikava methnanin dala ynnava  e tika danata
    //       orderedItems: cart, //me yavanne ape cart eke save vela thiyena orderd items tika
    //       name: "dilantha",
    //       address: "ampara",
    //       phone: "ffffff",
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }

  return (
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
  );
}

// return (
//   <div className="flex flex-col items-center w-full h-full overflow-y-scroll">
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

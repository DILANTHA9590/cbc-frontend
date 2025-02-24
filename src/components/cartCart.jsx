import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteItem } from "../utils/cartfunction";
export default function CartCard(props) {
  const productId = props.productId;
  const qty = props.qty;

  const [product, setProduct] = useState(null);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((res) => {
          setProduct(res.data.product);

          console.log(res.data.product);

          if (res.data.product != null) {
            setProduct(res.data.product);
            setloaded(true);
          } else {
            deleteItem(productId);
          }
        })
        .catch((erorr) => {
          console.log(erorr);
        });
    }
  }, []);
  // itapaasse eloard vechcha data valin methana hadagannav
  return (
    <>
      {!loaded ? (
        <tr>
          <td
            colSpan="6"
            className="py-4 text-lg font-semibold text-center text-gray-600"
          >
            Please wait...
          </td>
        </tr>
      ) : (
        <tr className="transition duration-300 bg-white border-b hover:bg-blue-500 hover:text-white">
          {/* ✅ Product Image */}
          <td className="p-2">
            <img
              src={product?.images[0]}
              alt="Product"
              className="object-cover w-24 h-24 mx-auto rounded-md shadow-md"
            />
          </td>

          {/* ✅ Product Name */}
          <td className="text-lg font-medium text-center">
            {product?.productName}
          </td>

          {/* ✅ Product ID (Hidden on Small Screens) */}
          <td className="hidden text-lg font-semibold text-center text-gray-700 sm:table-cell">
            {productId}
          </td>

          {/* ✅ Quantity */}
          <td className="text-lg font-semibold text-center text-gray-900">
            {qty}
          </td>

          {/* ✅ Product Price */}
          <td className="text-xl font-semibold text-center text-red-500">
            LKR {product?.price.toFixed(2)}
          </td>

          {/* ✅ Total Price */}
          <td className="text-xl font-semibold text-center text-red-500">
            LKR {(product?.lastPrice * qty).toFixed(2)}
          </td>
        </tr>
      )}
    </>
  );
}

// meka kalin thibbe mehema ape crt eka kelimma data aran damma eth meka api vans kara mehema karama apta qty ekai pid ekai vitharai danna puluvan
// mokada  apata pass venne e deka vitharai e nisa e deka venas karala api uda vidihata stets dala hadagaththa
//product ekata dala names ganna puluvan vidihata
//e vagema meka delete venna hdala thiyenne
//  smahara velavata refresh vena prshanaya nisa e product eka user addtocart
//  karna velave api e product eka delete karala
//thibboth  user ta eka penne ma refresh venanakan  refrsh venna oni eka me velave refresh venne na e nisa
//apita ena pid eka axios call eken null venava ethakota api e add karanna yana iktem eka delete karanava
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function CartCard(props) {
//   const productId = props.productId;
//   const qty = props.qty;

//   return (
//     <div className="flex items-center justify-between p-2 space-x-4 border ">
//       <td className="text-lg font-semibold">{productId}</td>
//       <td className="text-xl text-red-500">X</td>
//       <td className="text-lg">{qty}</td>
//     </div>
//   );
// }

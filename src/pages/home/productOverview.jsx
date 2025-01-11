import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ProductOverview() {


  //dan api methana thava hook eka dagannava eka nama useParams
  //eken apata venne ape api request ekath ekka ena parameter gana vistharayak enava
  //api me const param  ekata dala thiyenne param ekk ena json eke vithara tika
  // /;/ketiyenma kiuvoth  useparam valata hambenne adala page eken pass vela apu parameter gana visthrayak thiyena json ekk
  //url eke thiyena parm kiyavaganna puiluvan apata

  // api dan id json eka  g aththa methana enne jsob ekkene eken api id eka vithrak arage daganna oni

  //ilagata pi use effect  hook eka pavichi karanava api meka pavichi karanne ape compoonent eka loard vena velave yam kisi
  // deyak vena oni nam api me hook  ekae us ekaranava
  const params = useParams();

  const productId = params.id;

   const [product,setProduct] =useState(null);
  console.log(params);
  // ita  passe api methanin karla thiyenne axios reqekath ekka product id eka backend ekata yavala e id ekata adala back
  // end data tika res.data valin gannav
  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);

        if()
      })
      .catch((erorr) => {
        console.log("err" + erorr);
      });
  }, []);

  return (
    <div>
      <h1>Product Over View Page</h1>
    </div>
  );
}

// async function GetProductById() {
//   try {
//     console.log(productId);
//     const data = await axios.get(
//       import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId
//     );
//   } catch (error) {
//     console.log(erorr);
//   }
// }

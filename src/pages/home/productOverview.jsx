import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCard } from "../../utils/cartfunction";
import toast from "react-hot-toast";
//api ai mevage page ekk hadanne product eke id ekk dala adala product eke mevage page
// ekk ai  api hadala denne customer apita meke vatinakama thamai mehema karama apata
//e adla prodcut eka customerta share karanna puluvan udaharanayak vidihata api daraz eke apita avshya product ekk hambunama api eka customerta yavanne
// ethakota e adala product eka loard venava e vge thamamekaqthj kar ala thiyemnme e adla product ekata adla link
// eka ta anuva loard venava katahari yauvoth
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

  //api dan hdaganna oni  usestates api dan meka satate 3k thiyenna thama hdanne palaveni state eka thamai
  //   1 product is loadind , 2, product eka loard vela ivarai product hambuna na, 3 thun veni sate eka thama product eka loard una produ
  //eka hambuna onna oya vade manege karanna apata boolean ekkin ba mokda bool va,alla thiyenne avstha dekaine thiyenne apta
  // mevage  sankirna object valata ganna ba apta akayan , boolean ekk string ekk matha thama aye aye refresh  karaganna puluvan
  //api me vade karaganna e nisa state 3k oni venava

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  //

  console.log(params);
  // ita  passe api methanin karla thiyenne axios reqekath ekka product id eka backend ekata yavala e id ekata adala back
  // end data tika res.data valin gannav
  let productdata;
  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data.product);

        //api dan methana karala thiyenne backeend eken api evana id ekataa
        //adala backend eken apta ena data nullnam api use state ekata denaava not-found kiyala ethakota default value eken meka
        // replace venava

        if (res.data.product == null) {
          setStatus("not-found");
        }

        // ape data eka naull naththam ape state value eka product found vidihata hadanava ita passe eka value eka found nam
        //ita adala div eka pemnnnava
        if (res.data.product != null) {
          setProduct(res.data.product);
          setStatus("product-found");
        }
      });
  }, []);

  /* api me function eke addtocart btn eka ebuvamavenna oni eka 
    add to cart eka ebuvama api me product overwiev page eke usesatet ek thiyena values vala
    product id tika api yavanava ape cart page ekata add crt btneka ebuvama */

  function onAddtoCartClick() {
    addToCard(product.productId, 1);

    toast.success(product.productId + "Added to Cart");
  }

  return (
    <div className="w-full h-full">
      {
        //    methana dan api eka eka use starte valata dala deval venna thama karala thiyenne
        // methana  true unoth me kotasa
        //status eka loading kiyana ekata samana nam me vidihta pennanana e kyanne h1 eke thiyena eka
        status == "loading" && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-32 h-32 border-2 border-b-4 border-gray-900 rounded-full animate-spin border-b-accent"></div>
          </div>
        )
      }
      {
        // methana  true unoth me kotasa
        status == "not-found" && <ProductNotFound />
      }

      {
        // product eka found anm me kotasa
        status == "product-found" && (
          <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden sm:flex-row">
            <h1 className="block text-2xl font-bold text-gray-800 sm:hidden">
              {product.productName}
            </h1>

            <p className="block text-xl text-gray-600 xl:text-3xl sm:hidden">
              {product.price > product.lastPrice && (
                <span className="text-red-600 line-through">
                  ${product.price}
                </span>
              )}
              <span> ${product.lastPrice}</span>
            </p>
            <div className="w-[100%] sm:w-[35%] h-full flex flex-col justify-center">
              {/* <img src={product.images[0]} alt="" className="w-full h-[300px] object-covers rounded-lg"/> */}

              {/* api dan mehema yavanne nathuva api ahdagaththa slider component ekata image tika yavana props vidihata
               */}

              <ImageSlider images={product.images} />
            </div>
            <div className="sm:w-[65%] w-[100%] h-full p-4 flex flex-col justify-center gap-y-2">
              <h1 className="text-3xl font-bold text-gray-800 xl:text-6xl">
                {product.productName}
              </h1>

              <h2 className="text-2xl font-bold text-gray-700 sm:text-3xl xl:text-5xl">
                {product.altNames.join("|")}
              </h2>

              <p className="hidden text-xl text-gray-600 xl:text-3xl sm:block">
                {product.price > product.lastPrice && (
                  <span className="text-red-600 line-through">
                    ${product.price}
                  </span>
                )}
                <span> ${product.lastPrice}</span>
              </p>

              <p className="text-lg text-gray-600 line-clamp-3 xl:text-2xl">
                {product.description}
              </p>

              <div className="flex gap-3 ">
                <button className="px-3 py-1 rounded bg-fuchsia-400">
                  Buy Now
                </button>
                <button
                  className="px-3 py-1 bg-green-600 rounded"
                  onClick={onAddtoCartClick}
                >
                  Add to Card
                </button>
              </div>
            </div>
          </div>
        )
      }
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

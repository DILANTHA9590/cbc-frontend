import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
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
        if (res.data.product != null ) {
          setProduct(res.data.product)
          setStatus("product-found");
        }



      })
  }, []);

  return (
    <div className="w-full h-[calc(100vh-12vh)]">
      {
        //    methana dan api eka eka use starte valata dala deval venna thama karala thiyenne
        // methana  true unoth me kotasa
        //status eka loading kiyana ekata samana nam me vidihta pennanana e kyanne h1 eke thiyena eka
        status == "loading"&& (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-2 border-b-accent border-b-4 border-gray-900"></div>
          </div>
        )
      }
      {
        // methana  true unoth me kotasa
        status == "not-found" && (
          <ProductNotFound/>
        
        )
      }

      {
        // product eka found anm me kotasa
        status == "product-found" && <div className="w-full h-full flex bg-gray-500 items-center
        justify-center">

          <div className="w-[35%] h-full">
            <img src={product.images[0]} alt="" className="w-full h-[300px] object-covers rounded-lg"/>
            
          </div>
          <div className="w-[65%] h-full p-4">

          <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>

          <h2 className="text-3xl font-bold text-gray-700">{product.altNames.join("|")}</h2>



<p className="text-xl text-gray-600">{
(product.price>product.lastPrice)&&
  <span className="line-through text-red-600">${product.price}</span>
      }<span>${product.lastPrice}</span></p>




<p className="text-lg text-gray-600 line-clamp-3">{product.description}</p>
          
          </div>

        </div>
  
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

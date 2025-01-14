import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import { ProductCard } from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const [LoadingStatus, setLoadingStatus] = useState("loading");
  // me loading ekata enna puluvan status thuna thama //loading , loaded erorrj, product not found

  useEffect(() => {
    //appi methanata dagannav laodijng venna ethakota methandi loard vela nane e nisa loading eka pennala
    // pahaladi loadrd vechcha gaman ita adal tiuka poennava
    //methandi kiyanne status eke loard vena gaman nam product tika ganna kiayala
    if (LoadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data.list);

          setProducts(res.data.list);
          // dan methanadi load3ed dunnama default value eka loaded unama e states eka navathinava
          setLoadingStatus("loaded");
        })
        .catch((erorr) => {
          toast.error("fail to fetch data");
        });
    }
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
      <h1>Product page</h1>
      {products.map((product) => (
        // api methana product tika penna a eka haddanne nathuva methana kalin hadpu eka thama yata thiyenne
        // api product card component ekak hadala ekata ape product hold karann inna veriable eka pass karanava
        //product card ekata product vidihata methana left side product eka thama api meken prop ekk vidihata product
        //card ekata data yavana  prop name eka right eka dannvane
        // ita passe aapi product card eken api props eka pass karan data ganna oni props.prduct kiyala eke thiye e vistharae
        <ProductCard product={product} />
      ))}
    </div>
  );
}

// return (
//   <div className="w-full h-full bg-red overflow-s">
//     <h1>Product page</h1>
//     {products.map((product) => (
//       <div
//         className="flex flex-col items-center justify-center"
//         key={product.id}
//       >
//         <img src={product.images} alt={product.name} className="w-40 h-40" />
//         <h1>{product.name}</h1>
//         <p>{product.description}</p>
//         <p>${product.price}</p>
//       </div>
//     ))}
//   </div>
// );
// }

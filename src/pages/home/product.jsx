import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import { ProductCard } from "../../components/productCard";
import { BsSearch } from "react-icons/bs";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const [LoadingStatus, setLoadingStatus] = useState("loading");
  const [query, setquery] = useState("");
  // me loading ekata enna puluvan status thuna thama //loading , loaded erorrj, product not found

  // api  meka hadaganne ganne type karana thana hisva thibunoth apata aai parak use effect eka  run karaganna oni
  // eka dala  dependacy arrey ekata eka dagannava
  //api eka damme product ekaloard unada kiyala balanna

  // //

  // api sankirna nokara karamuko vade
  // const [productsloaded, setProductsLoaded] = useState(false);

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

  function search(e) {
    // api search eka patran gannima okkoma loarding danava  mekdi ape component eka type ekedi adla product ekath ekka
    // e kive type karaddi product eka loading eke tghama thiyenne  type karaddi ape me function eka
    // vithrane  run venne ethakota loading ekedi loarding sreen eka run venavae adla product eka methan
    // naththam set ploaded yata dilaa htiyenne thibba product  aye loard venna kiyala ethakota aye componenter eka render
    //  venava

    setLoadingStatus("loading");
    //api methanata e ekk danava e ekka methanata danne apata enava input eken value ekk api me search function
    // eka ethakota e input type eka search karana ea methanata enava
    // ita passe  e input eken ena valkue eka api gannava
    const query = e.target.value;

    setquery(query);
    // methana venade  thama api product eka search  emty nam api
    // product tika  thibba vidihatamaproduct tika pennava naththjam adla product eke pennava
    if (query == "") {
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

      // ehema naththam  e adla product eka pennana
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center w-full h-12 max-w-4xl px-3 mx-auto mb-8 border rounded-lg ">
        <input
          type="text"
          placeholder="Search For Product..."
          className="w-full px-4 py-2 text-lg border-r-0 rounded-l-lg focus:outline-none"
          onChange={search}
          value={query}
        />
        <a
          href="#"
          className="p-2 text-white transition-all rounded-r-lg bg-accent hover:bg-primary"
        >
          <BsSearch size={20} />
        </a>
      </div>

      {/* Product Display */}
      {LoadingStatus === "loaded" ? (
        <>
          <div className="flex flex-wrap justify-center w-full gap-6 bg-primary">
            {products.length === 0 ? (
              <h1 className="text-xl text-gray-500">Product Not Found</h1>
            ) : (
              products.map((product) => (
                <ProductCard key={product.productId} {...product} />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-screen bg-primary">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
    </>
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

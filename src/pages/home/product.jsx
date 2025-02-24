import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import { ProductCard } from "../../components/productCard";
import { BsSearch } from "react-icons/bs";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const [LoadingStatus, setLoadingStatus] = useState("loading");
  const [query, setquery] = useState("");

  useEffect(() => {
    if (LoadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data.list);

          setProducts(res.data.list);

          setLoadingStatus("loaded");
        })
        .catch((erorr) => {
          toast.error("fail to fetch data");
        });
    }
  }, []);

  function search(e) {
    setLoadingStatus("loading");

    const query = e.target.value;

    setquery(query);

    if (query == "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data.list);

          setProducts(res.data.list);

          setLoadingStatus("loaded");
        })
        .catch((erorr) => {
          toast.error("fail to fetch data");
        });
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCard } from "../../utils/cartfunction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const params = useParams();

  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  //

  console.log(params);

  let productdata;
  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data.product);

        if (res.data.product == null) {
          setStatus("not-found");
        }

        if (res.data.product != null) {
          setProduct(res.data.product);
          setStatus("product-found");
        }
      });
  }, []);

  function onAddtoCartClick() {
    addToCard(product.productId, count);

    toast.success(product.productId + "Added to Cart");
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: count,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full h-auto sm:h-full bg-primary">
      {status == "loading" && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-32 h-32 border-2 border-b-4 border-gray-900 rounded-full animate-spin border-b-accent"></div>
        </div>
      )}
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
                    LKR {product.price.toFixed(2)}
                  </span>
                )}
                <span> LKR {product.lastPrice.toFixed(2)}</span>
              </p>

              <p className="text-lg text-gray-600 line-clamp-3 xl:text-2xl">
                {product.description}
              </p>
              <div className="flex gap-3">
                <button
                  className="px-2 border border-black"
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="px-2 max-w-10"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />

                <button
                  className="px-2 border border-black"
                  onClick={() => {
                    if (count <= 9) {
                      setCount(count + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex gap-3 ">
                <button
                  className="px-3 py-1 text-white rounded bg-accent sm:min-w-[150px]"
                  onClick={onAddtoCartClick}
                >
                  Add to Card
                </button>

                <button
                  className="px-3 py-1 rounded-lg  border-accent border-[3px]  sm:min-w-[150px] "
                  onClick={onBuyNowClick}
                >
                  Buy Now
                </button>
              </div>

              <div className="talkwind-reviews">
                <h3 className="review-title">What Our Customers Say:</h3>
                <div className="max-w-4xl p-6 mx-auto shadow-lg bg-blue-50 rounded-xl">
                  <h3 className="mb-6 text-2xl text-center text-blue-600">
                    What Our Customers Say:
                  </h3>
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div className="bg-white p-4 mb-4 rounded-xl shadow-md relative max-w-[90%] mx-auto">
                        <p>{review}</p>
                        <div className="absolute left-4 top-[-12px] w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-lg italic text-center text-gray-600">
                      No reviews yet! Be the first to share your thoughts.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

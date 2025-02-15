// export default function ProductCard(props) {

import { Link } from "react-router-dom";

//     console.log(props)

//     return (

// // me thamai ape commponent eka
//         <div>
//             <img src={props.image} />
//             <h1> {props.name}</h1>
//             <h2>{props.price}</h2>
//             <button>Add to card </button>
//         </div>

//     )
// }

export function ProductCard(props) {
  console.log("myprops" + props.product.images);

  return (
    <div className="flex justify-center bg-se">
      <Link
        to={`/productInfo/${props.product.productId}`}
        className="w-[300px] h-[450px] m-[20px] rounded-xl shadow-lg shadow-gray-600 hover:shadow-primary hover:border-2 border-transparent hover:border-gray-300 overflow-hidden flex flex-col transition-all duration-300 transform hover:scale-105 hover:rotate-2"
      >
        {/* Image Section */}
        <img
          src={props.product.images[0]}
          alt={props.product.productName}
          className="h-[65%] w-full object-cover rounded-t-xl transition-all duration-500 ease-in-out hover:scale-110"
        />

        {/* Info Section */}
        <div className="h-[35%] p-4 flex flex-col justify-between bg-white rounded-b-xl border-t-2 border-gray-100">
          <h1 className="text-2xl font-bold text-center truncate transition-colors duration-300 text-accent hover:text-primary">
            {props.product.productName}
          </h1>

          <h2 className="text-xl font-semibold text-center text-accent">
            {props.product.productId}
          </h2>

          <p className="text-lg font-semibold text-left text-primary">
            LKR.{props.product.lastPrice.toFixed(2)}
          </p>

          {/* Conditional Price Section */}
          {props.product.lastPrice < props.product.price && (
            <p className="text-sm font-semibold text-left text-gray-500 line-through">
              LKR {props.product.price.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

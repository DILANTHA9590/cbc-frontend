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
    <div className="">
      {/* dan api methandi karanna hadanne me link eka cliuck karama api haduvane productoverwiew ekk eken api haduvane
        route path ekk ekdi api ape url eke thama data yauve api dan methanin product card eka ekin eka pennava
        ethkota e adala page eka click karama api e page ekata yanna thama e product eke link route eka dala 
        link ekk hadala thiyenne 
        api ethakota  elinkeka athule thama e product  eken eken ta card details hadagena thiyenne
        api methana ethakota api productover view page eke route eka haduve productinfo kiyala evagema ekata yanakota
        e yana product eke id ekath aran thama yanna hadala thiyenne 
        //api methanakarala thiyenne e url ekata yanna link ekk e yanakota api e dala product ekeoverview weka blanna nam
        api product eke id eka dala yavana vidihata thama e route eka hdala thiyenne
        //methana link eka hadala api ganna props eke thiyena product id ekath ekka eka api hadala thiyenava
        me link eken api product info roooute ekata yanakota api datath ellan yana nisa apata e  adala id 
        ekata adala product overview eka pennava
         */}
      <Link
        to={`/productInfo/${props.product.productId}`}
        className="w-[300px] h-[450px] m-[70px] rounded-xl shadow-lg shadow-gray-600 hover:shadow-primary 
       hover:border-[3px]  overflow-hidden flex flex-col "
      >
        {/* //e ena props valin api div ekk dala eken eka gannava crd eken eka */}

        <img
          src={props.product.images[0]}
          alt=""
          className="h-[65%] w-full object-cover "
        />

        <div className=" h-[35%] min-h-[35%]:">
          <h1 className="text-2xl font-bold text-center text-accent ">
            {props.product.productName}
          </h1>

          <h2 className="text-2xl font-bold text-center text-accent">
            {props.product.productId}
          </h2>

          <p className="text-lg font-semibold text-left">
            {/* to fix eken apta avshya bindu gazna daganna puluavan */}
            LKR.{props.product.lastPrice.toFixed(2)}
          </p>

          {/* methana api karala thiyenne last price eka producct price ekatavada kudai nam vitharak me ira dala pruct 
            price eka pennane samana nam eth penane na
            samana nam penane na */}

          {props.product.lastPrice < props.product.price && (
            <p className="text-xl font-semibold text-left text-gray-500 line-through">
              LKR {props.product.price.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

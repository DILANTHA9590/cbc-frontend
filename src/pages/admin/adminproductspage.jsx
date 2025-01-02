import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
//api me library eka insatall akaragathha meken tahamai backend ekata call
//karala dta genna ganna ekata apata meka oni meken venne bakend ekata api call gahanava
//  methana api arrey ekk vidihata TbHammerma daganne mokada me state ena arrey eka athule ththva thava vebnas vena attribute thiiyenava

// danata me table eka hadaganna oni nisa sample data ekk danava post man eken product lest ekaa aran methanata danava

export default function AdminProductsPage() {
  const [products, setproducts] = useState([
    // {
    //   _id: "675fb7bce4d940ec3e4c6be4",
    //   productId: "M001",
    //   productName: "Matte Lipstick",
    //   altNames: ["Velvet Matte", "Creamy Matte", "Long-Lasting Matte"],
    //   images: [
    //     "https://example.com/images/matte-lipstick-front.jpg",
    //     "https://example.com/images/matte-lipstick-side.jpg",
    //     "https://example.com/images/matte-lipstick-back.jpg",
    //   ],
    //   price: 15.99,
    //   lastPrice: 18.99,
    //   stock: 120,
    //   description:
    //     "A long-lasting matte lipstick available in various shades for every occasion.",
    //   __v: 0,
    // },
    // {
    //   _id: "675fc5680928679553f9d0e9",
    //   productId: "M0013",
    //   productName: "night cream",
    //   altNames: ["Velvet Matte", "Creamy Matte", "Long-Lasting Matte"],
    //   images: [
    //     "https://example.com/images/matte-lipstick-front.jpg",
    //     "https://example.com/images/matte-lipstick-side.jpg",
    //     "https://example.com/images/matte-lipstick-back.jpg",
    //   ],
    //   price: 15.99,
    //   lastPrice: 18.99,
    //   stock: 120,
    //   description:
    //     "A long-lasting matte lipstick available in various shades for every occasion.",
    //   __v: 0,
    // },
  ]);

  // const [test, settest] = useState("Not Pressed");

  //api ara uda thiyena predsswed delete karalpage eka refresh karapu vade thama methanin karaganna yanne
  //meka api set karanava delete button ekata

  const [productsLoaded, setProductsLoaded] = useState(false);
  useEffect(() => {
    // if(productsLoaded == false)

    //palaveni para component ekk
    if (!productsLoaded) {
      //meka thama use effet eka run vena palaveni vathvav api balanava api balanava uda hdapu use effect eka loadrd velavda kiyala effect eke
      // api methandi balana ava methandi palaveni para lorad venakota product loard vela nadda kiyala
      //ethakota flase nisa methandi true venava ethandi ekaparak if part keka eka parak run venava //ekiyanne productl loard vela
      // naththam thama me kotasa run venne ita psse axios call eken product tika gannnava

      // iata passe api set product kityala product tika set karagannava ita passe product tika uda idan pahalata refreshvenava
      //haby use effect eka aye run venne na

      // api dan  methana setproduct loaded true karagaththa ethakota ayeth parak run venava e unata
      //aye axios call ekk vath product sert venne avth na ekai methanata id dagaththe true dapuva ma if part kea run venne na
      //hithnne if else vge methana balala thiyenne product==false true vena nisa if block ekata yanav'
      //eka api pahaladi setproductloaded eka true karagaganava ethakota if block ek arun venne na mokda false ne api me proct loard vble eka denava dependancy
      // arrey eka athulata  dan apita methana karaganna oni product eka delete karata passe ayeth meka run karanna ethkota api delete button eka
      //  athulata set setproductloaded(false) dunnama button eka click karana karana sareta me ayeth get kiyana if part eke kotasath run venava

      axios
        .get("http://localhost:3000/api/products")
        .then((res) => {
          //methana .then damme me deka vena venama thiyena
          //meken venne ape ustetae hook eka update karana gaman eka park refresh karana va ethakota ara pahala kiyala thiyena loop
          //eka navathinava eka vennne me use state hook eken

          // console.log("runnin g");

          //  console.log(res.data);
          setproducts(res.data.list);

          //  console.log(res.data.list);

          setProductsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }

    //methanav varahana ganath danaganna oni
  }, [productsLoaded]);

  //use effect eka run venne ekaparai eth apita samaharaveriable valata ekasan vedi karanna pululuvan
  //danata use effect eka run venne palaveni para loard vena velave vitharai
  //apita p[uluvan meke depandanvcy arrey ekata veriable ekk dila dan methana hadala thiyenne useeffect hook
  // ekk hadala  thiyenne button  eka press karanakota value change venna e useefect veriable eka api dan gihin dunna
  //ape depandancy arrey ekata ethakota ape buttoinb eka click  krana hama velavema ape use effect hook ekath run venava
  //dan kalin t=rubn une eka parai dan loard vena velave saha button ekla press karama aii run vena vidihata hadanna puluvan
  // me hook eka run venava e vagema test vriable eka agaya vensa unath me use effect hook eka run venava
  //apata meka oni venava refresh karanana me vidihe p veriable ekk dala hadaganna puluvan ethakota meka ooban obana sareta meka

  //backend eken run venava ethakota data tika referesh venava

  //api companiyaka vadata gihin me vage sample arerey ekk pavichi karanna  eka hodai mokda apata aththatama product list ekka  vath enne mevge arrey e
  // ekak

  // console.log(products)

  //dan me admin product page eka athule thiyena venas vena de mkokkda apata state define karanna e ka thani ekk nemei
  // eth ththve difine karana veriabele eka mokkda   veriable eka thamai productlist eka adala databes ekaen ena product list eka thama meke productlist eka
  // thama meke meke state eka thiranaya karenne

  //dan api methana component eka loard vena velavadi api call ekk ganava

  //     axios.get("http://localhost:3000/api/products").then((res)=>{//methana .then damme me deka vena venama thiyena
  //         //project dekka nisa koi veve euda dnne nane ekai
  //         // console.log(res);

  //         //habai mehema damma eorr ekk enava metahan apata broweser eke erorr ekk enava
  //         //cores policy kiyala error ekk apiata ehema venne ape bkackend eka hamathanima  ena api codes piliganne na
  //         // eka  piliganna apita npm install cores install karaganna oni eka backend ekata thama install karanne

  //         // methana hadane uda tikai yata tikai ivara vela dan api back end eken data genna ganana hdanne

  //         console.log(res.data); //dan api bakcked eke eva methandi pennava
  //         // dan api  aththa values tika pennana oniu mokda api uda danata exple values dala thiyenne
  //         // ekata dan api usestate ekata denna oni habai mekath varadi mekath dan eka digata run venava
  //         //ekata apata
  //         //mehema dunnathvardi apaitta ethakota loop ekkav vge meka navathinne nathuva run venav mokda
  //         //backed eken data gannava itapsse state eka update karala e datath ekka
  //         //  component refresh karanava aii okoa digatama ena refresh venava e kiyanne uda idan apahu run venava
  //         //ai api call venava state eka update venava meka vardi  mekedi venne eka

  //         //api call->uita passe setproduct eka usesate update karanava -> itapasse ape div tag eke element deka print venava
  // // aai api run venava e tiakama aai venava

  //         // mekata visadumak vidihata apita react valin dila thiyenava api kamathi eka function ekk kkea parak run
  //         // vena vidihata hadanna  component ekk loard vena velavata vitharak function eka run vena vidihata hadaganna
  //         //ethakota e run vena palaveni para vitharai e run vela venna oni de venmne eka tas paita use effect kiyana hook eka oni venava

  //         // dan api me kalla dahanna use effect eka athulata

  //         setproducts(res.data)

  //     })

  // methandi api dan ape bacxkend eken data gannav metahana axios eken get dala thiyenne api
  //dan backeend eke dhadala

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <Link
        to={"/admin/products/addProducts"}
        className="absolute right-4 bottom-5 border  rounded-[10px] text-[30px] bg-[#5b6de6]  text-white p-[25px] 
       border border-black  hover:bg-blue-400 duration-1000 border-[2px] hover:rounded-[20px] transition-all duration-1000 "
      >
        <FaPlus />
      </Link>

      {/* <button
        className="absolute right-100 bottom-5 border  rounded-[10px] text-[30px] bg-[#5b6de6]  text-white p-[25px] 
       border border-black  hover:bg-blue-400 duration-1000 border-[2px] hover:rounded-[20px] transition-all duration-1000"
        onClick={() => {
          if (test == "Pressed") {
            settest("Not Pressed");
          } else {
            settest("Pressed");
          }
        }}
      >
        {test}
      </button> */}

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Product Page
      </h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-600 bg-gray-100">
            <th className="py-3 px-6">Product ID</th>
            <th className="py-3 px-6">Product Name</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Last Price</th>
            <th className="py-3 px-6">Stock</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-6">{product.productId}</td>
              <td className="py-3 px-6">{product.productName}</td>
              <td className="py-3 px-6">${product.price}</td>
              <td className="py-3 px-6">${product.lastPrice}</td>
              <td className="py-3 px-6">{product.stock}</td>
              <td className="py-3 px-6">{product.description}</td>
              <td className="py-3 px-6 flex space-x-3">
                <button
                  className="text-red-600 hover:text-red-800 "
                  onClick={() => {
                    alert(product.productId); // Display the product ID for confirmation
                    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

                    axios
                      .delete(
                        `http://localhost:3000/api/products/${product.productId}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                          },
                        }
                      )
                      .then((res) => {
                        console.log(res.data); // Log the response from the server
                        toast.success("product deletede successfully");

                        //product eka delete karapu gamn api window eka relaord karnava
                        // meka smoothly venne na e nisa api uda hadagatghtha setprodect loaded eken meka refresh karanava
                        // eka run  ruhn karannapai true denna oni setproductloaded(true)
                        setProductsLoaded(false);
                      })
                      .catch((err) => {
                        console.error(err); // Log any errors
                      });
                  }}
                >
                  <MdDelete className="w-5 h-5" />
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <MdModeEditOutline className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// me uda ekata kalin thibbe tablke eka pahala eka

//   return (
//     <div>
//       <h1>Admin Productpage</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Last Price</th>
//             <th>Stock</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             // map function eka use karla api map products arrey eka athule thiyena'
//             //okkoma okkoma product ekein eka print karaganna hadanne
//             products.map(
//               //api methan akarla thiyenne product .map function eka athulata
//               //thava function ekk dila thiyenne eken venne
//               // uda thiyena products list ekata adla meke athule thiyena eka eka item valata adalava menna me athule thiyena
//               //function eka run venava e ran veddi me product tike visthra tika enava products veriable ekata ekin eka 8 thibboth
//               //8ma enava ekin eka
//               (product, index) => {
//                 // console.log(product)//dan apata mehema vdak na meka apata  balannapuluvan browerser eke apata meka oni dan ape products
//                 //page eke display vennea  ekata api return function ekk dagena eke athulen div eka return karanava

//                 //dan pahala thyena div eka
//                 //
//                 // <div>
//                 //     {product.productName}
//                 // </div>
//                 //   product eken product ekata regenarate venava
//                 //ethakota react valin apata brower eke erorr ekk pennanava e pennane
//                 //apata react valin kiyanava me vge regenarate vena div ekk danakota div
//                 //eken div ekata unique key ekk denna onii eka denne pradana element eka athulata key
//                 //denna oni

//                 //DAN API METHANA pradana return karana component ekata key ekk denna oni me vge
//                 // ethakota uda pass karagena thiyenava products veraible ekk eken thama apata product eken ekata
//                 //pennava eke element eken ekata denava  dan api ethana index  kiyala deveni input ekk ethanata danava
//                 //ethakota palaveni element ekata adala 0 index eke deveni elment ekata adalava 1 index eka
//                 //ehema naththam apata methana denna puluvan product ekata adala id eka etha unick ne api eka denava

//                 return (
//                   <tr key={index}>
//                     <td>{product.productId}</td>
//                     <td>{product.productName}</td>
//                     <td>{product.price}</td>
//                     <td>{product.lastPrice}</td>
//                     <td>{product.stock}</td>
//                     <td>{product.description}</td>
//                     <td>
//                       <MdDelete />
//                       <MdModeEditOutline />
//                     </td>
//                   </tr>
//                 );
//               }
//             )
//           }
//         </tbody>
//       </table>
//     </div>
//   );
// }

// 1. Initial Rendering
// The AdminProductsPage component is initialized and rendered.
// The useState hook sets the initial state of products with the predefined array (sample data).
// 2. API Call Triggers
// During the rendering process, the axios.get function executes to fetch data from the backend (http://localhost:3000/api/products).
// The setProducts function is called with the new data fetched from the backend.
// 3. State Update Triggers Re-Render
// When setProducts(res.data) is called, it updates the products state.
// React detects this state change and re-renders the AdminProductsPage component to reflect the new state.
// 4. Re-Render Triggers Another API Call
// On each re-render, the axios.get call is executed again because it is in the main body of the component.
// This creates a feedback loop:
// Render → API Call → State Update → Render → API Call → ...
// This process continues indefinitely until you manually stop the program or a stack overflow occurs.
// Why This Happens
// React components re-render whenever state or props change. In this case:

// The axios.get function is directly in the component body. This makes it execute on every render.
// Each render updates the products state with setProducts, triggering another render and repeating the process.
// How to Break the Loop
// The loop can be controlled by ensuring the API call runs only once when the component mounts. This is usually done using the useEffect hook with an empty dependency array ([]), which ensures the code inside runs only once after the initial render.

// Would you like me to elaborate further on how the React rendering lifecycle causes such issues or provide more examples of such cases?

// {

//     // map function eka use karla api map products arrey eka athule thiyena'
//     //okkoma okkoma product ekein eka print karaganna hadanne
//     products.map(

//         //api methan akarla thiyenne product .map function eka athulata
//         //thava function ekk dila thiyenne eken venne
//         // uda thiyena products list ekata adla meke athule thiyena eka eka item valata adalava menna me athule thiyena
//         //function eka run venava e ran veddi me product tike visthra tika enava products veriable ekata ekin eka 8 thibboth
//         //8ma enava ekin eka
//         (product, index)=>{
//             // console.log(product)//dan apata mehema vdak na meka apata  balannapuluvan browerser eke apata meka oni dan ape products
//             //page eke display vennea  ekata api return function ekk dagena eke athulen div eka return karanava
//             return(

//                 //dan pahala thyena div eka
//                 //
//                 // <div>
//                 //     {product.productName}
//                 // </div>
//                 //   product eken product ekata regenarate venava
//                 //ethakota react valin apata brower eke erorr ekk pennanava e pennane
//                 //apata react valin kiyanava me vge regenarate vena div ekk danakota div
//                 //eken div ekata unique key ekk denna onii eka denne pradana element eka athulata key
//                 //denna oni

// //DAN API METHANA pradana return karana component ekata key ekk denna oni me vge
// // ethakota uda pass karagena thiyenava products veraible ekk eken thama apata product eken ekata
// //pennava eke element eken ekata denava  dan api ethana index  kiyala deveni input ekk ethanata danava
// //ethakota palaveni element ekata adala 0 index eke deveni elment ekata adalava 1 index eka
// //ehema naththam apata methana denna puluvan product ekata adala id eka etha unick ne api eka denava
//                 <div key={product._id}>
//                     {/* {index}mehema dunnam apata ekath balanna puluvan */}

//                     {product.productName}

//                     {/* product eke product name eka print karagttha */}

//                 </div>
//             )

//         }
//     )
// }

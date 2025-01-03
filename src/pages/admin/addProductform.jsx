import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; //apata page athara smoothlky yanna meka oni
//ape routes okkoma handle karanna api use karanne react router dom eka

export default function AddproductForm() {
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [alterNataiveName, setAlternativeNames] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate(); //apita mekedi function ekk hamba venava eka api e function eka navigate kiyana ekata gaththa
  //ita passe me navigate eka call karala onima page ekkata yanna pulyuavan

  async function handleSubmit() {
    const altNames = alterNataiveName.split(","); //"," cooma valin ven karala denna //mekedi api commsa dala type karnava eva ain vela methanin arrtey ekk enava split function eka nisa
    //mokda meva mehema kare nam godk thiyena nisa api
    const imgUrls = imageUrl.split(",");

    //ita apsse api  db eke values valin meke thiyena evata usestae values samana karagannava
    const product = {
      productId: productId,
      productName: productName,
      altNames: altNames,
      images: imgUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,

      //dan api axois call karanna kalin api admin token eka methanata ganna oni api eka mulinma res ekk
      // vidihata gaththe login ekedi backend ekana ena response ekn apita dan admintoken eka oni mokda eka nathuva productt
      //  add karanna bari vidihata thama api haduve back end eka
    };

    const token = localStorage.getItem("token"); //local storage eke save karapu token kiyana item eka gaththa dan apata axios call eka ganna
    // puluvan backend ekata
    try {
      // api hadapu back end api route eka saha api backend ekata yavanna hdagaththa product obj ekath denava
      // ita amathara axios eka athule authorizatioion header ekath danna oni
      await axios.post("http://localhost:3000/api/products", product, {
        //ita amatharava api danna oni autherizatoion header eka
        headers: {
          Authorization: "Bearer " + token, //api backend eka hadala thiyenenne beheama token eka yavannne
          //meken thamai backend eka adura ganne api admin kiyala api postman eke authorization
          //vala karapu vadema thamai me
        },
      });
      // navigate("/admin/products"); //api product eka add karapu gama apiva redrect venava adminproduct page ekata
      // window.location.href = "/admin/products"; api meka thama kalinuse kare meka use karanne na mokda meken page eka refresh venagaman
      // thama apiva re direct venne  eka nisa api navigate hook eka use karanava ethakota page eka refresh vimakin thorava
      //page athra redirect venna puluvan

      navigate("/admin/products");

      toast.success("Product Added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("fail to add product");
      // window.location.href = "/admin/products";
    }
    //
    //me function eka haduve api submit eka ebuvama  api dapu data tika db ekata save venmna
    //meka tesft karanna thama print kare apata input filed valata data input karala balanna pulu van
    // methanin prnnav a pirint karla nisa
    // console.log({
    //   // dan meke image url tikai altname tikaprint venne thani string ekk vidihata api eka nathi karanna oni
    //ekat api udiin veriable ekk k hadala kkarana hati balamu ekata api spli eka use karanava
    //api ekata
    //   productId,
    //   productName,
    //   alterNataiveName,
    //   imageUrl,
    //   price,
    //   lastPrice,
    //   stock,
    //   description,
    // });
  }
  // const [productImage, setProductImage] = useState(null); // State for file input

  // const handleFileChange = (e) => {
  //   setProductImage(e.target.files[0]); // Store the selected file
  // };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add Product Panel
      </h1>
      <div className="flex flex-col border border-gray-300 shadow-lg rounded-lg bg-white p-10 space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product ID</label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productId}
            onChange={(e) => setProductID(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">
            Alternative Names
          </label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={alterNataiveName}
            onChange={(e) => setAlternativeNames(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Last Price</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            className="w-[300px] h-[100px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product Image</label>
          <input
            type="file"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
        </div> */}
        <button
          className="w-[300px] bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
          //button eka athule itapasee api denava haddle sumbit function eka submit karanna kiyala
          onClick={handleSubmit}
        >
          {/* apata dan  add product eka click karama yanna oni datatika athulata ekat api udin function ekk hadagannava */}
          Add Product
        </button>
      </div>
    </div>
  );
}

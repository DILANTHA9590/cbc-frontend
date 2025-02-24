import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMedmiaToSupaBase from "../../utils/mediaUpload";

export default function AddproductForm() {
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [alterNataiveName, setAlternativeNames] = useState("");
  //const [imageUrl, setImageUrl] = useState("");

  const [imageFiles, setImageFiles] = useState([]);

  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  async function handleSubmit() {
    const altNames = alterNataiveName.split(",");

    const promisearrey = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisearrey[i] = uploadMedmiaToSupaBase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisearrey);

    const product = {
      productId: productId,
      productName: productName,
      altNames: altNames,
      images: imgUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token, //api backend eka hadala thiyenenne beheama token eka yavannne
          },
        }
      );

      navigate("/admin/products");

      toast.success("Product Added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("fail to add product");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-gray-600 p-4">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Add Product Panel
      </h1>
      <div className="flex flex-col p-6 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg h-full max-h-[90vh] w-full sm:w-[350px] overflow-auto">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product ID</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productId}
            onChange={(e) => setProductID(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={alterNataiveName}
            onChange={(e) => setAlternativeNames(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Image URL</label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setImageFiles(e.target.files)}
            multiple
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Last Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 text-white transition-all duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

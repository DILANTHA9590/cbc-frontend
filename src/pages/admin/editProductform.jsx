import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedmiaToSupaBase from "../../utils/mediaUpload";

export default function EditProducttForm() {
  const location = useLocation();

  const navigate = useNavigate();

  const product = location.state.product;

  const altNames = product.altNames.join(",");

  if (product == null) {
    navigate("/admin/products");
  }

  const [productId, setProductID] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alterNataiveName, setAlternativeNames] = useState(altNames);
  //const [imageUrl, setImageUrl] = useState("");

  const [imageFiles, setImageFiles] = useState([]);

  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  console.log(location);

  async function handleSubmit() {
    const altNames = alterNataiveName.split(",");

    const promisearrey = [];

    let imgUrls = product.images;

    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        promisearrey[i] = uploadMedmiaToSupaBase(imageFiles[i]);
      }

      imgUrls = await Promise.all(promisearrey);
    }

    console.log(imgUrls);

    const productData = {
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
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
            nne,
          },
        }
      );

      navigate("/admin/products");
      const getRes = response.data.message;

      toast.success(getRes);
    } catch (err) {
      console.log(err);

      toast.error("Fail to add product");
      // window.location.href = "/admin/products";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-500">
      <h1 className="mb-6 text-3xl font-bold text-gray-800"></h1>
      <div className="flex flex-col p-10 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700">Product ID</label>
          <input
            disabled
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
            type="file"
            className="w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setImageFiles(e.target.files)}
            multiple
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

        <button
          className="w-[300px] bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
          onClick={handleSubmit}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

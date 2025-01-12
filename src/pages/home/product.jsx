import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        console.log(res.data);
      })
      .catch((erorr) => {
        toast.error("fail to fetch data");
      });
  });

  return (
    <div>
      <h1>Product page</h1>
    </div>
  );
}

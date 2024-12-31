import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BsGraphUp, BsBox, BsCardChecklist, BsPeople } from "react-icons/bs";
import AdminProductsPage from "./admin/adminproductspage";
import AddproductForm from "./admin/addProductform";

export default function AdminPage() {
  return (
    <>
      {/* Full-width container with flex layout */}
      <div className="bg-slate-700 w-full h-screen flex">
        {/* Sidebar */}
        <div className="w-[20%] h-screen bg-blue-800 flex flex-col items-center text-white">
          {/* Dashboard Link */}
          <Link
            className="flex items-center gap-2 py-2 px-4 hover:bg-blue-600 rounded w-full justify-start"
            to="/admin/dashboard"
          >
            <BsGraphUp />
            Dashboard
          </Link>
          {/* Products Link */}
          <Link
            className="flex items-center gap-2 py-2 px-4 hover:bg-blue-600 rounded w-full justify-start"
            to="/admin/products"
          >
            <BsBox />
            Products
          </Link>
          {/* Orders Link */}
          <Link
            className="flex items-center gap-2 py-2 px-4 hover:bg-blue-600 rounded w-full justify-start"
            to="/admin/orders"
          >
            <BsCardChecklist />
            Orders
          </Link>
          {/* Customers Link */}
          <Link
            className="flex items-center gap-2 py-2 px-4 hover:bg-blue-600 rounded w-full justify-start"
            to="/admin/customers"
          >
            <BsPeople />
            Customers
          </Link>
        </div>

        {/* Main Content */}
        <div className="w-[80%] h-screen bg-blue-400">
          {/* Content goes here */}
          {/* dan me pahala admin kiyala dala naththe /dashbord ,/products evage admin dala nathe api da admin ekata avilla 
ivaraai itappse api meke admin ekata avata passe e deval vena nisa admin dala naththe

ethakota /dashbord kiyaala avoth eyata dashbord component eka loard karala pennava
/products avoth eyata products  component eka loard karala pennava*/}

          <Routes path="/*">
            <Route path="/dashboard" element={<h1>Dashbord</h1>} />

            <Route path="/products" element={<AdminProductsPage />} />

            {/* me path eka hadala thiyenne add product vaata adminge products addproducts vla thama meka thiyenne */}
            <Route
              //e link eke admin eka athulata avith nisa admin danne na products addproducts athulata avama me page eka pennava
              path="/products/addProducts"
              element={<AddproductForm />}
            />
            <Route path="/orders" element={<h1>orders</h1>} />
            <Route path="/customers" element={<h1>customers</h1>} />
            <Route path="/*" element={<h1>404 Not Found Page</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BsGraphUp, BsBox, BsCardChecklist, BsPeople } from "react-icons/bs";
import AdminProductsPage from "./admin/adminproductspage";
import AddproductForm from "./admin/addProductform";
import EditProducts from "./admin/editProductform";
import EditProducttForm from "./admin/editProductform";
import MyOrderPage from "./home/order";
import AdminOrderPage from "./admin/adminOrderpage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AdminCustomerPage } from "./admin/adminCustomer";

export default function AdminPage() {
  const navigate = useNavigate();

  //saralavama methana uservalidantion ekedi venne methana userkenek logunama eya ena userva methaninuth validate
  //karala balanava eya cusda natthm adminda kiylathj aye cusnam log venna denne na usernam denava
  //dan api autherizaation karannahadanne
  //e kiuve dan pata  uda seach avbr eke /admin ngahuvama onima kenekta yanna puluvan
  //'ehemna yanna puluvan eka navththanna thama dan hadanne

  // thavatrh  kiuvoth methana enakota ape token eken back eketa call karala balanava metya
  // meka acces karanna puluvban user kenke da kiyala
  const [user, setuser] = useState(null); // mestate eka damme api userva  ganna

  useEffect(() => {
    // api  dan userva backeend eken ganna oni ekata aparta oni toke n eka
    //user ge token eka enavada balanava
    //ekiyanne admin ekata enakiota api danata iin userge token eka gannava
    const token = localStorage.getItem("token");
    // token  eka nathtnam me vade navaththjala navigate karanava loigin ekata
    //token eka null nam navigate akranava
    //login page ekata
    if (!token) {
      navigate("/login");
      return;
    }
    //ehema naththam apii ena token eka backend ekata yavakla userva api get karagannava

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // setuser(res.data);
        //api balanava backeken data davalin type eka admin da
        // kiyala  mekat api venama route ekk hdagaththa methanin aai axios ekk gahanne
        // apata  front eken enne token eka vitharane ek athula inne admin kiyala balaganna api backend ekata token eka yavala
        // check karagannava
        if (res.data.type != "admin") {
          toast.error("Unauthorized access");
          navigate("/login");
        } else {
          setuser(res.data);
        }
      })
      .catch(() => {
        console.error(err);
        toast.error("Failed to fetch user data");
        navigate("/login");
      });

    // ehama naththam danata inna userva ganna oni api eken ekata apata
    // danata login vela inna userva ganna puluvan api ekk apata hdaganna venava
  }, []);
  return (
    <>
      {/* Full-width container with flex layout */}
      <div className="flex w-full h-screen bg-slate-700">
        {/* Sidebar */}
        <div className="w-[20%] h-screen bg-blue-800 flex flex-col items-center text-white">
          {/* Dashboard Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/dashboard"
          >
            <BsGraphUp />
            Dashboard
          </Link>
          {/* Products Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/products"
          >
            <BsBox />
            Products
          </Link>
          {/* Orders Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/orders"
          >
            <BsCardChecklist />
            Orders
          </Link>
          {/* Customers Link */}
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/admin/customers"
          >
            <BsPeople />
            Customers
          </Link>

          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/signup"
          >
            <BsPeople />
            Create Admin Account
          </Link>
        </div>

        {/* Main Content */}
        <div className="w-[80%] h-screen bg-blue-400">
          {/* Content goes here */}
          {/* dan me pahala admin kiyala dala naththe /dashbord ,/products evage admin dala nathe api da admin ekata avilla 
ivaraai itappse api meke admin ekata avata passe e deval vena nisa admin dala naththe

ethakota /dashbord kiyaala avoth eyata dashbord component eka loard karala pennava
/products avoth eyata products  component eka loard karala pennava*/}

          {/* e vagema me route ek display karanna hoda na anvshaya ayata ekata usrva null naththam thama metika pennane */}
          {user != null && (
            <Routes path="/*">
              <Route path="/dashboard" element={<h1>Dashbord</h1>} />

              <Route path="/products" element={<AdminProductsPage />} />

              {/* me path eka hadala thiyenne add product vaata adminge products addproducts vla thama meka thiyenne */}
              <Route
                //e link eke admin eka athulata avith nisa admin danne na products addproducts athulata avama me page eka pennava
                path="/products/addProducts"
                element={<AddproductForm />}
              />

              <Route
                //e link eke admin eka athulata avith nisa admin danne na products addproducts athulata avama me page eka pennava
                path="/products/editProducts"
                element={<EditProducttForm />}
              />
              <Route path="/orders" element={<AdminOrderPage />} />
              <Route path="/customers" element={<AdminCustomerPage />} />
              <Route path="/*" element={<h1>404 Not Found Page</h1>} />
            </Routes>
          )}
          {/* // userva null nam api penna hdagannava loading screenekk */}
          {user == null && (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

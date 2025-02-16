import { Link, Route, Routes } from "react-router-dom"; //limk use karaddi e kiyanne button nav valayrta vge link use karaddi meka
import Header from "../components/header";

import ProductOverview from "./home/productOverview";
import Loginpage from "./loginpage";
import ProductPage from "./home/product";
import Cart from "./home/cart";
import NavigationBar from "../components/navigationbar";

import MyOrderPage from "./home/order";
import ShippingPage from "./home/shipping";
import { CustomerHomePage } from "./customerHomePage";
import CustomerEditPage from "../components/customerEdit";

import Contact from "../components/contact";
import About from "../components/about";

//import karaganna oni

export default function Homepage() {
  return (
    <div className="h-screen max-w-screen ">
      {/* <Header /> */}
      <NavigationBar />

      <div className="w-full sm:h-[calc(100vh-20vh)] h-full bg-primary ">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/dashboard" element={<h1>Dashbord</h1>} />

          {/* // api packend eken param use karala id e kata adala eva baluva vage api methana product ekata adaala
          // deval pennaganna ganna product id eka ella yavanava req ekath ekka ethakota e id eka magin e prodcut ekata adala
          // data tika apata retrive karala denava */}
          {/* dan methana id  vble eken meka loard vena velavat adala id eka backe ekata yavala apta eken deta 
          retrive karala gannava .id   data eka pass vela enakota api eka gannava aran e vada tika karanne product overview page eken 

          gannava  Product overviiew page eken itapasse e pr */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<ShippingPage />} />

          <Route
            path="/productInfo/:id"
            element={<ProductOverview className="" />}
          />

          {/* <Route path="/dashboard" element={<h1>Dashbord</h1>} /> */}

          <Route path="/order/" element={<MyOrderPage />} />

          <Route path="customeraccount/" element={<CustomerHomePage />} />

          <Route path="customereditaccount/" element={<CustomerEditPage />} />
          <Route path="homepage/" element={<Header />} />
        </Routes>
      </div>
    </div>
  );
}

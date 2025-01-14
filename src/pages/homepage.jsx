import { Link, Route, Routes } from "react-router-dom"; //limk use karaddi e kiyanne button nav valayrta vge link use karaddi meka
import Header from "../components/header";

import ProductOverview from "./home/productOverview";
import Loginpage from "./loginpage";
import ProductPage from "./home/product";
//import karaganna oni

export default function Homepage() {
  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="w-full h-[calc(100vh-12vh)] bg-primary">
        <Routes path="/">
          <Route path="/dashboard" element={<h1>Dashbord</h1>} />

          {/* // api packend eken param use karala id e kata adala eva baluva vage api methana product ekata adaala
          // deval pennaganna ganna product id eka ella yavanava req ekath ekka ethakota e id eka magin e prodcut ekata adala
          // data tika apata retrive karala denava */}
          {/* dan methana id  vble eken meka loard vena velavat adala id eka backe ekata yavala apta eken deta 
          retrive karala gannava .id   data eka pass vela enakota api eka gannava aran e vada tika karanne product overview page eken 

          gannava  Product overviiew page eken itapasse e pr */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/productInfo/:id" element={<ProductOverview />} />

          {/* <Route path="/dashboard" element={<h1>Dashbord</h1>} /> */}
        </Routes>
      </div>
    </div>
  );
}

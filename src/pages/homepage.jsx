import { Link, Routes } from "react-router-dom"; //limk use karaddi e kiyanne button nav valayrta vge link use karaddi meka
import Header from "../components/header";
//import karaganna oni

export default function Homepage() {
  return (
    <div className="h-screen w-screen bg-black border border-black border-[10px]">
      <Header />
      <Routes path="/"></Routes>
    </div>
  );
}

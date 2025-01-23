import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
export default function Header() {
  // dan api header component eka hadaganna thama yanne dan meka hadala api me component eka dannav
  //avshya thanata api meka dagannava api php[ vala kare header footter ekas]
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  return (
    <>
      {
        <div className="fixed w-full bg-[#00000080] h-full z-[100]">
          <div className="bg-white w-[300px] h-screen flex flex-col">
            <Link
              to="/"
              className="text-xl font-bold text-accent hover:border-b border-b-accent"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-xl font-bold text-accent hover:border-b border-b-accent"
            >
              Products
            </Link>

            <Link
              to=""
              className="text-xl font-bold text-accent hover:border-b border-b-accent"
            >
              About Us
            </Link>

            <Link
              to="/"
              className="text-xl font-bold text-accent hover:border-b border-b-accent"
            >
              Contact Us
            </Link>

            <Link
              to="/Cart"
              className="text-xl font-bold text-accent hover:border-b border-b-accent"
            >
              Cart
            </Link>
          </div>
        </div>
      }
      <header className="bg-white w-full h-[12vh]  flex justify-center items-center relative">
        <img
          src="/logo_.png"
          className="h-[133px] w-[209px] rounded-full  cursor-pointer absolute left-[-30px]"
        />
        <RxHamburgerMenu className="absolute h-full text-3xl right-7 sm:hidden text-accent" />

        <div className="h-full   items-center  justify-evenly w-[500px]  sm:flex hidden">
          <Link
            to="/"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Products
          </Link>

          <Link
            to=""
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            About Us
          </Link>

          <Link
            to="/"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Contact Us
          </Link>

          <Link
            to="/Cart"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Cart
          </Link>
        </div>
      </header>
    </>
  );
}

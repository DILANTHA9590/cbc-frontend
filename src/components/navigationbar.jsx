import { FaShippingFast } from "react-icons/fa";

import { FaPinterestP } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { BiLogoFacebook } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import MobileNavBar from "./mobileNavBar";
export default function NavigationBar() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  return (
    <>
      {/* Mobile Responsive Nav bar */}
      {isNavBarOpen && (
        <MobileNavBar
          clickCloseBtn={() => {
            setIsNavBarOpen(false);
          }}
        />
      )}
      {/* End Mobile Responsive Nav Bar */}

      {/* lg Screen Nav Section */}

      <div className="w-full  sm:h-[25vh] ">
        {/* first bar  */}
        <div className="flex items-center justify-between py-2 list-none">
          <div>
            <ul className="flex items-center text-base">
              <li>
                <FaShippingFast />
              </li>
              <li className="hidden md:block">
                {" "}
                FREE Island wide Delivery for LKR 12500+ Purchases
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center pr-3 cursor-pointer gap-x-2">
              <li className="p-1 rounded-full hover:bg-blue-400">
                <a href="">
                  <BiLogoFacebook className="hover:text-white" />
                </a>
              </li>
              <li className="p-1 rounded-full hover:bg-red-400">
                <a href="">
                  <FaPinterestP className="hover:text-white" />
                </a>
              </li>
              <li className="p-1 rounded-full hover:bg-[#c90013]">
                <a href="">
                  <FaYoutube className="hover:text-white" />
                </a>
              </li>
              <li className="p-1 rounded-full hover:bg-gray-200">
                <a href="">
                  <FaInstagram className="hover:text-white" />
                </a>
              </li>
              <li className="p-1 rounded-full hover:bg-blue-700">
                <a href="">
                  <FaLinkedin className="hover:text-white" />
                </a>
              </li>
              <li className="p-1 rounded-full hover:bg-black">
                <a href="">
                  <FaTiktok className="hover:text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* second bar  -------------------------------------------------                    */}
        <div className="flex items-center justify-between pr-2">
          {/* logo  */}
          <div>
            <img src="/logo_.png" alt="" className="w-[100px] h-[100px]" />
          </div>

          {/* search bar  */}
          <div className="flex items-center w-full h-10 max-w-xl border">
            <input
              type="text"
              placeholder="Search For Product ...."
              className="w-full px-3 grow focus:outline-none"
            />

            <a href="">
              <BsSearch />
            </a>
          </div>
          {/* login section */}
          <div className="hidden list-none md:block">
            <ul className="flex items-center">
              <li>
                <a href="">
                  <FaUserCircle className="w-[40px] h-[40px]" />
                </a>
              </li>
              <li>
                <a href="">
                  <PiShoppingCartSimpleFill className="w-[40px] h-[40px]" />
                </a>
              </li>
            </ul>
          </div>

          {/* NOBLE VIEW HAMBURGER MENU  */}
          <div className="md:hidden">
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-xl font-bold text-accent hover:border-b border-b-accent"
                >
                  <IoMdMenu
                    className="w-[50px] h-[30px] "
                    onClick={() => {
                      setIsNavBarOpen(true);
                    }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="items-center justify-center hidden md:flex">
          <ul className="items-center md:flex gap-x-4 sm:gap-x-10 sm:text-2xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/Cart">Cart</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

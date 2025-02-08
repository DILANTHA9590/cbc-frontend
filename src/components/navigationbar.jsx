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

import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import MobileNavBar from "./mobileNavBar";
import axios from "axios";
import { ImSad } from "react-icons/im";
export default function NavigationBar() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.type !== "customer") {
          return;
        } else {
          setCustomer(res.data);
        }
      })
      .catch((erorr) => {
        console.log(erorr);
      });
  }, []);

  function clickcustomerImage() {
    const email = customer.email;
    console.log(email);
    console.log(customer);

    console.log("navbaremail", email);

    navigate("/customeraccount", { state: { email } });
  }

  function clickUserIcon() {
    navigate("/login");
  }
  return (
    <>
      {/* Mobile Responsive Nav bar */}
      {isNavBarOpen && (
        <MobileNavBar
          image={customer.profilePic}
          email={customer.email}
          clickcustomerImage={clickcustomerImage}
          clickUserIcon={clickUserIcon}
          clickCloseBtn={() => setIsNavBarOpen(false)}
        />
      )}
      {/* End Mobile Responsive Nav Bar */}

      {/* lg Screen Nav Section */}

      <div className="w-full h-[20vh] sm:h-[20vh] ">
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

          <div className="items-center justify-center hidden md:flex">
            <ul className="items-center md:flex gap-x-4 sm:gap-x-10 sm:text-2xl">
              <li>
                <Link to="/homepage">Home</Link>
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

              <li>
                <Link to="/order">my orders</Link>
              </li>
            </ul>
          </div>

          {/* login section */}
          <div className="hidden list-none md:block">
            <ul className="flex items-center">
              {/* customer image */}
              {customer.profilePic ? (
                <li>
                  <img
                    src={customer.profilePic}
                    alt="customer Profile"
                    className="w-[50px] h-[50px] rounded-full cursor-pointer "
                    onClick={clickcustomerImage}
                  />
                </li>
              ) : (
                <li>
                  <a href="">
                    <FaUserCircle
                      className="w-[40px] h-[40px]"
                      onClick={clickUserIcon}
                    />
                  </a>
                </li>
              )}

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
      </div>
    </>
  );
}

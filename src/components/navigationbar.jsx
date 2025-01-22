import { FaShippingFast } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
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
export default function NavigationBar() {
  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto">
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
            <ul className="flex items-center cursor-pointer gap-x-2 style:">
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

        {/* second section  -------------------------------------------------                    */}
        <div className="flex items-center justify-between">
          {/* logo  */}
          <div>
            <img src="/logo_.png" alt="" className="w-[100px] h-[100px]" />
          </div>

          {/* search bar  */}
          <div className="flex items-center w-full h-10 max-w-xl border">
            <input
              type="text"
              placeholder="Search For Product ...."
              className="px-3 grow focus:outline-none"
            />

            <a href="">
              <BsSearch />
            </a>

            {/* login section */}
          </div>
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

          {/* // mobile navbar */}
          <div>
            <ul>
              <li>
                <a href="">
                  <IoMdMenu className="w-[50px] h-[30px] md:hidden" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

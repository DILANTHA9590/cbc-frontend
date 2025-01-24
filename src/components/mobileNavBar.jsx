import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNavBar(props) {
  const navBarClose = props.clickCloseBtn;
  return (
    <>
      <div className="fixed w-full bg-[#00000080] h-full z-[100] sm:hidden">
        <div className=" h-full bg-white w-[300px] relative">
          <div className="flex items-center">
            <img src="/logo_.png" alt="" className="w-[100px] h-[100px]" />
            <IoCloseOutline
              className="absolute text-3xl right-5 text-accent"
              onClick={navBarClose}
            />
          </div>
          <div className="flex backdrop-blur-">
            <ul className="flex flex-col gap-y-3 ">
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
                <Link to="/"></Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

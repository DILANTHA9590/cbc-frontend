import { Link } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";

export default function NavSlidder(props) {
  const closeSlider = props.onCloseSlider;
  return (
    <>
      <div className="fixed w-full bg-[#00000080] h-full z-[100]">
        <div className="bg-white w-[300px] h-screen flex flex-col">
          <div className="bg-white w-full h-[12vh]  flex justify-center items-center relative">
            <img
              src="/logo_.png"
              className="h-[133px] w-[209px] rounded-full  cursor-pointer absolute left-[-60px]"
            />
            <RiCloseLargeFill
              className="absolute text-2xl right-6"
              onClick={closeSlider}
            />
          </div>
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
    </>
  );
}

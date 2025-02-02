import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function MobileNavBar(props) {
  console.log(props);
  const navBarClose = props.clickCloseBtn;
  const image = props.image;
  const email = props.email;
  const clickImage = props.clickcustomerImage;

  console.log(email);
  console.log(image);

  console.log("mobilenavbar", props);

  return (
    <>
      <div className="fixed w-full bg-[#00000080] h-full z-[100] sm:hidden ">
        <div className=" h-full bg-white w-[300px] relative">
          <div className="flex items-center">
            <img src="/logo_.png" alt="" className="w-[100px] h-[100px]" />
            <IoCloseOutline
              className="absolute text-3xl right-5 text-accent"
              onClick={navBarClose}
            />
            {/* //testing 3 add feature branch */}
            {/* testing commit 4 */}
          </div>

          {/* //testing  */}

          <div className="flex ">
            <ul className="flex flex-col pl-4 gap-y-3">
              {image ? (
                <li>
                  <a href="">
                    <img
                      src={image}
                      alt="User Profile"
                      className="w-[50px] h-[50px] rounded-full "
                      onClick={clickImage}
                    />
                    <p>{email}</p>
                  </a>
                </li>
              ) : (
                <li>
                  <a href="">
                    <FaUserCircle className="w-[40px] h-[40px]" />
                  </a>
                </li>
              )}

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

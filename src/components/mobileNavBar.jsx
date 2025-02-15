import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function MobileNavBar(props) {
  const navigate = useNavigate();
  const navBarClose = props.clickCloseBtn;
  const image = props.image;
  const email = props.email;
  const clickImage = props.clickcustomerImage;
  const clickUserIcon = props.clickUserIcon;

  function logOut() {
    localStorage.clear("token");
    window.location.href = "/products";
    navBarClose();
  }

  function navigateLoginForm() {
    navigate("/login");
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] z-[100] sm:hidden">
        <div className="w-[300px] h-full bg-white relative">
          <div className="flex items-center justify-between p-4">
            <img src="/logo_.png" alt="Logo" className="w-[100px] h-[100px]" />
            <IoCloseOutline
              className="text-3xl cursor-pointer text-accent"
              onClick={navBarClose}
            />
          </div>

          <div className="flex flex-col pl-4 gap-y-4">
            {/* User Profile */}
            {image ? (
              <div className="flex items-center mb-4 gap-x-3">
                <button onClick={clickImage}>
                  <img
                    src={image}
                    alt="User Profile"
                    className="w-[50px] h-[50px] rounded-full border-2 border-accent"
                  />
                </button>
                <p className="text-sm text-gray-700">{email}</p>
              </div>
            ) : (
              <div className="mb-4">
                <button onClick={navigateLoginForm}>
                  <FaUserCircle className="w-[40px] h-[40px] text-gray-700" />
                </button>
              </div>
            )}

            {/* Links */}
            <ul className="space-y-3">
              <li>
                <button
                  onClick={navigateLoginForm}
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                >
                  Login
                </button>
              </li>

              {email && (
                <>
                  <li>
                    <button
                      onClick={logOut}
                      className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                    >
                      LogOut
                    </button>
                  </li>

                  <li>
                    <Link
                      to="/customeraccount"
                      className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                      onClick={navBarClose}
                    >
                      Go to profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order"
                      className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                      onClick={navBarClose}
                    >
                      My Orders
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/homepage"
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                  onClick={navBarClose}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                  onClick={navBarClose}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                  onClick={navBarClose}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/Cart"
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                  onClick={navBarClose}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600"
                  onClick={navBarClose}
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

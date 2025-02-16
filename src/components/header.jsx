import { Link } from "react-router-dom";
import Loginpage from "../pages/loginpage";
import About from "./about";
import Footer from "./footer";

export default function Header() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 py-10 bg-gradient-to-r from-[#eeebec] to-[#444343] lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 justify-items-center">
          <div className="flex flex-col items-center justify-center order-2 space-y-5 text-center lg:order-1 lg:text-left">
            <h1 className="text-5xl font-extrabold text-[#cd7225] md:text-7xl">
              Beauty Awaits You
            </h1>
            <p className="text-3xl font-semibold text-[#444343] md:text-4xl">
              Discover premium cosmetics and skincare
            </p>
            <p className="text-lg text-[#444343] md:text-xl mt-4">
              Find the perfect products to elevate your beauty routine with
              natural ingredients.
            </p>
            <Link
              to="/products"
              className="text-lg md:text-2xl bg-[#cd7225] text-white py-3 px-6 mt-10 hover:bg-[#cd722590] transition duration-300 rounded-full shadow-lg"
            >
              {" "}
              Explore Our Collection
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <img
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px] rounded-lg shadow-lg"
              src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Cosmetics Products"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Footer Section */}
      <Footer />
    </>
  );
}

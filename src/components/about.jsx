import React from "react";
import AboutSection from "./learnmore";
import Footer from "./footer";

export default function About() {
  return (
    <>
      <section className="py-20 bg-[#eeebec] sm:h-[80vh] flex items-center justify-center">
        <div className="container mx-auto space-y-8 text-center">
          {/* Section Heading */}
          <h2 className="text-4xl font-extrabold text-[#444343] mb-4">
            <span className="text-[#cd7225]">About</span> Us
          </h2>
          <p className="text-xl text-[#444343] mb-6 max-w-3xl mx-auto leading-relaxed">
            At{" "}
            <span className="font-semibold text-[#cd7225]">
              [Your Shop Name]
            </span>
            , we are passionate about delivering the finest selection of premium
            cosmetics and skincare. Our mission is to empower you to look and
            feel your best by providing products that are both luxurious and
            effective.
            <br />
            <br />
            Explore our range of carefully curated beauty products designed for
            every skin type, every need, and every occasion. Embrace your beauty
            with us and discover how our products can enhance your natural glow!
          </p>

          {/* Image or Icon */}
          <div className="flex justify-center mb-8">
            <img
              className="object-cover w-1/2 rounded-lg shadow-lg lg:w-1/4"
              src="https://images.unsplash.com/photo-1603052871071-c9db70f1992b?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2OXwwfDF8c2VhY3J8MXx8Y29zbWV0aWMlMkNzaG9wZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Cosmetics Products"
            />
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center">
            <button className="text-lg md:text-2xl bg-[#cd7225] text-white py-3 px-8 hover:bg-[#cd722590] transition duration-300 rounded-full shadow-lg transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <div>
        <Footer />
      </div>
    </>
  );
}

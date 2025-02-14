import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="py-10 bg-[#444343] text-white">
        <div className="container px-6 mx-auto text-center lg:text-left">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="space-y-5">
              <h4 className="text-xl font-bold">About Us</h4>
              <p>
                At [Your Shop Name], we bring the best in beauty and skincare to
                your doorstep. From skincare solutions to cosmetics, we have you
                covered!
              </p>
            </div>
            <div className="space-y-5">
              <h4 className="text-xl font-bold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-[#cd7225] hover:text-[#cd722590]"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#shop"
                    className="text-[#cd7225] hover:text-[#cd722590]"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[#cd7225] hover:text-[#cd722590]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="text-xl font-bold">Follow Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#cd7225] hover:text-[#cd722590]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#cd7225] hover:text-[#cd722590]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#cd7225] hover:text-[#cd722590]">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 border-t border-[#cd7225] pt-5">
            <p>&copy; 2025 [Your Shop Name]. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

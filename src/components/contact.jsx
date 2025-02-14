import React, { useState } from "react";
import toast from "react-hot-toast";
import Footer from "./footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  // Prevent form submission and show toast message
  function ClickSendMessageButton() {
    toast.success("Message Sent Successfully!");
    setName("");
    setEmail("");
    setText("");
  }

  return (
    <div>
      <section className="py-20 bg-[#eeebec]">
        <div className="container mx-auto space-y-8 text-center">
          <h2 className="text-4xl font-extrabold text-[#444343] mb-4">
            Get in <span className="text-[#cd7225]">Touch</span>
          </h2>
          <p className="text-lg text-[#444343] mb-8 max-w-2xl mx-auto">
            We would love to hear from you! Whether you have a question,
            suggestion, or just want to say hello, feel free to reach out.
          </p>

          {/* Contact Form */}
          <div className="flex justify-center space-x-6">
            <form className="w-full space-y-6 md:w-1/2">
              <input
                type="text"
                value={name}
                placeholder="Your Name"
                className="w-full py-3 px-4 bg-white border border-[#cd7225] text-[#444343] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd7225]"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="Your Email"
                className="w-full py-3 px-4 bg-white border border-[#cd7225] text-[#444343] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd7225]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                value={text}
                placeholder="Your Message"
                rows="4"
                className="w-full py-3 px-4 bg-white border border-[#cd7225] text-[#444343] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd7225]"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="button" // Change button type to "button"
                className="sm:w-full py-3 px-6 bg-[#cd7225] text-white rounded-lg hover:bg-[#cd722590] transition duration-300"
                onClick={ClickSendMessageButton} // Trigger the toast message
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-[#444343] mb-6">
              Contact Information
            </h3>
            <div className="flex justify-center space-x-12">
              <div>
                <p className="text-lg text-[#444343] mb-4">Phone:</p>
                <a
                  href="tel:+94123456789"
                  className="text-lg text-[#cd7225] hover:underline"
                >
                  +94 123 456 789
                </a>
              </div>
              <div>
                <p className="text-lg text-[#444343] mb-4">Email:</p>
                <a
                  href="mailto:info@yoursite.com"
                  className="text-lg text-[#cd7225] hover:underline"
                >
                  info@yoursite.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-10 bg-[#eeebec]">
        <div className="container px-4 mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#444343] mb-6">
            Find Us On The Map
          </h3>
          <div className="relative w-full max-w-4xl mx-auto aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253490.3094432605!2d79.57871218035774!3d6.916159619490978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2599ef57b8519%3A0x4309267dc79fcc6c!2sSrina%20Palace!5e0!3m2!1sen!2slk!4v1739535426371!5m2!1sen!2slk"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

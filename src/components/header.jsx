export default function Header() {
  return (
    <div
      className="flex items-center w-full h-full sm:h-[calc(100vh-20vh)]  mb-4 overflow-hidden bg-center bg-cover "
      style={{ backgroundImage: "url('/header.jpg')" }}
      id="Header "
    >
      <div className="container px-6 py-4 mx-auto text-center text-white md:px-20 lg:px-32 ">
        <h2 className="inline-block text-5xl text-center text-transparent duration-700 sm:text-7xl animate-bounce bg-gradient-to-tr from-purple-800 to-red-500 via-amber-500 bg-clip-text">
          Explore homes that fit your dreams
        </h2>
        <div className="mt-6 space-x-6">
          <a href="#Projects" className="px-8 py-3 border border-white rounded">
            Projects
          </a>
          <a href="#Context" className="px-8 py-3 bg-blue-500 rounded ">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

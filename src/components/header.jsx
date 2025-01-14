import { Link } from "react-router-dom";
export default function Header() {
  // dan api header component eka hadaganna thama yanne dan meka hadala api me component eka dannav
  //avshya thanata api meka dagannava api php[ vala kare header footter ekas]
  return (
    // "bg-white
    <header className="bg-white w-full h-[12vh] relative flex justify-center items-center ">
      <img
        src="/logo_.png"
        className="h-[133px] w-[209px] rounded-full  cursor-pointer absolute left-[10px]"
      />

      <div className="h-full flex  items-center  justify-evenly w-[500px]">
        <Link
          to="/"
          className=" text-accent font-bold text-xl hover:border-b border-b-accent"
        >
          Home
        </Link>

        <Link
          to="/products"
          className=" text-accent font-bold text-xl hover:border-b border-b-accent"
        >
          Products
        </Link>

        <Link
          to=""
          className=" text-accent font-bold text-xl  hover:border-b border-b-accent"
        >
          About Us
        </Link>

        <Link
          to="/"
          className=" text-accent font-bold text-xl  hover:border-b border-b-accent"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}

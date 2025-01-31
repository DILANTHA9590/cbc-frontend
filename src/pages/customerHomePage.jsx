import { Link } from "react-router-dom";

export function CustomerHomePage() {
  return (
    <>
      <div className="flex w-full h-full sm:h-[calc(100vh-25vh)]">
        <div className="w-[40%]  bg-orange-300 flex flex-col ">
          <Link>my account</Link>
          <Link>my orders</Link>
          <Link>promo code</Link>
        </div>
        <div className="w-[60%]  bg-green-500"></div>
      </div>
    </>
  );
}

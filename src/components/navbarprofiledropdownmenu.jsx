import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
export default function NavBarProfilePictureDropDownMenu(props) {
  const closeDropDownMenu = props.clickToggleBtn;
  return (
    <div className="absolute w-[95px] h-[90px] top-[51px]  flex flex-col justify-center items-center bg-slate-300 rounded-md ">
      <div className="absolute top-0 right-0 cursor-pointer ">
        {/* <MdKeyboardDoubleArrowUp /> */}
        <MdKeyboardArrowUp onClick={closeDropDownMenu} />
      </div>
      <Link className="w-full h-full mt-[11px] text-center hover:bg-slate-500 rounded-sm font-bold">
        Profile{" "}
      </Link>

      <Link className="w-full h-full pt-0 font-bold text-center rounded-sm hover:bg-slate-500">
        Login
      </Link>
      <Link className="w-full h-full font-bold text-center rounded-sm hover:bg-slate-500">
        Log Out
      </Link>
    </div>
  );
}

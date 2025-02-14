import { MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function NavBarProfilePictureDropDownMenu(props) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/products"); // Redirect to products page after logout
  }

  function login() {
    navigate("/login");
  }

  const closeDropDownMenu = props.clickToggleBtn;

  return (
    <div className="absolute w-[120px] h-auto top-[51px] flex flex-col justify-center items-center bg-slate-300 rounded-md shadow-lg">
      <div className="absolute top-0 right-0 cursor-pointer">
        <MdKeyboardArrowUp onClick={closeDropDownMenu} />
      </div>

      <button className="w-full py-2 font-bold text-center rounded-sm hover:bg-slate-500">
        Profile
      </button>

      <button
        className="w-full py-2 font-bold text-center rounded-sm hover:bg-slate-500"
        onClick={login}
      >
        Login
      </button>

      <button
        className="w-full py-2 font-bold text-center rounded-sm hover:bg-slate-500"
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice";

const Navbar = () => {
  const {user} = useSelector(state=> state.auth)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutUser =  ()=>{
    dispatch(logout())
    navigate("/")
    
  }

  return (
<div className="shadow bg-white">
  <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 text-slate-800">
    
    <Link to="/">
      <img
        src="/logo.svg"
        alt="Logo"
        className=" sm:h-15 md:h-20 w-auto"
      />
    </Link>

    <div className="flex items-center gap-4 text-sm">
      <p className="max-sm:hidden">Hi, {user?.name}</p>
      <button
        onClick={logoutUser}
        className="border border-gray-300 px-5 py-1.5 rounded-full hover:bg-slate-50"
      >
        Logout
      </button>
    </div>

  </div>
</div>

  );
};

export default Navbar;

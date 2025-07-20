import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between bg-black">
        <img
          src="/Netflix_2015_logo.png"
          alt="Logo"
          className="w-24 object-contain pl-2"
        />
        <img
          src="/nav_avatar.png"
          alt="Avatar"
          className="w-12 object-contain p-2"
        />
      </div>
    </div>
  );
};

export default Navbar;

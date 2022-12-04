import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <div style={{background: "red"}}>
        <h3>Navbar</h3>
        <Link to="/">Home</Link>
        <Link to="/practice">Practice</Link>
      </div>
      <Outlet/>
    </>
  );
};

export default Navbar;

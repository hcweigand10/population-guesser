import React, {useState} from 'react'
import {Link} from "react-router-dom"
import "./navbar.css"

const Navbar = () => {

    return (
        <div className='navbar'>
             <Link to="/">Home</Link>
             <Link to="/practice">Practice</Link>
             <Link to="/about">About</Link>
        </div>
    )
}

export default Navbar
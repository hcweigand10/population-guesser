import React, {useState} from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {

    return (
        <div>
             <h3>Navbar</h3>
             <Link to="/">Home</Link>
             <Link to="/practice">Practice</Link>
        </div>
    )
}

export default Navbar
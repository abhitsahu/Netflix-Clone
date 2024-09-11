import React from 'react'
import logo from '../../logo.png'
import {Link} from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5";


const Header = () => {
  return (
    <nav className="header">
        <img src={logo} alt="logo" />

        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recently">Recently Added</Link>
            <Link to="/mylist">Mylist</Link>

        </div>

        <IoSearchOutline />
    </nav>
  )
}

export default Header
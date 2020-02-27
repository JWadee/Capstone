import React from 'react'
import { slide as Menu } from 'react-burger-menu'


import '../App.css' // webpack must be configured to do this

const NavBar = () => {
    function showSettings(event){
        event.preventDefault();
    };
    
    return (
        <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a onClick={ (e)=>showSettings(e) } className="menu-item--small" href="">Settings</a>
        </Menu>    
    )

}

export default NavBar
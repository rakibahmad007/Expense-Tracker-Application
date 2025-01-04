import React from 'react'


import { NavbarBrand } from '../NavBar/NavbarBrand';
import { NavbarLinks } from '../NavBar/NavbarLinks';

function Navbar() {
  return (
    <nav className=" mx-auto flex items-center justify-center bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavbarBrand />
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
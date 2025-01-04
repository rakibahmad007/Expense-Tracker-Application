import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../utilities/constants';
import { NavbarLink } from './NavbarLink';

export function NavbarLinks() {
  const location = useLocation();
  
  return (
    <div className="flex space-x-4">
      {navItems.map((item) => (
        <NavbarLink 
          key={item.path}
          {...item}
          isActive={location.pathname === item.path}
        />
      ))}
    </div>
  );
}
import React from 'react'
import { Link } from 'react-router-dom';

export function NavbarLink({ path, name, icon: Icon, isActive }) {
    return (
      <Link
        to={path}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <Icon className="h-5 w-5 mr-1" />
        {name}
      </Link>
    );
  }
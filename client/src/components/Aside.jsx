import React from "react";
import { NavLink } from "react-router-dom";

function Aside(props) {
  return (
    <div className="hidden md:block h-screen fixed left-0 top-0 w-64 
      bg-black/20 backdrop-blur-lg border-r border-white/10
      transition-all duration-300">
      <ul className="font-medium pt-20"> {/* Added pt-20 to account for header height */}
        {props.forHam &&
          props.forHam.map((ele, index) => {
            return (
              <li key={index + 1} className="px-4 py-2">
                <NavLink
                  to={`${ele.replace(/\s/g, "").toLowerCase()}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {ele}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Aside;

import React from "react";
import logo from "../../assets/images/logo.png";

function Header() {
  return (
    <>
      <header className="flex flex-col items-center justify-start  xl:flex-row xl:justify-start md:flex-row sm:justify-start sm:items-start mb-1">
        <div>
          <h1 className="font-bold uppercase tracking-wide text-5xl mb-3">
            <img
              src={logo}
              className="w-40 mb-2 h-auto sm:w-48 sm:h-auto md:w-56 md:h-auto lg:w-64 lg:h-auto xl:w-72 xl:h-auto mx-auto "
              alt="Logo"
            />
          </h1>
        </div>
      </header>
    </>
  );
}

export default Header;

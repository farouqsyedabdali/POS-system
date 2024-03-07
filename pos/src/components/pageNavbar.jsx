import React from "react";
import { Navbar, Button, NavbarBrand } from "flowbite-react";
import logo from "../assets/company-logo.jpg";

const MyNavbar = () => {
  return (
    <Navbar>
      <div className="flex justify-between items-center w-full">
        {/*
        <div className="size-20">
          <NavbarBrand href="https://www.youtube.com" className="items-center">
            <img src={logo} />
          </NavbarBrand>
        </div> */}
        <div className="flex justify-center items-center flex-grow">
          <Button href="/">Home</Button>
          <Button href="/admin" className="ml-2">
            Admin
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default MyNavbar;

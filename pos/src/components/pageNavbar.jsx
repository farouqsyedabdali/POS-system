import React from 'react';
import { Navbar, Button } from 'flowbite-react';

const MyNavbar = () => {
  return (
    <Navbar>
      <div className="flex justify-between items-center w-full">
        <div>
          {/* Assume this is where your brand or logo would go */}
        </div>
        <div className="flex justify-center items-center flex-grow">
          <Button href='/'>
            Home
          </Button>
          <Button href='/admin' className="ml-2">
            Admin
          </Button>
        </div>
        <div>
          {/* If you have other items to go on the right side */}
        </div>
      </div>
    </Navbar>
  );
};

export default MyNavbar;

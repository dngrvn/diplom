import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='container mx-auto flex flex-col min-h-screen'>
      <div className='fixed top-0 left-0 w-full z-10'>
        <Navbar />
      </div>
      <div className='flex-grow pt-16'>
        {children || <div className='text-center text-gray-500'>Контент отсутствует</div>}
      </div>
    </div>
  );
};

export default Layout;

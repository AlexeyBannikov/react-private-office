import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Tabs from '../components/Tabs/Tabs';

const PrivateRoutes: React.FC = () => {
  const auth = localStorage.getItem('loggedin');

  return auth ? (
    <div className='bg-primary w-screen h-screen'>
      <Tabs />
      <div className='text-[20px] max-[590px]:text-[18px] m-[20px] p-[10px] bg-secondary h-[calc(100%-110px)] max-[590px]:h-[calc(100%-170px)] rounded-[8px] text-white overflow-auto'>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to='/' />
  );
};

export default PrivateRoutes;

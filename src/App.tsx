import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DevicesPage from './pages/DevicesPage/DevicesPage';
import PrivateRoutes from './services/PrivateRoutes';
import PrivateOfficePage from './pages/PrivateOfficePage/PrivateOfficePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='private-office' element={<PrivateRoutes />}>
        <Route path='' element={<PrivateOfficePage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='devices' element={<DevicesPage />} />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

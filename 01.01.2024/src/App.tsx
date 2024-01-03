import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, AdminRoutes, SuperAdminRoutes } from './Routes/allRoutes';
import { ToastContainer } from 'react-toastify';
import ProtectedAuth from './Routes/protectedAuth';
import Sidebar from './components/sidebar/sidebar';
import { useSelector } from 'react-redux';

const App = () => {
  const jwt = useSelector((state: any) => state.Login.jwt);
  const userType = useSelector((state: any) => state.Login.userType);
  const getAuthenticatedRoutes = () => {
    if (userType === 'Super Admin') {
      return SuperAdminRoutes;
    } else if (userType === 'Admin') {
      return AdminRoutes;
    } else {
      return [];
    }
  };

  const authProtectedRoutes = getAuthenticatedRoutes();

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} key={idx} element={route.component} />
        ))}
      </Routes>

      {jwt && (
        <Sidebar>
          <Routes>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <ProtectedAuth>{route.component}</ProtectedAuth>
                  </React.Fragment>
                }
              />
            ))}
          </Routes>
        </Sidebar>
      )}

      <ToastContainer />
    </React.Fragment>
  );
};

export default App;

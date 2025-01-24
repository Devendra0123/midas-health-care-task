import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound';

// Route Configuration with Breadcrumbs
export const routes = [
  { path: '/', breadcrumb: 'Home', element: <Dashboard /> },
  { path: '/clinical-management', breadcrumb: 'Clinical Management', element: <NotFound /> },
  { path: '/clinical-management/opd', breadcrumb: 'OPD', element: <NotFound /> },
  { path: '/clinical-management/opd/new-patient', breadcrumb: 'New Patient', element: <Dashboard /> },
];

const AppRoutes: React.FC = () => {
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setLoading(false);
        navigate('/clinical-management/opd/new-patient');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default AppRoutes;

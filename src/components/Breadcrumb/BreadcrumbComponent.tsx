import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { routes } from '../../routes/AppRoutes';
import {
  HomeOutlined,
} from '@ant-design/icons';

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const route = routes.find((route) => matchPath(route.path, path));

    if (!route) return null;

    return (
      <Breadcrumb items={[{ title: route.breadcrumb, href: path }]} />
    );
  });

  return (
    <div className='w-full flex items-center justify-start'>
      <Link to="/">
        <HomeOutlined />
      </Link>
      {breadcrumbItems}
    </div>
  );
};

export default BreadcrumbComponent;

import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { routes } from '../../routes/AppRoutes';
import { HomeOutlined } from '@ant-design/icons';
import { IoIosArrowForward } from "react-icons/io";

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();

  // Extract path segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments
    .map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const route = routes.find((route) => matchPath(route.path, path));

      if (!route) return null;

      return {
        key: path,
        title: <Link to={path}>{route.breadcrumb}</Link>,
      };
    })
    .filter(Boolean); // Remove null values

  // Add home icon as the first breadcrumb
  breadcrumbItems.unshift({
    key: '/',
    title: (
      <Link to="/">
        <HomeOutlined />
      </Link>
    ),
  });

  return (
    <Breadcrumb
      separator={<IoIosArrowForward />} // Add arrow icon as separator
      items={breadcrumbItems as any} // Type assertion to resolve TS type issue
      className='flex items-center'
    />
  );
};

export default BreadcrumbComponent;

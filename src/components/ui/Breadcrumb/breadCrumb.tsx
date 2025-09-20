// Breadcrumb.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((seg) => seg);

  return (
    <div className="breadcrumb">
      Dashboards / {pathSegments.length > 0 ? pathSegments[0] : 'Default'}
    </div>
  );
};

export default Breadcrumb;
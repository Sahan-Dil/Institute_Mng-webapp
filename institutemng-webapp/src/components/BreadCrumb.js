import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const BreadCrumb = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((page) => page !== '');

  return (
    <div className="breadcrumb" style={{ backgroundColor: 'green', width: '100%', display: 'flex', alignItems: 'center', padding: '8px' }}>
      <Link to="/" className="breadcrumb-link">
        <FontAwesomeIcon icon={faHome} style={{ color: 'white' }} />
      </Link>
      {path.map((page, index) => (
        <React.Fragment key={index}>
          <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" style={{ color: 'white', margin: '0 4px' }} />
          <Link to={`/${path.slice(0, index + 1).join('/')}`} className="breadcrumb-link" style={{ color: 'white' }}>
            {page}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;

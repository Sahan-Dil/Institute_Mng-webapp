import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';

const StudentsPage = () => {
  const path = ['Home', 'Students'];

  return (
    <div>
      <h1>Students Page</h1>
      <p>This is the Students page content.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default StudentsPage;

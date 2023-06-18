import React from 'react';
import FormSection from '../components/FormSection';

const StudentPage = () => {
  const studentFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
    { name: 'contactNo', label: 'Contact No', type: 'tel', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'classroom', label: 'Classroom', type: 'select', required: true },
    // Add more fields as needed
  ];

  const classrooms = [
    { id: 1, name: 'Classroom 1' },
    { id: 2, name: 'Classroom 2' },
    { id: 3, name: 'Classroom 3' },
    // Add more classrooms as needed
  ];

  return (
    <div>
      <FormSection title="Student Details" fields={studentFields} classrooms={classrooms} />
    </div>
  );
};

export default StudentPage;

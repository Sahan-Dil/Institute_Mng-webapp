import React from "react";
import FormSection from "../components/FormSection";
import ListSection from '../components/ListSection';


const TeachersPage = () => {
  const teacherFields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "contactNo", label: "Contact No", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    // Add more fields as needed
  ];

  const data = [
    {
      ID: '1',
      firstName: 'John',
      lastName: 'Doe',
      contactNo: '1234567890',
      email: 'john.doe@example.com',
    },
    // Add more teacher records as needed
  ];
  

  return (
    <div>
      <FormSection
        title="Teacher Details"
        fields={teacherFields}
        createLink={"xyz"}
      />
      <ListSection title="Existing Teachers" data={data} />
    </div>
  );
};

export default TeachersPage;

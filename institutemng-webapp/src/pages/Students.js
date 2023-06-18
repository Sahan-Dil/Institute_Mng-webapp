import React from "react";
import FormSection from "../components/FormSection";
import ListSection from '../components/ListSection';

const StudentPage = () => {
  const studentFields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    {
      name: "contactPerson",
      label: "Contact Person",
      type: "text",
      required: true,
    },
    { name: "contactNo", label: "Contact No", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "classroom", label: "Classroom", type: "select", required: true },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      disabled: true,
    },
    // Add more fields as needed
  ];

  const classrooms = [
    { id: 1, name: "Classroom 1" },
    { id: 2, name: "Classroom 2" },
    { id: 3, name: "Classroom 3" },
    // Add more classrooms as needed
  ];
  const data = [
    {
      ID: '1',
      firstName: 'John',
      lastName: 'Doe',
      contactPerson: 'Jane Doe',
      contactNo: '1234567890',
      email: 'john.doe@example.com',
      classroom: 'Classroom 1',
      dob: '1990-01-01',
      age: 33,
    },
    // Add more student records as needed
  ];
  return (
    <div>
      <FormSection
        title="Student Details"
        fields={studentFields}
        classrooms={classrooms}
        createLink={"abc"}
      />
      <ListSection title="Existing Student" data={data} />
    </div>
  );
};

export default StudentPage;

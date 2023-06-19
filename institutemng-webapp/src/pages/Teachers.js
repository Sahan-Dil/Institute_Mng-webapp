import React, { useState, useEffect } from "react";
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
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/teachers/getAll", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("dataaaaa",data);
          const subs = data.map((tchr) => ({
            ID: tchr.teacherId,
            firstName: tchr.firstName,
            lastName: tchr.lastName,
            contactNo: tchr.contactNo,
            email: tchr.emailAddress,
            
          }));
          setTeachers(subs);
        } else {
          console.error("Error retrieving classrooms:", response.statusText);
        }
      } catch (error) {
        console.error("Error retrieving classrooms:", error);
      }
    };

    fetchData();
  }, []);
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
        createLink={"https://localhost:5001/api/teachers/create"}
      />
       {teachers.length > 0 && (
        <ListSection title="Existing Teachers" data={teachers} />
      )}
      
    </div>
  );
};

export default TeachersPage;

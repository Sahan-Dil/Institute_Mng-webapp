import React, { useState, useEffect } from "react";
import FormSection from "../components/FormSection";
import ListSection from "../components/ListSection";

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
  const [gclassrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchClassrooms();
    fetchStudents();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/classrooms/getAll",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000", 
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch classrooms");
      }

      const data = await response.json();
      const classrooms = data.map((classroom) => ({
        id: classroom.classroomID,
        name: classroom.classroomName,
      }));

      setClassrooms(classrooms);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };
  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/students/getAll",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000", 
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      const students = data.map((student) => ({
        ID: student.studentID,
        firstName: student.firstName,
        lastName: student.lastName,
        contactPerson: student.contactPerson,
        contactNo: student.contactNo,
        email: student.email,
        classroom: student.classroomName,
        dob: student.dob,
        age: student.age,
      }));

      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div>
      <FormSection
        title="Student Details"
        fields={studentFields}
        classrooms={gclassrooms}
        createLink={"abc"}
      />
      {students.length > 0 && (
        <ListSection title="Existing Student" data={students} />
      )}
    </div>
  );
};

export default StudentPage;

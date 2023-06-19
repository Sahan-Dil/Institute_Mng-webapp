import React, { useEffect, useState } from "react";
import FormSection from "../components/FormSection";
import ListSection from "../components/ListSection";

const ClassroomsPage = () => {
  const classroomFields = [
    { name: "classroomName", label: "Classroom Name", type: "text", required: true },
    // Add more fields as needed
  ];

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/classrooms/getAll", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("dataaaaa",data);
          const classes = data.map((clz) => ({
            ID: clz.classroomID,
            name: clz.classroomName,
            
          }));
          setClassrooms(classes);
        } else {
          console.error("Error retrieving classrooms:", response.statusText);
        }
      } catch (error) {
        console.error("Error retrieving classrooms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <FormSection title="Classroom Details" fields={classroomFields} createLink={"https://localhost:5001/api/classrooms/create"} />
      {classrooms.length > 0 && (
          <ListSection title="Existing Classroom" data={classrooms} />
      )}

    </div>
  );
};

export default ClassroomsPage;

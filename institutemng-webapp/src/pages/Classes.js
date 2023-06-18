import React from "react";
import FormSection from "../components/FormSection";
import ListSection from '../components/ListSection';


const ClassroomsPage = () => {
  const classroomFields = [
    { name: "classroomName", label: "Classroom Name", type: "text", required: true },
    // Add more fields as needed
  ];

  const data = [
    {
      ID: '1',
      name: 'Classroom 1',
    },
    // Add more classroom records as needed
  ];

  return (
    <div>
      <FormSection
        title="Classroom Details"
        fields={classroomFields}
        createLink={"abc"}
      />
      <ListSection title="Existing Classroom" data={data} />
    </div>
  );
};

export default ClassroomsPage;

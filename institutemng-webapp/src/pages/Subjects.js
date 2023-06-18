import React from "react";
import FormSection from "../components/FormSection";
import ListSection from '../components/ListSection';


const SubjectsPage = () => {
  const subjectFields = [
    { name: "subjectName", label: "Subject Name", type: "text", required: true },
    // Add more fields as needed
  ];

  const data = [
    {
      ID: '1',
      name: 'Subject 1',
    },
    // Add more subject records as needed
  ];

  return (
    <div>
      <FormSection
        title="Subject Details"
        fields={subjectFields}
        createLink={"abc"}
      />
      <ListSection title="Existing Subjects" data={data} />
    </div>
  );
};

export default SubjectsPage;

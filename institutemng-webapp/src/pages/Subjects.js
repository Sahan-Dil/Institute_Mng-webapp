import React,{useEffect,useState} from "react";
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

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/subjects/getAll", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("dataaaaa",data);
          const subs = data.map((sub) => ({
            ID: sub.subjectID,
            name: sub.subjectName,
            
          }));
          setSubjects(subs);
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
      <FormSection
        title="Subject Details"
        fields={subjectFields}
        createLink={"https://localhost:5001/api/subjects/create"}
      />
      {subjects.length > 0 && (
      <ListSection title="Existing Subjects" data={subjects} />
      )}
    </div>
  );
};

export default SubjectsPage;

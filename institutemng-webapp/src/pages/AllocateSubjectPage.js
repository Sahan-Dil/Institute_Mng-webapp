import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import SelectTeacher from "../components/SelectTeacher";
import axios from "axios";


const AllocateSubjectsPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [allocatedSubjects, setAllocatedSubjects] = useState([]);

  useEffect(() => {
    // Fetch subject data from API and update the options
    fetchSubjects().then((data) => {
      setSubjectOptions(data);
    });

    // Fetch allocated subjects from API
    fetchAllocatedSubjects().then((data) => {
      setAllocatedSubjects(data);
    });
  }, []);

  const fetchSubjects = async () => {
    try {
      // Make an API call to fetch subject data
      const response = await fetch(
        "https://localhost:5001/api/subjects/getAll"
      );
      const data = await response.json();
      console.log(">>>>>>>>", data);
      return data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  };

  const fetchAllocatedSubjects = async () => {
    try {
      // Make an API call to fetch allocated subjects data
      const response = await fetch(
        "https://localhost:5001/api/allocatedSubjects/getAll"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching allocated subjects:", error);
      return [];
    }
  };


const handleDeallocateSubject = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:5001/api/allocatedSubjects/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });

    if (response.status === 200) {
      console.log('Allocated subject deleted successfully');
      // Fetch the updated allocated subjects data
      fetchAllocatedSubjects().then((data) => {
        setAllocatedSubjects(data);
      });
    } else {
      console.error('Failed to delete allocated subject');
    }
  } catch (error) {
    console.error('Error deleting allocated subject:', error);
  }
};


const handleAllocate = async () => {
  try {
    const payload = {
      teacher: selectedTeacher,
      subject: selectedSubject,
    };

    const response = await axios.post(
      "https://localhost:5001/api/allocatedSubjects/create",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );

    if (response.status === 200) {
      // Successfully allocated the subject, update the allocated subjects data
      fetchAllocatedSubjects().then((data) => {
        setAllocatedSubjects(data);
      });

      console.log("Subject allocated successfully");
    } else {
      console.error("Failed to allocate subject");
    }
  } catch (error) {
    console.error("Error allocating subject:", error);
  }
};


  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "90%",
      }}
    >
      <Grid item xs={12}>
        <SelectTeacher
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
        />
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            border: "1px solid",
            borderRadius: "4px",
            position: "relative",
            p: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              background: "#fff",
              position: "absolute",
              top: "-8px",
              left: "8px",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            Allocated subjects
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="body2">Subject:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "85%" }}>
                <Select
                  value={selectedSubject}
                  onChange={(event) => setSelectedSubject(event.target.value)}
                  displayEmpty
                  size="small"
                  sx={{ minWidth: "120px" }}
                >
                  <MenuItem disabled value="">Select subject</MenuItem>
                  {subjectOptions.map((subject) => (
                    <MenuItem
                      key={subject.subjectID}
                      value={subject.subjectName}
                    >
                      {subject.subjectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleAllocate}
              >
                Allocate
              </Button>
            </Grid>
          </Grid>
          <Table sx={{ marginTop: "20px" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ background: "#808080", color: "#fff" }}>
                  Subject
                </TableCell>
                <TableCell sx={{ background: "#808080", color: "#fff" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allocatedSubjects
                .filter((subject) => selectedTeacher === subject.teacher)
                .map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.subject}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="inherit" onClick={() => handleDeallocateSubject(subject.id)}>
                        Deallocate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AllocateSubjectsPage;

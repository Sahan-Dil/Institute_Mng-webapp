import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const StudentReportPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchTeacherSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5001/api/students/getAll"
      );
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeacherSubjects = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5001/api/allocatedSubjects/getAll"
      );
      setTeacherSubjects(response.data);
    } catch (error) {
      console.log(error);
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
        maxWidth: "800px",
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            border: "1px solid",
            borderRadius: "4px",
            marginBottom: "20px",
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
            Student details
          </Typography>
          {/* Add content for the student details section */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="student-label">Student</InputLabel>
                <Select
                  labelId="student-label"
                  id="student"
                  value={
                    selectedStudent
                      ? `${selectedStudent.firstName} ${selectedStudent.lastName}`
                      : ""
                  }
                  onChange={(event) => {
                    const selectedName = event.target.value;
                    const student = students.find(
                      (s) => `${s.firstName} ${s.lastName}` === selectedName
                    );
                    setSelectedStudent(student);
                  }}
                >
                  {students.map((student) => (
                    <MenuItem
                      key={student.id}
                      value={`${student.firstName} ${student.lastName}`}
                    >
                      {`${student.firstName} ${student.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled
                label="Classroom"
                value={selectedStudent ? selectedStudent.classroom : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled
                label="Contact Person"
                value={selectedStudent ? selectedStudent.contactPerson : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled
                label="Email"
                value={selectedStudent ? selectedStudent.emailAddress : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled
                label="Contact"
                value={selectedStudent ? selectedStudent.contactNo : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled
                label="DOB"
                value={
                  selectedStudent
                    ? new Date(selectedStudent.dateOfBirth).toLocaleDateString()
                    : ""
                }
              />
            </Grid>
          </Grid>
        </Box>
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
            Teacher & Subject Details
          </Typography>
          {/* Add content for the teacher & subject details section */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ background: "#808080", color: "#fff" }}>Subject</TableCell>
                  <TableCell sx={{ background: "#808080", color: "#fff" }}>Teacher</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherSubjects.map((teacherSubject) => (
                  <TableRow key={teacherSubject.id}>
                    <TableCell>{teacherSubject.subject}</TableCell>
                    <TableCell>{teacherSubject.teacher}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      
    </Grid>
  );
};

export default StudentReportPage;

import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import SelectTeacher from '../components/SelectTeacher';
import axios from "axios";


const AllocateClassesPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [allocatedClasses, setAllocatedClasses] = useState([]);

  useEffect(() => {
    // Fetch classroom data from API and update the options
    fetchClassrooms().then((data) => {
      setClassroomOptions(data);
    });

    // Fetch allocated classes from API
    fetchAllocatedClasses().then((data) => {
      setAllocatedClasses(data);
    });
  }, []);

  const fetchClassrooms = async () => {
    try {
      // Make an API call to fetch classroom data
      const response = await fetch('https://localhost:5001/api/classrooms/getAll');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      return [];
    }
  };

  const fetchAllocatedClasses = async () => {
    try {
      // Make an API call to fetch allocated classes data
      const response = await fetch('https://localhost:5001/api/allocatedClasses/getAll');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching allocated classes:', error);
      return [];
    }
  };

  const handleDeallocate = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:5001/api/allocatedClasses/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      });
  
      if (response.status === 200) {
        console.log('Allocated class deleted successfully');
        
        fetchAllocatedClasses().then((data) => {
          setAllocatedClasses(data);
        });
      } else {
        console.error('Failed to delete allocated class');
      }
    } catch (error) {
      console.error('Error deleting allocated class:', error);
    }
  };
  

const handleAllocate = async () => {
  try {
    const payload = {
      teacher: selectedTeacher,
      class: selectedClassroom,
    };

    const response = await axios.post(
      "https://localhost:5001/api/allocatedClasses/create",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );

    if (response.status === 200) {
      // Successfully allocated the class, update the allocated classes data
      fetchAllocatedClasses().then((data) => {
        setAllocatedClasses(data);
      });

      console.log("Class allocated successfully");
    } else {
      console.error("Failed to allocate class");
    }
  } catch (error) {
    console.error("Error allocating class:", error);
  }
};


  return (
    <Grid container spacing={2} sx={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '90%' }}>
      <Grid item xs={12}>
        <SelectTeacher selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher} />
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            border: '1px solid',
            borderRadius: '4px',
            position: 'relative',
            p: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              background: '#fff',
              position: 'absolute',
              top: '-8px',
              left: '8px',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            Allocated classes
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="body2">Classroom:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '85%' }}>
                <Select
                  value={selectedClassroom}
                  onChange={(event) => setSelectedClassroom(event.target.value)}
                  displayEmpty
                  size="small"
                  sx={{ minWidth: '120px' }}
                >
                  <MenuItem disabled value="">Select classroom</MenuItem>
                  {classroomOptions.map((classroom) => (
                    <MenuItem key={classroom?.classroomID} value={classroom?.classroomName}>
                      {classroom?.classroomName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="inherit" onClick={handleAllocate}>
                Allocate
              </Button>
            </Grid>
          </Grid>
          <Table sx={{ marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ background: '#808080', color: '#fff' }}>Classroom</TableCell>
                <TableCell sx={{ background: '#808080', color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {allocatedClasses
    .filter((classroom) => selectedTeacher === classroom.teacher)
    .map((classroom) => (
      <TableRow key={classroom.id}>
        <TableCell>{classroom.class}</TableCell>
        <TableCell>
          <Button variant="outlined" color="inherit" onClick={() => handleDeallocate(classroom.id)}>
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

export default AllocateClassesPage;

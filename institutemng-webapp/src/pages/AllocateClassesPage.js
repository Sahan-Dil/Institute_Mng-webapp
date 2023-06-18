import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import SelectTeacher from '../components/SelectTeacher';

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
      const response = await fetch('<CLASSROOM_API_ENDPOINT_URL>');
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
      const response = await fetch('<ALLOCATED_CLASSES_API_ENDPOINT_URL>');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching allocated classes:', error);
      return [];
    }
  };

  const handleAllocate = async () => {
    try {
      // Make an API call to allocate the class with selectedTeacher and selectedClassroom
      const response = await fetch('<ALLOCATE_CLASS_API_ENDPOINT_URL>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacher: selectedTeacher,
          classroom: selectedClassroom,
        }),
      });

      if (response.ok) {
        // Successfully allocated the class, update the allocated classes data
        fetchAllocatedClasses().then((data) => {
          setAllocatedClasses(data);
        });

        console.log('Class allocated successfully');
      } else {
        console.error('Failed to allocate class');
      }
    } catch (error) {
      console.error('Error allocating class:', error);
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
                  <MenuItem value="">Select classroom</MenuItem>
                  {classroomOptions.map((classroom) => (
                    <MenuItem key={classroom.id} value={classroom.id}>
                      {classroom.name}
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
              {allocatedClasses.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell>{classroom.name}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="inherit">
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

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';

const SelectTeacher = ({ selectedTeacher, setSelectedTeacher }) => {
  const [teacherOptions, setTeacherOptions] = useState([]);

  useEffect(() => {
    // Fetch teacher data from API and update the options
    fetchTeachers().then((data) => {
      setTeacherOptions(data);
    });
  }, []);

  const fetchTeachers = async () => {
    try {
      // Make an API call to fetch teacher data
      const response = await fetch('<API_ENDPOINT_URL>');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  };

  const handleChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderRadius: '4px',
        marginBottom: '20px',
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
        Teacher details
      </Typography>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <Typography variant="body2">Teacher:</Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl sx={{ width: '50%' }}>
            <Select value={selectedTeacher} onChange={handleChange} displayEmpty size="small" sx={{ minWidth: '120px' }}>
              <MenuItem value="">Select teacher</MenuItem>
              {teacherOptions.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectTeacher;

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';

const HomePage = () => {
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography variant="h4" align="center">
          Home
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center">
          Welcome to the Home page!
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button component={Link} to="/students" variant="contained" color="primary">
              Students
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} to="/teachers" variant="contained" color="primary">
              Teachers
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} to="/subjects" variant="contained" color="primary">
              Subjects
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;

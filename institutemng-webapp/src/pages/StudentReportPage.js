import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const StudentReportPage = () => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
      <Grid item xs={12}>
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
            Student details
          </Typography>
          {/* Add content for the student details section */}
          <Typography variant="body2">Student details content goes here</Typography>
        </Box>
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
            Report
          </Typography>
          {/* Add content for the report section */}
          <Typography variant="body2">Report content goes here</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudentReportPage;

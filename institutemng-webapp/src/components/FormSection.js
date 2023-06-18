import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const FormSection = ({ title, fields, classrooms }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div style={{ margin: 'auto', width: '98%', marginBottom: '10px', marginTop: '10px' }}>
      <div
        style={{
          background: isOpen ? '#004000' : '#006400',
          color: '#fff',
          padding: '10px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
        onClick={handleToggleAccordion}
      >
        <span>{title}</span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} color="#fff" />
      </div>
      {isOpen && (
        <div
          style={{
            padding: '10px',
            border: '0.5px solid #006400',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
          }}
        >
          <Grid container spacing={2}>
            {fields.map((field) => (
              <React.Fragment key={field.name}>
                {field.type === 'select' ? (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        style={{ marginTop: '10px' }}
                      >
                        {classrooms.map((classroom) => (
                          <MenuItem key={classroom.id} value={classroom.id}>
                            {classroom.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={field.label}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      style={{ marginTop: '10px' }}
                    />
                  </Grid>
                )}
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" style={{ background: '#006400', color: '#fff', borderRadius: '5px', width: '250px' }}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" style={{ background: '#FF0000', color: '#fff', borderRadius: '5px', width: '250px' }}>
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" style={{ background: '#FFFF00', color: '#000', borderRadius: '5px', width: '250px' }}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default FormSection;

import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age.toString();
};

const FormSection = ({ title, fields, classrooms,createLink }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const formik = useFormik({
    initialValues: {
      dob: null,
      age: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  const handleDateOfBirthChange = (date) => {
    formik.setFieldValue("dob", date);

    if (date) {
      const age = calculateAge(date);
      formik.setFieldValue("age", age);
    } else {
      formik.setFieldValue("age", "");
    }
  };

  const handleSave = () => {
    if (formik.isValid) {
      console.log(formik.values);
      console.log(createLink)

      //api call for create
      axios
      .post(createLink, formik.values)
      .then(response => {
        window.alert('Record created successfully',response);
        formik.resetForm();
      })
      .catch(error => {
        window.alert('Error creating record:', error);
      });

      
    }
  };

  const handleDelete = () => {
    if (formik.isValid) {
      console.log(formik.values);
      formik.resetForm();
    }
  };

  const handleClear = () => {
    formik.resetForm();
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "98%",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          background: isOpen ? "#004000" : "#006400",
          color: "#fff",
          padding: "10px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
        onClick={handleToggleAccordion}
      >
        <span>{title}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          color="#fff"
        />
      </div>
      {isOpen && (
        <div
          style={{
            padding: "10px",
            border: "0.5px solid #006400",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <React.Fragment key={field.name}>
                  {field.type === "select" ? (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          style={{ marginTop: "10px" }}
                          value={formik.values[field.name] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                      {field.name === "dob" ? (
                        <TextField
                          fullWidth
                          label={field.label}
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          style={{ marginTop: "10px" }}
                          value={formik.values[field.name] || ""}
                          onChange={(e) =>
                            handleDateOfBirthChange(e.target.value)
                          }
                          onBlur={formik.handleBlur}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          label={field.label}
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          style={{ marginTop: "10px" }}
                          value={formik.values[field.name] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched[field.name] &&
                            formik.errors[field.name]
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched[field.name] &&
                            formik.errors[field.name]
                          }
                          disabled={field.name === "age"}
                        />
                      )}
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        background: "#006400",
                        color: "#fff",
                        borderRadius: "5px",
                        width: "250px",
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{
                        background: "#FF0000",
                        color: "#fff",
                        borderRadius: "5px",
                        width: "250px",
                      }}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{
                        background: "#FFFF00",
                        color: "#000",
                        borderRadius: "5px",
                        width: "250px",
                      }}
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
};

export default FormSection;

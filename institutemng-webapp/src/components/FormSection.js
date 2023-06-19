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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

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

const FormSection = ({ title, fields, classrooms, createLink }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };
  const location = useLocation();

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
    let payload;

    if (formik.values.classroomName) {
      console.log("ffff", JSON.stringify(formik.values));
      payload = {
        classroomName: formik.values.classroomName,
      };
    }
    if (formik.values.subjectName) {
      console.log("ffff", JSON.stringify(formik.values));
      payload = {
        subjectName: formik.values.subjectName,
      };
    }

    if (formik.isValid) {
      console.log("ffff", JSON.stringify(formik.values));

      if (formik.values.firstName) {
        payload = {
          FirstName: formik.values.firstName,
          LastName: formik.values.lastName,
          ContactPerson: formik.values.contactPerson,
          ContactNo: formik.values.contactNo,
          EmailAddress: formik.values.email,
          DateOfBirth: formik.values.dob,
          Age: parseInt(formik.values.age, 10),
          classroom: formik.values.classroom,
        };
        console.log("ffff", JSON.stringify(payload));
      }

      //api call for create
    }
    axios
      .post(createLink, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })

      .then((response) => {
        window.alert("Record created successfully", response);
        formik.resetForm();
      })
      .catch((error) => {
        window.alert("Error creating record:", error);
      });
  };

  const handleDelete = () => {
    if (formik.isValid) {
      const email = formik.values.email;
      let url;
      if (location.pathname.includes("/students")) {
        url = `https://localhost:5001/api/students/delete/${email}`;
      } else if (location.pathname.includes("/teachers")) {
        url = `https://localhost:5001/api/teachers/delete/${email}`;
      }

      axios
        .delete(url)
        .then((response) => {
          console.log("Record deleted successfully");
          window.alert("Record deleted successfully");
          formik.resetForm();
        })
        .catch((error) => {
          console.log("Error occurred while deleting the record");
          window.alert("Error occurred while deleting the record");
        });
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
                            <MenuItem key={classroom.id} value={classroom.name}>
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

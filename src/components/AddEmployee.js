import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmp((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validation = () => {
    let validationErrors = {};
    if (!newEmp.name) {
      validationErrors.name = `Name required *`;
    } else if (newEmp.name.length <= 3) {
      validationErrors.name = `Name should have more than 3 characters`;
    }
    if (!newEmp.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of birth required *";
    }
    if (!newEmp.email) {
      validationErrors.email = `email required *`;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmp.email)
    ) {
      validationErrors.email = `Email is invalid *`;
    }
    if (!newEmp.gender) {
      validationErrors.gender = `Select gender`;
    }
    if (!newEmp.department) {
      validationErrors.profileImage = "choose department";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length === 0) {
      const newEmployee = {
        name: newEmp.name,
        email: newEmp.email,
        gender: newEmp.gender,
        dateOfBirth: newEmp.dateOfBirth,
        department: newEmp.department,
      };
      await axios
        .post(
          "https://average-school-uniform-lamb.cyclic.app/api/employees/add",
          newEmployee
        )
        .then((res) => {
          toast.success(res.data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Check employee details");
        });
      setErrors({});
      setNewEmp({
        name: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        department: "",
      });
    } else {
      setErrors(validationErrors);
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  };

  return (
    <Form action="#" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={newEmp.name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.name && <p className="message">{errors.name}</p>} <br />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={newEmp.email}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.email && <p className="message">{errors.email}</p>} <br />
      <Form.Select
        aria-label="Default select example"
        name="gender"
        value={newEmp.gender}
        onChange={handleChange}
      >
        <option>Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="other">other</option>
      </Form.Select>
      {errors.gender && <p className="message">{errors.gender}</p>} <br />
      <Form.Group className="mb-3" controlId="formDOB">
        <Form.Label>Date of birth</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={newEmp.dateOfBirth}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.dateOfBirth && <p className="message">{errors.dateOfBirth}</p>}{" "}
      <br />
      <Form.Select
        aria-label="Default select example"
        name="department"
        value={newEmp.department}
        onChange={handleChange}
      >
        <option>Department</option>
        <option value="Developer">Developer</option>
        <option value="HR">HR</option>
        <option value="Team leader">Team leader</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Manager">Manager</option>
      </Form.Select>
      {errors.department && <p className="message">{errors.department}</p>}{" "}
      <br />
      <Button variant="success mx-2" type="submit">
        Save
      </Button>
      <Link to="/" className="btn btn-secondary">
        Home Page
      </Link>
    </Form>
  );
};

export default AddEmployee;

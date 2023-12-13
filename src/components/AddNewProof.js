import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import toast from "react-hot-toast";

const AddNewProof = ({ id }) => {
  const [category, setCategory] = useState("");
  //   const [customCategory, setCustomCategory] = useState("");
  const [documentName, setDocumentName] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "custom") {
      setCategory("custom");
    } else {
      setCategory(selectedCategory);
    }
  };

  const handleSaveClick = async () => {
    const newProof = {
      documentName: documentName,
      category: category,
      EmployeeId: id,
    };
    await axios
      .post(
        "https://average-school-uniform-lamb.cyclic.app/api/employeeProofs/add",
        newProof
      )
      .then((proof) => {
        console.log(proof.data.data);
        toast.success("proof added");
        window.location.reload();
      });
  };
  return (
    <div>
      <div className="d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Enter Document Name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <Form.Select
          aria-label="Default select example"
          name="category"
          onChange={handleCategoryChange}
          value={category}
        >
          <br />
          <option>select category...</option>
          <option value="Employment Proof">Employment Proof</option>
          <option value="Income Proof">Income Proof</option>
          <option value="Employee Proof">Employee Proof</option>
          {/* <option value="custom">Add New Category</option> */}
        </Form.Select>
      </div>
      {/* {category === "custom" && (
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="Enter Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )} */}
      <br />
      <Button variant="success" onClick={handleSaveClick}>
        save
      </Button>
    </div>
  );
};

export default AddNewProof;

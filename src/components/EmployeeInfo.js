import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EmployeeInfo = () => {
  const [proofs, setProofs] = useState([]);

  //adding the empty list items
  const addProofs = () => {
    const newProof = { id: proofs.length + 1, documentName: "", groupName: "" };
    setProofs([...proofs, newProof]);
  };

  //to remove the list item
  const removeProof = (id) => {
    const updatedProofs = proofs.filter((proof) => proof.id !== id);
    setProofs(updatedProofs);
  };

  //get the input from the input box and update the proofs
  const handleInputChange = (id, field, value) => {
    const updatedProofs = proofs.map((proof) =>
      proof.id === id ? { ...proof, [field]: value } : proof
    );
    setProofs(updatedProofs);
  };

  //using set to filter the unique value and divide the value and add new ol
  const uniqueGroupNames = [...new Set(proofs.map((proof) => proof.groupName))];
  // console.log(uniqueGroupNames);

  return (
    <Form>
      <header className="d-flex justify-content-between mx-auto my-3 w-75 ">
        <h3>Application Proof</h3>
        <Button
          variant="primary"
          onClick={addProofs}
          disabled={proofs.length > 0 ? "true" : ""}
        >
          Add Proof
        </Button>
      </header>
      <div className="border border w-75 mx-auto">
        <Form.Group className="mb-3 mx-3 py-3" controlId="formName">
          <Form.Label> Proof Name</Form.Label>
          <Form.Control type="text" placeholder="Proof Name" className="p-3" />
        </Form.Group>
        {uniqueGroupNames.map((group, index) => (
          <div key={index} className="border border w-75 mx-auto my-4">
            <ol>
              {/* Filter proofs based on the current group */}
              {proofs
                .filter((proof) => proof.groupName === group)
                .map((proof) => (
                  <li key={proof.id} className="mt-4">
                    <div className="d-flex justify-content-around">
                      <Form.Floating className="mb-3">
                        <Form.Control
                          id={`documentName${proof.id}`}
                          type="text"
                          placeholder="Document Name"
                          value={proof.documentName}
                          onChange={(e) =>
                            handleInputChange(
                              proof.id,
                              "documentName",
                              e.target.value
                            )
                          }
                        />
                        <label htmlFor={`documentName${proof.id}`}>
                          Document Name
                        </label>
                      </Form.Floating>

                      <Form.Floating className="mb-3">
                        <Form.Control
                          id={`groupName${proof.id}`}
                          type="text"
                          placeholder="Group Name"
                          value={proof.groupName}
                          onChange={(e) =>
                            handleInputChange(
                              proof.id,
                              "groupName",
                              e.target.value
                            )
                          }
                        />
                        <label htmlFor={`groupName${proof.id}`}>
                          Group Name
                        </label>
                      </Form.Floating>

                      <Button
                        variant="primary"
                        className="my-auto rounded-circle"
                        onClick={() => addProofs()}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        className="my-auto rounded-circle"
                        onClick={() => removeProof(proof.id)}
                      >
                        -
                      </Button>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default EmployeeInfo;

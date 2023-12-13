import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddNewProof from "./AddNewProof";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EmployeeProof = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [proofs, setProofs] = useState([]);
  // Employment Proof
  // Income Proof/
  // Employee Proof

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`https://average-school-uniform-lamb.cyclic.app/api/employeeProofs`)
      .then((res) => setProofs(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are sure to delete the proof..")) {
      await axios
        .delete(
          `https://average-school-uniform-lamb.cyclic.app/api/employeeProofs/${id}`
        )
        .then((res) => {
          toast.success("proof deleted");
          window.location.reload();
        });
    }
  };
  // console.log(proofs);

  const filterProof = proofs.filter((proof) => proof.EmployeeId === id);
  console.log(filterProof);

  const employmentCat = filterProof.filter(
    (proof) => proof.category === "Employment Proof"
  );
  const incomeCat = filterProof.filter(
    (proof) => proof.category === "Income Proof"
  );
  const employeeCat = filterProof.filter(
    (proof) => proof.category === "Employee Proof"
  );

  return (
    <div className="formArea m-3">
      <header className="d-flex justify-content-between mb-3">
        <h3>Employee Proof details</h3>
        <Button variant="outline-primary" onClick={handleShow}>
          Add Proof
        </Button>
      </header>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewProof id={id} />
        </Modal.Body>
      </Modal>
      <Form className=" border border-dark p-3 rounded w-75 mx-auto">
        <div className="emp-proof">
          <ol>
            {employmentCat.map((proof) => {
              return (
                <li className="proofs  my-2" key={proof._id}>
                  <div className="det d-flex justify-content-between ">
                    <p>{proof.documentName}</p> <p>{proof.category}</p>
                    <div className="btns ">
                      <Button className="mx-2">+</Button>
                      <Button onClick={() => handleDelete(proof._id)}>-</Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <hr />
          <ol>
            {incomeCat.map((proof) => {
              return (
                <li className="proofs  my-2" key={proof._id}>
                  <div className="det d-flex justify-content-between ">
                    <p>{proof.documentName}</p> <p>{proof.category}</p>
                    <div className="btns ">
                      <Button className="mx-2">+</Button>
                      <Button onClick={() => handleDelete(proof._id)}>-</Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <hr />
          <ol>
            {employeeCat.map((proof) => {
              return (
                <li className="proofs  my-2" key={proof._id}>
                  <div className="det d-flex justify-content-between ">
                    <p>{proof.documentName}</p> <p>{proof.category}</p>
                    <div className="btns ">
                      <Button className="mx-2">+</Button>
                      <Button onClick={() => handleDelete(proof._id)}>-</Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeProof;

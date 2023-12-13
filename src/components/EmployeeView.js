import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AddEmployee from "./AddEmployee";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://average-school-uniform-lamb.cyclic.app/api/employees/")
      .then((emp) => setEmployees(emp.data.employees))
      .catch((error) => console.log(error));
  }, []);
  console.log(employees);

  const handleDelete = async (id) => {
    if (window.confirm("Are sure to delete this employee")) {
      await axios
        .delete(
          `https://average-school-uniform-lamb.cyclic.app/api/employees/${id}`
        )
        .then((res) => {
          toast.success("employee deleted");
          window.location.reload();
        });
    }
  };
  return (
    <>
      <h3 className="text-center">Employee Lists</h3>
      <div>
        <button onClick={handleShow} className="btn btn-primary m-3">
          Add employee
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEmployee />
          </Modal.Body>
        </Modal>
      </div>

      <div className="emp-view d-flex ">
        {employees.map((employee) => {
          return (
            <Card style={{ width: "18rem" }} key={employee._id} className="m-3">
              <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {employee.department}
                </Card.Subtitle>
                <Card.Text>
                  <p>{employee.email}</p>
                </Card.Text>
              </Card.Body>
              <Link
                to={`/EmployeeProofs/${employee._id}`}
                className="btn btn-outline-primary"
              >
                view Proofs
              </Link>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(employee._id)}
              >
                Delete Employee
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default EmployeeView;

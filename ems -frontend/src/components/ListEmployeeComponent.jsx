import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);

    deleteEmployee(id)
      .then((response) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this employee?"
        );
        if (!confirmDelete) return;

        toast.success("🗑️ Employee deleted successfully!");
        getAllEmployees();
      })
      .catch((error) => {
        toast.error(" Failed to delete employee.");
        console.log(error);
      });
  }

  return (
     <div className="container py-4">
      <h2 className="mb-4 text-center">Employee Management System</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={addNewEmployee}>
          <i className="bi bi-person-plus-fill me-2"></i>
          Add Employee
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Employee Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    <i className="bi bi-trash-fill me-1"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

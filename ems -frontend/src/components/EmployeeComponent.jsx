import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setSalary(response.data.salary);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSalary(e) {
    setSalary(e.target.value);
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, salary };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            toast.success(" Employee updated successfully!");
            navigator("/employees");
          })
          .catch((error) => {
            toast.error(" Failed to update employee.");
            console.log(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            toast.success(" Employee added successfully!");
            navigator("/employees");
          })
          .catch((error) => {
            toast.error(" Failed to add employee.");
            console.log(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email is required";
      valid = false;
    }

    const salaryAsString = String(salary);
    if (salaryAsString.trim()) {
      errorCopy.salary = "";
    } else {
      errorCopy.salary = "Salary is required";
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container py-4 flex-grow-1">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h4>{pageTitle()}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={saveOrUpdateEmployee} className="mb-3">
            {/* First Name */}
            <div className="form-group mb-3">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                placeholder="Enter Employee First Name"
                name="firstName"
                value={firstName}
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                onChange={handleFirstName}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                name="lastName"
                value={lastName}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                onChange={handleLastName}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                placeholder="Enter Employee Email"
                name="email"
                value={email}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={handleEmail}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Salary */}
            <div className="form-group mb-4">
              <label className="form-label">Salary:</label>
              <input
                type="number"
                placeholder="Enter Employee Salary"
                name="salary"
                value={salary}
                className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                onChange={handleSalary}
              />
              {errors.salary && (
                <div className="invalid-feedback">{errors.salary}</div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigator("/employees")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default EmployeeComponent;

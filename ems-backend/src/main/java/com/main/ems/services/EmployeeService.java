package com.main.ems.services;

import com.main.ems.entities.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    public Employee createEmployee(Employee employee);

    public List<Employee> getAllEmployee();

    public Optional<Employee> getEmployeeDetails(long id);

    public Employee updateEmployeeDetails(long id, Employee employee);

    public void deleteEmployeeDetails(long id);

}

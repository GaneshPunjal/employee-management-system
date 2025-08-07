package com.main.ems.services;

import com.main.ems.entities.Employee;
import com.main.ems.repositories.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepo.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeDetails(long id) {
        return employeeRepo.findById(id);
    }

    @Override
    public Employee updateEmployeeDetails(long id, Employee newEmployee) {
        Employee employeeData = employeeRepo.findById(id).orElse(null);
        if (employeeData != null) {
            employeeData.setFirstName(newEmployee.getFirstName());
            employeeData.setLastName(newEmployee.getLastName());
            employeeData.setEmail(newEmployee.getEmail());
            employeeData.setSalary(newEmployee.getSalary());

            return employeeRepo.save(employeeData);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    @Override
    public void deleteEmployeeDetails(long id) {
        employeeRepo.deleteById(id);
    }
}

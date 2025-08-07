package com.main.ems.controllers;

import com.main.ems.entities.Employee;
import com.main.ems.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employees")
    public Employee addEmployeeDetails(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployeeDetails(){
        return employeeService.getAllEmployee();
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeDetails(@PathVariable long id){
        Employee employee = employeeService.getEmployeeDetails(id).orElse(null);
        if (employee != null)
        {
            return ResponseEntity.ok().body(employee);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployeeDetails(@PathVariable long id , @RequestBody Employee employee)
    {
        Employee updatedEmployee = employeeService.updateEmployeeDetails(id, employee);
        if (updatedEmployee != null)
        {
            return ResponseEntity.ok(updatedEmployee);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployeeDetails(@PathVariable long id)
    {
        employeeService.deleteEmployeeDetails(id);
        return ResponseEntity.ok("user deleted successfully");
    }
}

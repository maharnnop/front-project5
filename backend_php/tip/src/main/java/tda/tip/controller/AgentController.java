package tda.tip.controller;

import java.util.List;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import tda.tip.Repository.AgentRepository;
import tda.tip.entity.Agent;
import tda.tip.entity.EmployeeRole;
import tda.tip.Repository.EmployeeRoleRepository;


@RestController
public class AgentController {
    @Autowired
    private AgentRepository agentRepository;

    @GetMapping(value="/agent")
    public List<Agent> getEmployees() {
        // Employee dang = new Employee("dang","red",10000);
        // employeeRepository.save(dang);
        List<Agent> employees = agentRepository.findAll();
        return employees;
    }
    
    @GetMapping(value = "/agent/{id}")
    public ResponseEntity<Agent> getEmployee(@PathVariable("id") int id) {
        Optional<Agent> opt = agentRepository.findById(id);
        if (opt.isPresent())
            return new ResponseEntity<Agent>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<Agent>(HttpStatus.NOT_FOUND);
    }
    

    @PutMapping (value = "/agent/{id}")
    public ResponseEntity<Agent> putEmployee(@PathVariable("id") int id,
        @RequestParam("firstname") String firstname,
        @RequestParam("lastname") String lastname,
        @RequestParam("salary") int salary
    ) {
        Optional<Agent> opt = agentRepository.findById(id);
        if (!opt.isPresent())
            return new ResponseEntity<Agent>(HttpStatus.NOT_FOUND);
       
        Agent agent = opt.get();
        agent.setFirstName(firstname);
        agent.setLastName(lastname);
        agentRepository.save(agent);
        return new ResponseEntity<Agent>(agent, HttpStatus.OK);
    }

    @DeleteMapping(value = "/agent/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id) {
        try {
            agentRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("deleted done",HttpStatus.OK);
    }
        
    //day6 many to many
    @PostMapping(value="/agent")
    public ResponseEntity<Agent> postEmployees(@RequestBody Agent agent
    		// @RequestParam("firstname") String firstname,
    		// @RequestParam("lastname") String lastname,
    		// @RequestParam("salary") int salary
    ) {
        // EmployeeRole empRole, empRole2;
        // if (employeeRoleRepository.existsById(1)){
        //     empRole=employeeRoleRepository.findById(1).get();
        //     empRole2=employeeRoleRepository.findById(2).get();
        // }
        // else{
        //     empRole = new EmployeeRole("Programmer");
        //     empRole2 = new EmployeeRole("Programmer2");
        //     employeeRoleRepository.save(empRole);
        //     employeeRoleRepository.save(empRole2);
        // }
        // // Employee emp = new Employee(firstname,lastname, salary);
        // HashSet set = new HashSet<EmployeeRole>();
        // set.add(empRole);
        // set.add(empRole2);
        // emp.setEmployeeRoles(set);
        agentRepository.save(agent);
        return new ResponseEntity<Agent>(agent, HttpStatus.OK);
    }
}

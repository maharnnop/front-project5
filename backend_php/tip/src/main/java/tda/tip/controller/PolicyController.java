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

import tda.tip.entity.TipPolicy;
import tda.tip.entity.EmployeeRole;
import tda.tip.Repository.EmployeeRoleRepository;
import tda.tip.Repository.PolicyRepository;
import tda.tip.entity.Agent;

@RestController
public class PolicyController {
    @Autowired
    private PolicyRepository policyRepository;

    @GetMapping(value="/policy")
    public List<TipPolicy> getPolicys() {
        // Employee dang = new Employee("dang","red",10000);
        // employeeRepository.save(dang);
        List<TipPolicy> policys = policyRepository.findAll();
        return policys;
    }
    
    @GetMapping(value = "/policy/{id}")
    public ResponseEntity<TipPolicy> getPolicy(@PathVariable("id") int id) {
        Optional<TipPolicy> opt = policyRepository.findById(id);
        if (opt.isPresent())
            return new ResponseEntity<TipPolicy>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<TipPolicy>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping(value = "/policy/agent")
    public ResponseEntity<List<TipPolicy>> getPolicyAgent(@RequestBody TipPolicy policy) {
        Integer agentId = policy.getAgentId();
        Optional<List<TipPolicy>> opt = policyRepository.findByAgentId(agentId);
        if (opt.isPresent())
            return new ResponseEntity<List<TipPolicy>>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<List<TipPolicy>>(HttpStatus.NOT_FOUND);
    }

    @PutMapping (value = "/policy/{id}")
    public ResponseEntity<TipPolicy> putPolicy(@PathVariable("id") int id,
        @RequestParam("firstname") String firstname,
        @RequestParam("lastname") String lastname
    ) {
        Optional<TipPolicy> opt = policyRepository.findById(id);
        if (!opt.isPresent())
            return new ResponseEntity<TipPolicy>(HttpStatus.NOT_FOUND);
       
            TipPolicy policy = opt.get();
        policy.setFirstName(firstname);
        policy.setLastName(lastname);
        policyRepository.save(policy);
        return new ResponseEntity<TipPolicy>(policy, HttpStatus.OK);
    }

    @DeleteMapping(value = "/policy/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable("id") int id) {
        try {
            policyRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("deleted done",HttpStatus.OK);
    }
        
    //day6 many to many
    @PostMapping(value="/policy")
    public ResponseEntity<TipPolicy> postPolicy(@RequestBody TipPolicy policy
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
        policyRepository.save(policy);
        return new ResponseEntity<TipPolicy>(policy, HttpStatus.OK);
    }
}

package tda.tip.controller;

import java.util.List;
import java.util.ArrayList;
// import java.util.HashSet;
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
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// import tda.tip.Repository.AgentRepository;
// import tda.tip.entity.Agent;
import tda.tip.entity.TipRegister;
import tda.tip.entity.AgentUser;
import tda.tip.Repository.AgentUserRepository;
import tda.tip.Repository.TipRegisterRepository;


@RestController
public class AgentUserController  {
    // @Autowired
    // private AgentRepository agentRepository;

    @Autowired
    private AgentUserRepository agentUserRepository;

    @Autowired
    private TipRegisterRepository tipRegisterRepository;

    @GetMapping(value="/agent-user")
    public List<AgentUser> getall() {
        // Employee dang = new Employee("dang","red",10000);
        // employeeRepository.save(dang);
        List<AgentUser> rel = agentUserRepository.findAll();
        return rel;
    }
    
    @GetMapping(value="/agent-user/all/{id}")
    public ResponseEntity<List<TipRegister>> getUser(@PathVariable("id") Integer id) {
        // Employee dang = new Employee("dang","red",10000);
        // employeeRepository.save(dang);
        List<AgentUser> data = agentUserRepository.findByAgent(id);
        List<TipRegister> allUser = new ArrayList<>();
        for (AgentUser ele : data) {
            Optional<TipRegister> user = tipRegisterRepository.findById(ele.getUserId());
            if(user.isPresent()){
            user.get().setAgentUserId(ele.getId());
            allUser.add(user.get());}
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        return new ResponseEntity<List<TipRegister>>(allUser, HttpStatus.OK);
    }


    @GetMapping(value = "/agent-user/{id}")
    public ResponseEntity<AgentUser> getEmployee(@PathVariable("id") int id) {
        Optional<AgentUser> opt = agentUserRepository.findById(id);
        if (opt.isPresent())
            return new ResponseEntity<AgentUser>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<AgentUser>(HttpStatus.NOT_FOUND);
    }
    

    @PutMapping (value = "/agent-user/{id}")
    public ResponseEntity<AgentUser> putEmployee(@PathVariable("id") int id,
        @RequestBody AgentUser agentUser
    ) {
        Optional<AgentUser> opt = agentUserRepository.findById(id);
        if (!opt.isPresent())
            return new ResponseEntity<AgentUser>(HttpStatus.NOT_FOUND);
       
        AgentUser editAgent = opt.get();
        editAgent.setAgentId(agentUser.getAgentId());
        editAgent.setUserId(agentUser.getUserId());
        agentUserRepository.save(editAgent);
        return new ResponseEntity<AgentUser>(editAgent, HttpStatus.OK);
    }

    @DeleteMapping(value = "/agent-user/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id) {
        try {
            agentUserRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("deleted done",HttpStatus.OK);
    }
        
    //day6 many to many
    @PostMapping(value="/agent-user")
    public ResponseEntity<AgentUser> postEmployees(@RequestBody AgentUser agentUser) {
        Optional<TipRegister> user = tipRegisterRepository.findById(agentUser.getUserId());
        if(!user.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
        
        agentUserRepository.save(agentUser);
        return new ResponseEntity<AgentUser>(agentUser, HttpStatus.OK);
    }
}
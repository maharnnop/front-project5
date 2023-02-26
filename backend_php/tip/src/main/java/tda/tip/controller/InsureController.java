package tda.tip.controller;

import java.util.List;
// import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
// import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import tda.tip.entity.TipInsure;
// import tda.tip.Repository.AgentUserRepository;
import tda.tip.Repository.InsureRepository;


@RestController
public class InsureController {
    @Autowired
    private InsureRepository insureRepository;

    @GetMapping(value="/insure")
    public List<TipInsure> getInsures() {
        // Employee dang = new Employee("dang","red",10000);
        // employeeRepository.save(dang);
        List<TipInsure> insures = insureRepository.findAll();
        return insures;
    }
    
    @GetMapping(value = "/insure/{id}")
    public ResponseEntity<TipInsure> getInsure(@PathVariable("id") int id) {
        Optional<TipInsure> opt = insureRepository.findById(id);
        if (opt.isPresent())
            return new ResponseEntity<TipInsure>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<TipInsure>(HttpStatus.NOT_FOUND);
    }

    @PutMapping (value = "/insure/{id}")
    public ResponseEntity<TipInsure> putInsure(@PathVariable("id") int id,
        @RequestBody TipInsure tipInsure
    ) {
        Optional<TipInsure> opt = insureRepository.findById(id);
        if (!opt.isPresent())
            return new ResponseEntity<TipInsure>(HttpStatus.NOT_FOUND);
       
            TipInsure editAgent = opt.get();
        // editAgent.setAgentId(agentUser.getAgentId());
        // editAgent.setUserId(agentUser.getUserId());
        insureRepository.save(tipInsure);
        return new ResponseEntity<TipInsure>(tipInsure, HttpStatus.OK);
    }
}
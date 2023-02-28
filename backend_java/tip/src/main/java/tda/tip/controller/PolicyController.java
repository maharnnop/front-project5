package tda.tip.controller;

import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
// import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.http.ResponseEntity;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import tda.tip.entity.EmailDetails;
import tda.tip.entity.TipInsure;
import tda.tip.entity.TipPolicy;
import tda.tip.service.EmailService;
import tda.tip.Repository.InsureRepository;
// import tda.tip.Repository.AgentUserRepository;
import tda.tip.Repository.PolicyRepository;
// import tda.tip.entity.Agent;

@RestController
public class PolicyController {
    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private InsureRepository insureRepository;

    @GetMapping(value = "/policy")
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
    // find policy all
    @PostMapping(value = "/policy/agent")
    public ResponseEntity<List<TipPolicy>> getPolicyAgent(@RequestBody TipPolicy policy) {
        Integer agentId = policy.getAgentId();
        Optional<List<TipPolicy>> opt = policyRepository.findByAgentId(agentId);
        if (opt.isPresent())
            return new ResponseEntity<List<TipPolicy>>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<List<TipPolicy>>(HttpStatus.NOT_FOUND);
    }
    // find draft all
    @PostMapping(value = "/draft/agent")
    public ResponseEntity<List<TipPolicy>> getDraftAgent(@RequestBody TipPolicy policy) {
        Integer agentId = policy.getAgentId();
        Optional<List<TipPolicy>> opt = policyRepository.findDraftByAgentId(agentId);
        if (opt.isPresent())
            return new ResponseEntity<List<TipPolicy>>(opt.get(), HttpStatus.OK);
        else
            return new ResponseEntity<List<TipPolicy>>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/policy/{id}")
    public ResponseEntity<TipPolicy> putPolicy(@PathVariable("id") int id,
            @RequestBody TipPolicy editPolicy) {
        Optional<TipPolicy> opt = policyRepository.findById(id);
        if (!opt.isPresent())
            return new ResponseEntity<TipPolicy>(HttpStatus.NOT_FOUND);

        TipPolicy policy = opt.get();

        policyRepository.save(editPolicy);
        if( !editPolicy.getIsDraft()){

            EmailDetails details = new EmailDetails();
            details.setRecipient(editPolicy.getEmail());
            String msgBody = "Comfirmation buy insuance ";
            details.setMsgBody(msgBody);
            details.setSubject("Policy Comfirm");
            Optional<TipInsure> tipInsure = insureRepository.findById(editPolicy.getInsureId());
            try {        
        ObjectMapper mapObject = new ObjectMapper();
        Map < String, Object > mapObj = mapObject.convertValue(editPolicy, Map.class);
        String pattern = "MM/dd/yyyy";
        DateFormat df = new SimpleDateFormat(pattern);
        mapObj.put("coverDate", df.format(editPolicy.getCoverDate()));
        mapObj.put("birthDate", df.format(editPolicy.getBirthDate() ));
        mapObj.put("endDate", df.format(editPolicy.getEndDate() ));
        mapObj.put("returnAlive", tipInsure.get().getReturnAlive());
        mapObj.put("returnDead", tipInsure.get().getReturnDead());
        mapObj.put("returnDisability", tipInsure.get().getReturnDisability());
        JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(Arrays.asList(mapObj), false);
    
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/policy-agent.jrxml"));
    
        JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, null,beanCollectionDataSource);
        JasperExportManager.exportReportToPdfFile(jasperPrint,"policy.pdf");
    
            String status= emailService.sendMailWithAttachment(details);
            
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }
        return new ResponseEntity<TipPolicy>(editPolicy, HttpStatus.OK);
    }

    @DeleteMapping(value = "/policy/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable("id") int id) {
        try {
            policyRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("deleted done", HttpStatus.OK);
    }

    // create
    @PostMapping(value="/policy")
    public ResponseEntity<TipPolicy> postPolicy(@RequestBody TipPolicy policy    ) {
        policyRepository.save(policy);
        if(!policy.getIsDraft()){

        
        EmailDetails details = new EmailDetails();
        details.setRecipient(policy.getEmail());
        String msgBody = "Comfirmation buy insuance ";
        details.setMsgBody(msgBody);
        details.setSubject("Policy Comfirm");
        Optional<TipInsure> tipInsure = insureRepository.findById(policy.getInsureId());
        try {        
    ObjectMapper mapObject = new ObjectMapper();
    Map < String, Object > mapObj = mapObject.convertValue(policy, Map.class);
    String pattern = "MM/dd/yyyy";
    DateFormat df = new SimpleDateFormat(pattern);
    mapObj.put("coverDate", df.format(policy.getCoverDate()));
    mapObj.put("birthDate", df.format(policy.getBirthDate() ));
    mapObj.put("endDate", df.format(policy.getEndDate() ));
    mapObj.put("returnAlive", tipInsure.get().getReturnAlive());
    mapObj.put("returnDead", tipInsure.get().getReturnDead());
    mapObj.put("returnDisability", tipInsure.get().getReturnDisability());
    JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(Arrays.asList(mapObj), false);

    JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/policy-agent.jrxml"));

    JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, null,beanCollectionDataSource);
    JasperExportManager.exportReportToPdfFile(jasperPrint,"policy.pdf");

        String status= emailService.sendMailWithAttachment(details);
        
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }return new ResponseEntity<TipPolicy>(policy,HttpStatus.OK);
    }
}

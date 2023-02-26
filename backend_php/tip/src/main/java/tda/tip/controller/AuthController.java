package tda.tip.controller;



import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import tda.tip.Repository.AgentRepository;
import tda.tip.Repository.PolicyRepository;
import tda.tip.entity.Agent;
import tda.tip.service.TokenService;
import tda.tip.entity.EmailDetails;
import tda.tip.entity.TipPolicy;
import tda.tip.service.EmailService;

@RestController
public class AuthController {
    
    @Autowired
    private TokenService tokenService;

    @Autowired
    private AgentRepository agentRepository;
    
    @Autowired
    private PolicyRepository policyRepository;
    
    @Autowired 
    private EmailService emailService;

    public AuthController(TokenService tokenService){
        this.tokenService =tokenService;
    }
    // @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/token")
    public String token(Authentication authentication){
        System.out.println("Token requested for user: '{}' " +authentication.getName());
        String token = tokenService.generateToken(authentication);
        System.out.println("Token granted: {} " +token);
        
        return token;
    }

    @PostMapping("/signup")
    public ResponseEntity<HashMap<String, Object>> createAgent(@RequestBody Agent agent) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String password = agent.getPassword();
            String username = agent.getUsername();
            String hashedPassword = passwordEncoder.encode(password);
            agent.setPassword(hashedPassword);
            agentRepository.save(agent);
            Agent agt =  agentRepository.findByFullName(username);
            result.put("token", tokenService.generateToken(new UsernamePasswordAuthenticationToken(agt.getId(), password)));
            result.put("username", username );
            EmailDetails details = new EmailDetails();
            details.setRecipient(agent.getEmail());
            String msgBody = "Comfirmation register \n Username : "+username +"\n Password : "+password;
            details.setMsgBody(msgBody);
            details.setSubject("Registation Comfirm");
            String status= emailService.sendSimpleMail(details);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping ("/login")
    public ResponseEntity<HashMap<String, Object>> login (@RequestBody Agent data) 
        {   
            String username = data.getUsername();
            String password = data.getPassword();
            HashMap<String, Object> result = new HashMap<>();
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            Agent agent =  agentRepository.findByFullName(username);
            Boolean compareResult = passwordEncoder.matches( password,agent.getPassword());
            if (compareResult){
                
                result.put("token", tokenService.generateToken(new UsernamePasswordAuthenticationToken(agent.getId(), password)));
                result.put("username", username );
                return new ResponseEntity<>(result, HttpStatus.OK);
            }else {
                result.put("login status", "Failed");
                return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return null;
    }
    @GetMapping("/send-pdf")
    public ResponseEntity<HashMap<String, Object>> createPdf(@RequestBody TipPolicy input) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            Optional<TipPolicy> opt  = policyRepository.findById(input.getId());
            
            EmailDetails details = new EmailDetails();
            details.setRecipient(opt.get().getEmail());
            String msgBody = "Comfirmation buy insuance No. : "+opt.get().getId();
            details.setMsgBody(msgBody);
            details.setSubject("Policy Comfirm");
                
        ObjectMapper mapObject = new ObjectMapper();
		Map < String, Object > mapObj = mapObject.convertValue(opt.get(), Map.class);
		String pattern = "MM/dd/yyyy";
		DateFormat df = new SimpleDateFormat(pattern);
		mapObj.put("coverDate", df.format(opt.get().getCoverDate()));
		mapObj.put("birthDate", df.format(opt.get().getBirthDate() ));
		mapObj.put("endDate", df.format(opt.get().getEndDate() ));
		JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(Arrays.asList(mapObj), false);

		JasperReport compileReport = JasperCompileManager
				.compileReport(new FileInputStream("src/main/resources/policy-agent.jrxml"));

		JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, null,beanCollectionDataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"policy.pdf");
		// JasperExportManager.exportReportToPdfFile(jasperPrint,System.currentTimeMillis() + ".pdf");

		// byte data[] = JasperExportManager.exportReportToPdf(jasperPrint);
        // details.setAttachment("C:/Users/mahar/sei/projects/project5/backend_php/tip/policy.pdf");

            String status= emailService.sendMailWithAttachment(details);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

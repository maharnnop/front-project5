package tda.tip.controller;



import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import tda.tip.Repository.AgentRepository;
import tda.tip.entity.Agent;
import tda.tip.service.TokenService;
import tda.tip.entity.EmailDetails;
import tda.tip.service.EmailService;

@RestController
public class AuthController {
    
    @Autowired
    private TokenService tokenService;

    @Autowired
    private AgentRepository agentRepository;
    
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
            // details.setRecipient(username,password);
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
}

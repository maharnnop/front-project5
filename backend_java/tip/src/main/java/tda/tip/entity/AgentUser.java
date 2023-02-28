package tda.tip.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
// import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
public class AgentUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer agentId;
    private Integer userId;
   
    
    public AgentUser(Integer agentId,Integer userId){

        this.agentId = agentId;
        this.userId = userId;
    }

    public AgentUser(){}

    public Integer getAgentId() {return agentId;}
    public void setAgentId(Integer agentId) {this.agentId = agentId;}
    
    public Integer getUserId() {return userId;}
    public void setUserId(Integer userId) {this.userId = userId;}
    
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    
}

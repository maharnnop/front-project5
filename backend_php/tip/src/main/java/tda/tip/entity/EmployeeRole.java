package tda.tip.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
public class EmployeeRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String roleName;

    @ManyToMany
    @JsonIgnore
    private Set<Agent> agent;


    public EmployeeRole(String rolename){
        this.roleName = rolename;
    }

    public EmployeeRole(){
    
}

    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<Agent> getEmployee(){
        return agent;
    }
    public void setEmployee(Set<Agent> employee){
        this.agent = employee;

    }
}

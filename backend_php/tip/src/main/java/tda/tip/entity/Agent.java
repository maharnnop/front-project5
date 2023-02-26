package tda.tip.entity;

import java.util.Date;
// import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.persistence.ManyToMany;
// import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@Entity
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Boolean isAgent;
    private String title;
    private String firstName;
    private String lastName;
    private String location1;
    private String location2;
    private String location3;
    private String location4;
    private String location5;
    private String location6;
    private String idCard;
    private String phoneNumber;
    private String licentNo;
    private Date licentExp;

    @Column(unique=true)
    private String username;
    private String password;
    private String email;
    private Date created;
    private Date updated;
  
    @PrePersist
    protected void onCreate(){
        created = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        updated = new Date();
    }

    public Agent( String username, String password) {
        this.username = username;
        this.password = password;
    }
    public Agent( String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        
    }
    
    public Agent() {}
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Boolean getIsAgent() {return isAgent;}
    public void setIsAgent(Boolean isAgent) {this.isAgent = isAgent;}
    
    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}
    
    public String getLocation1() {return location1;}
    public void setLocation1(String location1) {this.location1 = location1;}

    public String getLocation2() {return location2;}
    public void setLocation2(String location2) {this.location2 = location2;}

    public String getLocation3() {return location3;}
    public void setLocation3(String location3) {this.location3 = location3;}

    public String getLocation4() {return location4;}
    public void setLocation4(String location4) {this.location4 = location4;}
    
    public String getLocation5() {return location5;}
    public void setLocation5(String location5) {this.location5 = location5;}

    public String getLocation6() {return location6;}
    public void setLocation6(String location6) {this.location6 = location6;}

    public String getIdCard() {return idCard;}
    public void setIdCard(String idCard) {this.idCard = idCard;}

    public String getPhoneNumber() {return phoneNumber;}
    public void setPhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}

    public String getLicentNo() {return licentNo;}
    public void setLicentNo(String licentNo) {this.licentNo = licentNo;}

    public Date getLicentExp() {return licentExp;}
    public void setLicentExp(Date licentExp) {this.licentExp = licentExp;}
    
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public Date getCreated() {return created;}
    public void setCreated(Date created) {this.created = created;}
   
    public Date getUpdated() {return updated;}
    public void setUpdated(Date updated) {this.updated = updated;}
}

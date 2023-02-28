package tda.tip.entity;

import java.util.Date;
// import java.util.Set;

// import javax.persistence.Column;
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
public class TipPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer insureId;
    private String insureName;
    private Integer userId;
    private Integer agentId;
    private String title;
    private String firstName;
    private String lastName;
    private String idCard;
    private String location1;
    private String location2;
    private String location3;
    private String location4;
    private String location5;
    private String location6;
    private String email;
    private String phoneNumber;
    private Date birthDate;
    private Date coverDate;
    private Date endDate;
    private Integer premium;
    private String benifyFirstName;
    private String benifyLastName;
    private String benifyRelation;
    private Boolean isDraft;
  
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
    
    
    public TipPolicy() {}

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Integer getInsureId() {return insureId;}
    public void setInsureId(Integer insureId) {this.insureId = insureId;}
    
    public String getInsureName() {return insureName;}
    public void setInsureName(String insureName) {this.insureName = insureName;}
   
    public Integer getUserId() {return userId;}
    public void setUserId(Integer userId) {this.userId = userId;}

    public Integer getAgentId() {return agentId;}
    public void setAgentId(Integer agentId) {this.agentId = agentId;}
    
    public Boolean getIsDraft() {return isDraft;}
    public void setIsDraft(Boolean isDraft) {this.isDraft = isDraft;}
    
    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public Date getBirthDate() {return birthDate;}
    public void setBirthDate(Date birthDate) {this.birthDate = birthDate;}
    
    public Date getCoverDate() {return coverDate;}
    public void setCoverDate(Date coverDate) {this.coverDate = coverDate;}
    
    public Date getEndDate() {return endDate;}
    public void setEndDate(Date endDate) {this.endDate = endDate;}
    
    public Integer getPremium() {return premium;}
    public void setPremium(Integer premium) {this.premium = premium;}
    
    public String getBenifyFirstName() {return benifyFirstName;}
    public void setBenifyFirstName(String benifyFirstName) {this.benifyFirstName = benifyFirstName;}
    
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
        
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
      
    public String getBenifyLastName() {return benifyLastName;}
    public void setBenifyLastName(String benifyLastName) {this.benifyLastName = benifyLastName;}

    public String getBenifyRelation() {return benifyRelation;}
    public void setBenifyRelation(String benifyRelation) {this.benifyRelation = benifyRelation;}


    public Date getCreated() {return created;}
    public void setCreated(Date created) {this.created = created;}
   
    public Date getUpdated() {return updated;}
    public void setUpdated(Date updated) {this.updated = updated;}
}

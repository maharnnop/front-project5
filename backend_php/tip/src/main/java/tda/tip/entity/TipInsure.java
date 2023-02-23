package tda.tip.entity;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@Entity
public class TipInsure {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    private String name;
    private String descript;
    private Integer premium; 
    private Integer periodDay;   
    private String returnAlive; 
    private String returnDead;  
    private String returnDisability;   
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

    public TipInsure() {}    

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}
    
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescript() {return descript;}
    public void setDescript(String descript) {this.descript = descript;}

    public Integer getPremium() {return premium;}
    public void setPremium(Integer premium) {this.premium = premium;}

    public Integer getPeriodDay() {return periodDay;}
    public void setPeriodDay(Integer periodDay) {this.periodDay = periodDay;}

    public String getReturnAlive() {return returnAlive;}
    public void setReturnAlive(String returnAlive) {this.returnAlive = returnAlive;}

    public String getReturnDead() {return returnDead;}
    public void setReturnDead(String returnDead) {this.returnDead = returnDead;}

    public String getReturnDisability() {return returnDisability;}
    public void setReturnDisability(String returnDisability) {this.returnDisability = returnDisability;}
    
    public Date getCreated() {return created;}
    public void setCreated(Date created) {this.created = created;}
   
    public Date getUpdated() {return updated;}
    public void setUpdated(Date updated) {this.updated = updated;}
}

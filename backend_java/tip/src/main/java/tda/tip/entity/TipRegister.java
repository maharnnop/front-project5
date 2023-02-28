package tda.tip.entity;

// import java.util.Date;
// import java.util.Set;

// import javax.persistence.Column;
import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
import javax.persistence.Id;
// import javax.persistence.JoinColumn;
// import javax.persistence.ManyToMany;
// import javax.persistence.ManyToOne;
// import javax.persistence.PrePersist;
// import javax.persistence.PreUpdate;

@Entity
public class TipRegister {
    @Id
    private Integer id;
    private Integer agentUserId;
    private String title;
    private String firstName;
    private String lastName;
    private String idCard;
    private String username;

    public TipRegister( ) {}
   
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Integer getAgentUserId() {return agentUserId;}
    public void setAgentUserId(Integer agentUserId) {this.agentUserId = agentUserId;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getIdCard() {return idCard;}
    public void setIdCard(String idCard) {this.idCard = idCard;}
    
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    
}

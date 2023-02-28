package tda.tip.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import tda.tip.entity.AgentUser;

@Repository
public interface AgentUserRepository extends JpaRepository<AgentUser,Integer> {

    @Query(
        value = "SELECT * FROM agent_user WHERE agent_id = ?1 ",
        nativeQuery = true)
        public List<AgentUser> findByAgent(Integer agentId);
}

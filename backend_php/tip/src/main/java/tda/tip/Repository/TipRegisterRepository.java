
package tda.tip.Repository;
// import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// import org.springframework.data.jpa.repository.Query;
import tda.tip.entity.TipRegister;

@Repository
public interface  TipRegisterRepository extends JpaRepository<TipRegister,Integer> {

    // @Query(
    //     value = "SELECT * FROM agent_user WHERE agent_id = ?1 ",
    //     nativeQuery = true)
    //     public List<User> findByAgent(int id);
}
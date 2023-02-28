package tda.tip.Repository;

import org.springframework.stereotype.Repository;
import tda.tip.entity.TipPolicy;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PolicyRepository extends JpaRepository <TipPolicy, Integer>
{
    @Query(
        value = "SELECT * FROM tip_policy WHERE username = ?1 ",
        nativeQuery = true)
        public TipPolicy findByUserName(String userName);

        @Query(
        value = "SELECT * FROM tip_policy WHERE agent_id = ?1 AND is_draft = false",
        nativeQuery = true)
        public Optional<List<TipPolicy>> findByAgentId(Integer id) ;
        @Query(
        value = "SELECT * FROM tip_policy WHERE agent_id = ?1 AND is_draft = true",
        nativeQuery = true)
        public Optional<List<TipPolicy>> findDraftByAgentId(Integer id) ;
}
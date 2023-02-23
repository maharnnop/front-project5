package tda.tip.Repository;

import org.springframework.stereotype.Repository;
import tda.tip.entity.TipInsure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface  InsureRepository extends JpaRepository <TipInsure, Integer>
{
    
}
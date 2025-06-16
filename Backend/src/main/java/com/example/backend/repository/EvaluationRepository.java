package com.example.backend.repository;

import com.example.backend.model.Evaluation;
import com.example.backend.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByAuteur(Utilisateur auteur);
    List<Evaluation> findByCible(Utilisateur cible);
    
    @Query("SELECT AVG(e.note) FROM Evaluation e WHERE e.cible = :utilisateur")
    Double findMoyenneNotesByUtilisateur(Utilisateur utilisateur);
    
    List<Evaluation> findByDemandeId(Long demandeId);
    
    @Query("SELECT e FROM Evaluation e WHERE e.cible = :utilisateur ORDER BY e.id DESC")
    List<Evaluation> findDernieresEvaluationsByUtilisateur(Utilisateur utilisateur);
} 
package com.example.backend.repository;

import com.example.backend.model.Demande;
import com.example.backend.model.StatutDemande;
import com.example.backend.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findByExpediteur(Utilisateur expediteur);
    List<Demande> findByAnnonceId(Long annonceId);
    List<Demande> findByStatut(StatutDemande statut);
    List<Demande> findByExpediteurAndStatut(Utilisateur expediteur, StatutDemande statut);
    List<Demande> findByAnnonceConducteurAndStatut(Utilisateur conducteur, StatutDemande statut);
} 
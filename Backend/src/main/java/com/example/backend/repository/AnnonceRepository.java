package com.example.backend.repository;

import com.example.backend.model.Annonce;
import com.example.backend.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    List<Annonce> findByConducteur(Utilisateur conducteur);
    
    @Query("SELECT a FROM Annonce a WHERE a.dateTrajet > :now ORDER BY a.dateTrajet ASC")
    List<Annonce> findAnnoncesFutures(LocalDateTime now);
    
    List<Annonce> findByDestinationContainingIgnoreCase(String destination);
    
    @Query("SELECT a FROM Annonce a WHERE a.capaciteDisponible >= :capaciteMin")
    List<Annonce> findByCapaciteDisponibleSuperieure(Float capaciteMin);
    
    List<Annonce> findByTypeMarchandiseContainingIgnoreCase(String typeMarchandise);
} 
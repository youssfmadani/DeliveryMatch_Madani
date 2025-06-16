package com.example.backend.repository;

import com.example.backend.model.Notification;
import com.example.backend.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUtilisateur(Utilisateur utilisateur);
    List<Notification> findByUtilisateurAndLue(Utilisateur utilisateur, boolean lue);
    
    @Query("SELECT n FROM Notification n WHERE n.utilisateur = :utilisateur AND n.date > :date")
    List<Notification> findNotificationsRecentes(Utilisateur utilisateur, LocalDateTime date);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.utilisateur = :utilisateur AND n.lue = false")
    Long countNotificationsNonLues(Utilisateur utilisateur);
    
    void deleteByUtilisateurAndLue(Utilisateur utilisateur, boolean lue);
} 
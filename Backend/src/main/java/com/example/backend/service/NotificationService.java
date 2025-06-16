package com.example.backend.service;

import com.example.backend.model.Notification;
import com.example.backend.model.Utilisateur;
import com.example.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public Notification createNotification(Utilisateur utilisateur, String message) {
        Notification notification = new Notification();
        notification.setUtilisateur(utilisateur);
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setLue(false);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUtilisateur(Utilisateur utilisateur) {
        return notificationRepository.findByUtilisateur(utilisateur);
    }

    public List<Notification> getNotificationsNonLues(Utilisateur utilisateur) {
        return notificationRepository.findByUtilisateurAndLue(utilisateur, false);
    }

    public void marquerCommeLue(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification non trouvée"));
        notification.setLue(true);
        notificationRepository.save(notification);
    }

    public void marquerToutesCommeLues(Utilisateur utilisateur) {
        List<Notification> notifications = notificationRepository.findByUtilisateurAndLue(utilisateur, false);
        notifications.forEach(notification -> notification.setLue(true));
        notificationRepository.saveAll(notifications);
    }

    public Long countNotificationsNonLues(Utilisateur utilisateur) {
        return notificationRepository.countNotificationsNonLues(utilisateur);
    }

    public void supprimerNotificationsLues(Utilisateur utilisateur) {
        notificationRepository.deleteByUtilisateurAndLue(utilisateur, true);
    }
} 
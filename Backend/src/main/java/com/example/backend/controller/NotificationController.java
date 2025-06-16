package com.example.backend.controller;

import com.example.backend.model.Notification;
import com.example.backend.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification", description = "API de gestion des notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/utilisateur/{utilisateurId}")
    @Operation(summary = "Obtenir les notifications d'un utilisateur")
    @PreAuthorize("#utilisateurId == authentication.principal.id")
    public ResponseEntity<List<Notification>> getNotificationsByUtilisateur(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUtilisateur(utilisateurId));
    }

    @GetMapping("/utilisateur/{utilisateurId}/non-lues")
    @Operation(summary = "Obtenir les notifications non lues d'un utilisateur")
    @PreAuthorize("#utilisateurId == authentication.principal.id")
    public ResponseEntity<List<Notification>> getNotificationsNonLues(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(notificationService.getNotificationsNonLues(utilisateurId));
    }

    @PutMapping("/{id}/lue")
    @Operation(summary = "Marquer une notification comme lue")
    @PreAuthorize("hasAnyRole('EXPEDITEUR', 'CONDUCTEUR', 'ADMIN')")
    public ResponseEntity<Void> marquerCommeLue(@PathVariable Long id) {
        notificationService.marquerCommeLue(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/utilisateur/{utilisateurId}/toutes-lues")
    @Operation(summary = "Marquer toutes les notifications d'un utilisateur comme lues")
    @PreAuthorize("#utilisateurId == authentication.principal.id")
    public ResponseEntity<Void> marquerToutesCommeLues(@PathVariable Long utilisateurId) {
        notificationService.marquerToutesCommeLues(utilisateurId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/utilisateur/{utilisateurId}/count")
    @Operation(summary = "Obtenir le nombre de notifications non lues d'un utilisateur")
    @PreAuthorize("#utilisateurId == authentication.principal.id")
    public ResponseEntity<Long> countNotificationsNonLues(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(notificationService.countNotificationsNonLues(utilisateurId));
    }

    @DeleteMapping("/utilisateur/{utilisateurId}/lues")
    @Operation(summary = "Supprimer les notifications lues d'un utilisateur")
    @PreAuthorize("#utilisateurId == authentication.principal.id")
    public ResponseEntity<Void> supprimerNotificationsLues(@PathVariable Long utilisateurId) {
        notificationService.supprimerNotificationsLues(utilisateurId);
        return ResponseEntity.ok().build();
    }
} 
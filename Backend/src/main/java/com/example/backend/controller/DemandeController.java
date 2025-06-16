package com.example.backend.controller;

import com.example.backend.dto.DemandeDTO;
import com.example.backend.model.Demande;
import com.example.backend.model.StatutDemande;
import com.example.backend.service.DemandeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandes")
@RequiredArgsConstructor
@Tag(name = "Demande", description = "API de gestion des demandes de transport")
public class DemandeController {
    private final DemandeService demandeService;

    @PostMapping
    @Operation(summary = "Créer une nouvelle demande")
    @PreAuthorize("hasRole('EXPEDITEUR')")
    public ResponseEntity<DemandeDTO> createDemande(
            @Valid @RequestBody Demande demande,
            @RequestParam Long expediteurId,
            @RequestParam Long annonceId) {
        return ResponseEntity.ok(demandeService.createDemande(demande, expediteurId, annonceId));
    }

    @PutMapping("/{id}/statut")
    @Operation(summary = "Mettre à jour le statut d'une demande")
    @PreAuthorize("hasRole('CONDUCTEUR')")
    public ResponseEntity<DemandeDTO> updateStatutDemande(
            @PathVariable Long id,
            @RequestParam StatutDemande nouveauStatut) {
        return ResponseEntity.ok(demandeService.updateStatutDemande(id, nouveauStatut));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une demande")
    @PreAuthorize("hasRole('EXPEDITEUR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDemande(@PathVariable Long id) {
        demandeService.deleteDemande(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une demande par son ID")
    public ResponseEntity<DemandeDTO> getDemandeById(@PathVariable Long id) {
        return ResponseEntity.ok(demandeService.getDemandeById(id));
    }

    @GetMapping("/expediteur/{expediteurId}")
    @Operation(summary = "Obtenir les demandes d'un expéditeur")
    @PreAuthorize("hasRole('EXPEDITEUR')")
    public ResponseEntity<List<DemandeDTO>> getDemandesByExpediteur(@PathVariable Long expediteurId) {
        return ResponseEntity.ok(demandeService.getDemandesByExpediteur(expediteurId));
    }

    @GetMapping("/annonce/{annonceId}")
    @Operation(summary = "Obtenir les demandes d'une annonce")
    @PreAuthorize("hasRole('CONDUCTEUR')")
    public ResponseEntity<List<DemandeDTO>> getDemandesByAnnonce(@PathVariable Long annonceId) {
        return ResponseEntity.ok(demandeService.getDemandesByAnnonce(annonceId));
    }

    @GetMapping("/statut/{statut}")
    @Operation(summary = "Obtenir les demandes par statut")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DemandeDTO>> getDemandesByStatut(@PathVariable StatutDemande statut) {
        return ResponseEntity.ok(demandeService.getDemandesByStatut(statut));
    }
} 
package com.example.backend.controller;

import com.example.backend.dto.AnnonceDTO;
import com.example.backend.model.Annonce;
import com.example.backend.service.AnnonceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/annonces")
@RequiredArgsConstructor
@Tag(name = "Annonce", description = "API de gestion des annonces")
public class AnnonceController {
    private final AnnonceService annonceService;

    @PostMapping
    @Operation(summary = "Créer une nouvelle annonce")
    @PreAuthorize("hasRole('CONDUCTEUR')")
    public ResponseEntity<AnnonceDTO> createAnnonce(
            @Valid @RequestBody Annonce annonce,
            @RequestParam Long conducteurId) {
        return ResponseEntity.ok(annonceService.createAnnonce(annonce, conducteurId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une annonce")
    @PreAuthorize("hasRole('CONDUCTEUR')")
    public ResponseEntity<AnnonceDTO> updateAnnonce(
            @PathVariable Long id,
            @Valid @RequestBody Annonce annonce) {
        return ResponseEntity.ok(annonceService.updateAnnonce(id, annonce));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une annonce")
    @PreAuthorize("hasRole('CONDUCTEUR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteAnnonce(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une annonce par son ID")
    public ResponseEntity<AnnonceDTO> getAnnonceById(@PathVariable Long id) {
        return ResponseEntity.ok(annonceService.getAnnonceById(id));
    }

    @GetMapping
    @Operation(summary = "Obtenir toutes les annonces")
    public ResponseEntity<List<AnnonceDTO>> getAllAnnonces() {
        return ResponseEntity.ok(annonceService.getAllAnnonces());
    }

    @GetMapping("/conducteur/{conducteurId}")
    @Operation(summary = "Obtenir les annonces d'un conducteur")
    public ResponseEntity<List<AnnonceDTO>> getAnnoncesByConducteur(@PathVariable Long conducteurId) {
        return ResponseEntity.ok(annonceService.getAnnoncesByConducteur(conducteurId));
    }

    @GetMapping("/futures")
    @Operation(summary = "Obtenir les annonces futures")
    public ResponseEntity<List<AnnonceDTO>> getAnnoncesFutures() {
        return ResponseEntity.ok(annonceService.getAnnoncesFutures());
    }

    @GetMapping("/recherche")
    @Operation(summary = "Rechercher des annonces")
    public ResponseEntity<List<AnnonceDTO>> searchAnnonces(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String typeMarchandise,
            @RequestParam(required = false) Float capaciteMin) {
        return ResponseEntity.ok(annonceService.searchAnnonces(destination, typeMarchandise, capaciteMin));
    }
} 
package com.example.backend.controller;

import com.example.backend.dto.EvaluationDTO;
import com.example.backend.model.Evaluation;
import com.example.backend.service.EvaluationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
@RequiredArgsConstructor
@Tag(name = "Evaluation", description = "API de gestion des évaluations")
public class EvaluationController {
    private final EvaluationService evaluationService;

    @PostMapping
    @Operation(summary = "Créer une nouvelle évaluation")
    @PreAuthorize("hasAnyRole('EXPEDITEUR', 'CONDUCTEUR')")
    public ResponseEntity<EvaluationDTO> createEvaluation(
            @Valid @RequestBody Evaluation evaluation,
            @RequestParam Long auteurId,
            @RequestParam Long cibleId,
            @RequestParam Long demandeId) {
        return ResponseEntity.ok(evaluationService.createEvaluation(evaluation, auteurId, cibleId, demandeId));
    }

    @GetMapping("/cible/{cibleId}")
    @Operation(summary = "Obtenir les évaluations reçues par un utilisateur")
    public ResponseEntity<List<EvaluationDTO>> getEvaluationsByCible(@PathVariable Long cibleId) {
        return ResponseEntity.ok(evaluationService.getEvaluationsByCible(cibleId));
    }

    @GetMapping("/auteur/{auteurId}")
    @Operation(summary = "Obtenir les évaluations données par un utilisateur")
    public ResponseEntity<List<EvaluationDTO>> getEvaluationsByAuteur(@PathVariable Long auteurId) {
        return ResponseEntity.ok(evaluationService.getEvaluationsByAuteur(auteurId));
    }

    @GetMapping("/moyenne/{utilisateurId}")
    @Operation(summary = "Obtenir la moyenne des notes d'un utilisateur")
    public ResponseEntity<Double> getMoyenneNotesByUtilisateur(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(evaluationService.getMoyenneNotesByUtilisateur(utilisateurId));
    }

    @GetMapping("/dernieres/{utilisateurId}")
    @Operation(summary = "Obtenir les dernières évaluations d'un utilisateur")
    public ResponseEntity<List<EvaluationDTO>> getDernieresEvaluations(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(evaluationService.getDernieresEvaluations(utilisateurId));
    }
} 
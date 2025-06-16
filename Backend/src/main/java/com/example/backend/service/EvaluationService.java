package com.example.backend.service;

import com.example.backend.dto.EvaluationDTO;
import com.example.backend.model.*;
import com.example.backend.repository.DemandeRepository;
import com.example.backend.repository.EvaluationRepository;
import com.example.backend.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final DemandeRepository demandeRepository;
    private final NotificationService notificationService;

    public EvaluationDTO createEvaluation(Evaluation evaluation, Long auteurId, Long cibleId, Long demandeId) {
        Utilisateur auteur = utilisateurRepository.findById(auteurId)
                .orElseThrow(() -> new RuntimeException("Auteur non trouvé"));
        Utilisateur cible = utilisateurRepository.findById(cibleId)
                .orElseThrow(() -> new RuntimeException("Cible non trouvée"));
        Demande demande = demandeRepository.findById(demandeId)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));

        evaluation.setAuteur(auteur);
        evaluation.setCible(cible);
        evaluation.setDemande(demande);

        Evaluation savedEvaluation = evaluationRepository.save(evaluation);

        // Créer une notification pour l'utilisateur évalué
        notificationService.createNotification(
            cible,
            "Vous avez reçu une nouvelle évaluation de " + auteur.getPrenom() + " " + auteur.getNom()
        );

        return convertToDTO(savedEvaluation);
    }

    public List<EvaluationDTO> getEvaluationsByCible(Long cibleId) {
        Utilisateur cible = utilisateurRepository.findById(cibleId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return evaluationRepository.findByCible(cible).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EvaluationDTO> getEvaluationsByAuteur(Long auteurId) {
        Utilisateur auteur = utilisateurRepository.findById(auteurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return evaluationRepository.findByAuteur(auteur).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Double getMoyenneNotesByUtilisateur(Long utilisateurId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return evaluationRepository.findMoyenneNotesByUtilisateur(utilisateur);
    }

    public List<EvaluationDTO> getDernieresEvaluations(Long utilisateurId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return evaluationRepository.findDernieresEvaluationsByUtilisateur(utilisateur).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EvaluationDTO convertToDTO(Evaluation evaluation) {
        EvaluationDTO dto = new EvaluationDTO();
        dto.setId(evaluation.getId());
        dto.setAuteurId(evaluation.getAuteur().getId());
        dto.setAuteurNom(evaluation.getAuteur().getNom());
        dto.setAuteurPrenom(evaluation.getAuteur().getPrenom());
        dto.setCibleId(evaluation.getCible().getId());
        dto.setCibleNom(evaluation.getCible().getNom());
        dto.setCiblePrenom(evaluation.getCible().getPrenom());
        dto.setNote(evaluation.getNote());
        dto.setCommentaire(evaluation.getCommentaire());
        dto.setDemandeId(evaluation.getDemande().getId());
        return dto;
    }
} 
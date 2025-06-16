package com.example.backend.service;

import com.example.backend.dto.DemandeDTO;
import com.example.backend.model.*;
import com.example.backend.repository.AnnonceRepository;
import com.example.backend.repository.DemandeRepository;
import com.example.backend.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DemandeService {
    private final DemandeRepository demandeRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final AnnonceRepository annonceRepository;
    private final NotificationService notificationService;

    public DemandeDTO createDemande(Demande demande, Long expediteurId, Long annonceId) {
        Utilisateur expediteur = utilisateurRepository.findById(expediteurId)
                .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
        Annonce annonce = annonceRepository.findById(annonceId)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));

        demande.setExpediteur(expediteur);
        demande.setAnnonce(annonce);
        demande.setStatut(StatutDemande.EN_ATTENTE);

        Demande savedDemande = demandeRepository.save(demande);
        
        // Créer une notification pour le conducteur
        notificationService.createNotification(
            annonce.getConducteur(),
            "Nouvelle demande de transport reçue pour votre trajet vers " + annonce.getDestination()
        );

        return convertToDTO(savedDemande);
    }

    public DemandeDTO updateStatutDemande(Long id, StatutDemande nouveauStatut) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        
        demande.setStatut(nouveauStatut);
        Demande updatedDemande = demandeRepository.save(demande);

        // Créer une notification pour l'expéditeur
        String message = nouveauStatut == StatutDemande.ACCEPTEE ? 
            "Votre demande de transport a été acceptée" : 
            "Votre demande de transport a été refusée";
        notificationService.createNotification(demande.getExpediteur(), message);

        return convertToDTO(updatedDemande);
    }

    public void deleteDemande(Long id) {
        if (!demandeRepository.existsById(id)) {
            throw new RuntimeException("Demande non trouvée");
        }
        demandeRepository.deleteById(id);
    }

    public DemandeDTO getDemandeById(Long id) {
        return demandeRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
    }

    public List<DemandeDTO> getDemandesByExpediteur(Long expediteurId) {
        Utilisateur expediteur = utilisateurRepository.findById(expediteurId)
                .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
        return demandeRepository.findByExpediteur(expediteur).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DemandeDTO> getDemandesByAnnonce(Long annonceId) {
        return demandeRepository.findByAnnonceId(annonceId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DemandeDTO> getDemandesByStatut(StatutDemande statut) {
        return demandeRepository.findByStatut(statut).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private DemandeDTO convertToDTO(Demande demande) {
        DemandeDTO dto = new DemandeDTO();
        dto.setId(demande.getId());
        dto.setExpediteurId(demande.getExpediteur().getId());
        dto.setExpediteurNom(demande.getExpediteur().getNom());
        dto.setExpediteurPrenom(demande.getExpediteur().getPrenom());
        dto.setAnnonceId(demande.getAnnonce().getId());
        dto.setStatut(demande.getStatut());
        dto.setColisDimensions(demande.getColisDimensions());
        dto.setPoids(demande.getPoids());
        dto.setType(demande.getType());
        return dto;
    }
} 
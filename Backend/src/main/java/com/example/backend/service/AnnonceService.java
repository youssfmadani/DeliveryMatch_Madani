package com.example.backend.service;

import com.example.backend.dto.AnnonceDTO;
import com.example.backend.model.Annonce;
import com.example.backend.model.Utilisateur;
import com.example.backend.repository.AnnonceRepository;
import com.example.backend.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AnnonceService {
    private final AnnonceRepository annonceRepository;
    private final UtilisateurRepository utilisateurRepository;

    public AnnonceDTO createAnnonce(Annonce annonce, Long conducteurId) {
        Utilisateur conducteur = utilisateurRepository.findById(conducteurId)
                .orElseThrow(() -> new RuntimeException("Conducteur non trouvé"));
        annonce.setConducteur(conducteur);
        return convertToDTO(annonceRepository.save(annonce));
    }

    public AnnonceDTO updateAnnonce(Long id, Annonce annonce) {
        Annonce existingAnnonce = annonceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));
        
        existingAnnonce.setDepart(annonce.getDepart());
        existingAnnonce.setEtapes(annonce.getEtapes());
        existingAnnonce.setDestination(annonce.getDestination());
        existingAnnonce.setDateTrajet(annonce.getDateTrajet());
        existingAnnonce.setDimensionsMax(annonce.getDimensionsMax());
        existingAnnonce.setTypeMarchandise(annonce.getTypeMarchandise());
        existingAnnonce.setCapaciteDisponible(annonce.getCapaciteDisponible());
        
        return convertToDTO(annonceRepository.save(existingAnnonce));
    }

    public void deleteAnnonce(Long id) {
        if (!annonceRepository.existsById(id)) {
            throw new RuntimeException("Annonce non trouvée");
        }
        annonceRepository.deleteById(id);
    }

    public AnnonceDTO getAnnonceById(Long id) {
        return annonceRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée"));
    }

    public List<AnnonceDTO> getAllAnnonces() {
        return annonceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AnnonceDTO> getAnnoncesByConducteur(Long conducteurId) {
        Utilisateur conducteur = utilisateurRepository.findById(conducteurId)
                .orElseThrow(() -> new RuntimeException("Conducteur non trouvé"));
        return annonceRepository.findByConducteur(conducteur).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AnnonceDTO> getAnnoncesFutures() {
        return annonceRepository.findAnnoncesFutures(LocalDateTime.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AnnonceDTO> searchAnnonces(String destination, String typeMarchandise, Float capaciteMin) {
        List<Annonce> annonces = annonceRepository.findByDestinationContainingIgnoreCase(destination);
        if (typeMarchandise != null) {
            annonces = annonces.stream()
                    .filter(a -> a.getTypeMarchandise().toLowerCase().contains(typeMarchandise.toLowerCase()))
                    .collect(Collectors.toList());
        }
        if (capaciteMin != null) {
            annonces = annonces.stream()
                    .filter(a -> a.getCapaciteDisponible() >= capaciteMin)
                    .collect(Collectors.toList());
        }
        return annonces.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AnnonceDTO convertToDTO(Annonce annonce) {
        AnnonceDTO dto = new AnnonceDTO();
        dto.setId(annonce.getId());
        dto.setConducteurId(annonce.getConducteur().getId());
        dto.setConducteurNom(annonce.getConducteur().getNom());
        dto.setConducteurPrenom(annonce.getConducteur().getPrenom());
        dto.setDepart(annonce.getDepart());
        dto.setEtapes(annonce.getEtapes());
        dto.setDestination(annonce.getDestination());
        dto.setDateTrajet(annonce.getDateTrajet());
        dto.setDimensionsMax(annonce.getDimensionsMax());
        dto.setTypeMarchandise(annonce.getTypeMarchandise());
        dto.setCapaciteDisponible(annonce.getCapaciteDisponible());
        return dto;
    }
} 
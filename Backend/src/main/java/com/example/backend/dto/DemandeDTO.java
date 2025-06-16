package com.example.backend.dto;

import com.example.backend.model.StatutDemande;
import lombok.Data;

@Data
public class DemandeDTO {
    private Long id;
    private Long expediteurId;
    private String expediteurNom;
    private String expediteurPrenom;
    private Long annonceId;
    private StatutDemande statut;
    private String colisDimensions;
    private Float poids;
    private String type;
} 
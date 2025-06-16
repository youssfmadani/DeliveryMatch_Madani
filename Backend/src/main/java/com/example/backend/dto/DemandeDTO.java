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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getExpediteurId() {
        return expediteurId;
    }

    public void setExpediteurId(Long expediteurId) {
        this.expediteurId = expediteurId;
    }

    public String getExpediteurNom() {
        return expediteurNom;
    }

    public void setExpediteurNom(String expediteurNom) {
        this.expediteurNom = expediteurNom;
    }

    public String getExpediteurPrenom() {
        return expediteurPrenom;
    }

    public void setExpediteurPrenom(String expediteurPrenom) {
        this.expediteurPrenom = expediteurPrenom;
    }

    public Long getAnnonceId() {
        return annonceId;
    }

    public void setAnnonceId(Long annonceId) {
        this.annonceId = annonceId;
    }

    public StatutDemande getStatut() {
        return statut;
    }

    public void setStatut(StatutDemande statut) {
        this.statut = statut;
    }

    public String getColisDimensions() {
        return colisDimensions;
    }

    public void setColisDimensions(String colisDimensions) {
        this.colisDimensions = colisDimensions;
    }

    public Float getPoids() {
        return poids;
    }

    public void setPoids(Float poids) {
        this.poids = poids;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
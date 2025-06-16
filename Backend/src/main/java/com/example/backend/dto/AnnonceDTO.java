package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnnonceDTO {
    private Long id;
    private Long conducteurId;
    private String conducteurNom;
    private String conducteurPrenom;
    private String depart;
    private List<String> etapes;
    private String destination;
    private LocalDateTime dateTrajet;
    private String dimensionsMax;
    private String typeMarchandise;
    private Float capaciteDisponible;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getConducteurId() {
        return conducteurId;
    }

    public void setConducteurId(Long conducteurId) {
        this.conducteurId = conducteurId;
    }

    public String getConducteurNom() {
        return conducteurNom;
    }

    public void setConducteurNom(String conducteurNom) {
        this.conducteurNom = conducteurNom;
    }

    public String getConducteurPrenom() {
        return conducteurPrenom;
    }

    public void setConducteurPrenom(String conducteurPrenom) {
        this.conducteurPrenom = conducteurPrenom;
    }

    public String getDepart() {
        return depart;
    }

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public List<String> getEtapes() {
        return etapes;
    }

    public void setEtapes(List<String> etapes) {
        this.etapes = etapes;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDateTrajet() {
        return dateTrajet;
    }

    public void setDateTrajet(LocalDateTime dateTrajet) {
        this.dateTrajet = dateTrajet;
    }

    public String getDimensionsMax() {
        return dimensionsMax;
    }

    public void setDimensionsMax(String dimensionsMax) {
        this.dimensionsMax = dimensionsMax;
    }

    public String getTypeMarchandise() {
        return typeMarchandise;
    }

    public void setTypeMarchandise(String typeMarchandise) {
        this.typeMarchandise = typeMarchandise;
    }

    public Float getCapaciteDisponible() {
        return capaciteDisponible;
    }

    public void setCapaciteDisponible(Float capaciteDisponible) {
        this.capaciteDisponible = capaciteDisponible;
    }
}
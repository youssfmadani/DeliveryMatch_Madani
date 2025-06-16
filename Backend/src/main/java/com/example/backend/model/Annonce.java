package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "annonces")
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conducteur_id", nullable = false)
    private Utilisateur conducteur;

    @NotBlank
    @Column(nullable = false)
    private String depart;

    @ElementCollection
    @CollectionTable(name = "annonce_etapes", joinColumns = @JoinColumn(name = "annonce_id"))
    @Column(name = "etape")
    private List<String> etapes;

    @NotBlank
    @Column(nullable = false)
    private String destination;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime dateTrajet;

    @NotBlank
    @Column(nullable = false)
    private String dimensionsMax;

    @NotBlank
    @Column(nullable = false)
    private String typeMarchandise;

    @NotNull
    @Column(nullable = false)
    private Float capaciteDisponible;

    @OneToMany(mappedBy = "annonce")
    private List<Demande> demandes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getConducteur() {
        return conducteur;
    }

    public void setConducteur(Utilisateur conducteur) {
        this.conducteur = conducteur;
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

    public List<Demande> getDemandes() {
        return demandes;
    }

    public void setDemandes(List<Demande> demandes) {
        this.demandes = demandes;
    }
}
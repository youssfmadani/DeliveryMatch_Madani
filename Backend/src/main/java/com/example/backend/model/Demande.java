package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "demandes")
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expediteur_id", nullable = false)
    private Utilisateur expediteur;

    @ManyToOne
    @JoinColumn(name = "annonce_id", nullable = false)
    private Annonce annonce;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutDemande statut = StatutDemande.EN_ATTENTE;

    @NotBlank
    @Column(nullable = false)
    private String colisDimensions;

    @NotNull
    @Column(nullable = false)
    private Float poids;

    @NotBlank
    @Column(nullable = false)
    private String type;

    @OneToOne(mappedBy = "demande")
    private Evaluation evaluation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getExpediteur() {
        return expediteur;
    }

    public void setExpediteur(Utilisateur expediteur) {
        this.expediteur = expediteur;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
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

    public Evaluation getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
    }
}
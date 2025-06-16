package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "evaluations")
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "auteur_id", nullable = false)
    private Utilisateur auteur;

    @ManyToOne
    @JoinColumn(name = "cible_id", nullable = false)
    private Utilisateur cible;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer note;

    @Column(length = 1000)
    private String commentaire;

    @OneToOne
    @JoinColumn(name = "demande_id")
    private Demande demande;
} 
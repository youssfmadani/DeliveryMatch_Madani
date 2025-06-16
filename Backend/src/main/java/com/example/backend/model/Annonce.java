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
} 
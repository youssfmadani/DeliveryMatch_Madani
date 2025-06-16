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
} 
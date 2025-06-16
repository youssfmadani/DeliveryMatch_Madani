package com.example.backend.dto;

import lombok.Data;

@Data
public class EvaluationDTO {
    private Long id;
    private Long auteurId;
    private String auteurNom;
    private String auteurPrenom;
    private Long cibleId;
    private String cibleNom;
    private String ciblePrenom;
    private Integer note;
    private String commentaire;
    private Long demandeId;
} 
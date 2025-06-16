package com.example.backend.dto;

import com.example.backend.model.Role;
import lombok.Data;

@Data
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private boolean verifie;
} 
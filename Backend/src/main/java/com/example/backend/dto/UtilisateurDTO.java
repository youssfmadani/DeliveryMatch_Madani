package com.example.backend.dto;

import com.example.backend.model.Role;
import lombok.Data;

@Data
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private Role role;
    private boolean verifie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isVerifie() {
        return verifie;
    }

    public void setVerifie(boolean verifie) {
        this.verifie = verifie;
    }
}
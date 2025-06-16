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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuteurId() {
        return auteurId;
    }

    public void setAuteurId(Long auteurId) {
        this.auteurId = auteurId;
    }

    public String getAuteurNom() {
        return auteurNom;
    }

    public void setAuteurNom(String auteurNom) {
        this.auteurNom = auteurNom;
    }

    public String getAuteurPrenom() {
        return auteurPrenom;
    }

    public void setAuteurPrenom(String auteurPrenom) {
        this.auteurPrenom = auteurPrenom;
    }

    public Long getCibleId() {
        return cibleId;
    }

    public void setCibleId(Long cibleId) {
        this.cibleId = cibleId;
    }

    public String getCibleNom() {
        return cibleNom;
    }

    public void setCibleNom(String cibleNom) {
        this.cibleNom = cibleNom;
    }

    public String getCiblePrenom() {
        return ciblePrenom;
    }

    public void setCiblePrenom(String ciblePrenom) {
        this.ciblePrenom = ciblePrenom;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Long getDemandeId() {
        return demandeId;
    }

    public void setDemandeId(Long demandeId) {
        this.demandeId = demandeId;
    }
}
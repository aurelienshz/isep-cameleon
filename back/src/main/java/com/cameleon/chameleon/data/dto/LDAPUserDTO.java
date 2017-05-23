package com.cameleon.chameleon.data.dto;

/**
 * Created by Victor ELY on 23/05/2017.
 * gcfa-back
 */
public class LDAPUserDTO {

    /**
     * Nom complet (nom + prénom)
     * @return
     */
    private String nom;
    private String nomFamille;
    private String prenom;

    /**
     * Type d'utilisateur: eleve, ...
     */
    private String employeeType;

    /**
     * Numéro élève
     */
    private String employeeNumber;
    private String login;
    private String password;
    private String mail;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNomFamille() {
        return nomFamille;
    }

    public void setNomFamille(String nomFamille) {
        this.nomFamille = nomFamille;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
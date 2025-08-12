package com.hinova.rehabilitation_center_management.modules.rehabprofile.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "citizen_information")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CitizenInformation {
    @Id
    @Column(name = "citizen_id")
    String citizenId;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "alias_name")
    String aliasName;

    @Column(name = "date_of_birth")
    Date dateOfBirth;

    String gender;

    @Column(name = "place_of_birth")
    String placeOfBirth;

    @Column(name = "birth_registration_place")
    String birthRegistrationPlace;

    @Column(name = "home_town")
    String homeTown;

    String ethnicity;

    String religion;

    String nationality;

    @Column(name = "blood_type")
    String bloodType;

    @Column(name = "citizen_id_issue_date")
    String citizenIdIssueDate;

    @Column(name = "citizen_id_issue_place")
    String citizenIdIssuePlace;

    @Column(name = "citizen_id_expiry_date")
    String citizenIdExpiryDate;

    @Column(name = "permanent_address")
    String permanentAddress;

    @Column(name = "temporary_address")
    String temporaryAddress;

    @Column(name = "current_address")
    String currentAddress;

    @Column(name = "marital_status")
    String maritalStatus;

    @Column(name = "nine_digit_citizen_id")
    String oldCitizenId;

    @Column(name = "created_date")
    @CreationTimestamp
    LocalDateTime createdDate;

    @Column(name = "updated_date")
    @UpdateTimestamp
    LocalDateTime updatedDate;
}

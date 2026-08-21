package com.example.impacthealth.repository;

import com.example.impacthealth.entity.Doctor;
import com.example.impacthealth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser(User user);
    Optional<Doctor> findByEmail(String email);
}

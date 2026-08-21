package com.example.impacthealth.repository;

import com.example.impacthealth.entity.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
    Optional<BlogCategory> findBySlug(String slug);
    Optional<BlogCategory> findByName(String name);
}

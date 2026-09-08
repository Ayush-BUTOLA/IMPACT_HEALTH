package com.example.impacthealth.repository;

import com.example.impacthealth.entity.Blog;
import com.example.impacthealth.entity.BlogStatus;
import com.example.impacthealth.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long>, JpaSpecificationExecutor<Blog> {
    
    Optional<Blog> findBySlug(String slug);

    Optional<Blog> findBySlugAndStatus(String slug, BlogStatus status);

    @Query("SELECT b FROM Blog b " +
           "JOIN FETCH b.author a " +
           "JOIN FETCH a.user u " +
           "JOIN FETCH b.category c " +
           "LEFT JOIN FETCH b.images i " +
           "WHERE b.slug = :slug AND b.status = :status")
    Optional<Blog> findBySlugAndStatusWithDetails(@Param("slug") String slug, @Param("status") BlogStatus status);

    @Query("SELECT b FROM Blog b " +
           "JOIN FETCH b.author a " +
           "JOIN FETCH a.user u " +
           "JOIN FETCH b.category c " +
           "LEFT JOIN FETCH b.images i " +
           "WHERE b.id = :id")
    Optional<Blog> findByIdWithDetails(@Param("id") Long id);

    List<Blog> findByAuthorOrderByIdDesc(Doctor author);

    @Query("SELECT b FROM Blog b " +
           "JOIN FETCH b.author a " +
           "JOIN FETCH a.user u " +
           "JOIN FETCH b.category c " +
           "WHERE b.author = :author ORDER BY b.id DESC")
    List<Blog> findByAuthorOrderByIdDescWithDetails(@Param("author") Doctor author);

    List<Blog> findByStatusOrderByIdDesc(BlogStatus status);

    @Query(value = "SELECT b FROM Blog b " +
           "JOIN FETCH b.author a " +
           "JOIN FETCH a.user u " +
           "JOIN FETCH b.category c " +
           "WHERE b.status = :status AND " +
           "(:categorySlug IS NULL OR LOWER(c.slug) = LOWER(:categorySlug) OR LOWER(c.name) = LOWER(:categorySlug)) AND " +
           "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.shortDescription) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.content) LIKE LOWER(CONCAT('%', :search, '%')))",
           countQuery = "SELECT count(b) FROM Blog b " +
           "WHERE b.status = :status AND " +
           "(:categorySlug IS NULL OR LOWER(b.category.slug) = LOWER(:categorySlug) OR LOWER(b.category.name) = LOWER(:categorySlug)) AND " +
           "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.shortDescription) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.content) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Blog> findPublicBlogs(@Param("status") BlogStatus status,
                               @Param("categorySlug") String categorySlug,
                               @Param("search") String search,
                               Pageable pageable);

    long countByStatus(BlogStatus status);
}

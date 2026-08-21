package com.example.impacthealth.repository;

import com.example.impacthealth.entity.Blog;
import com.example.impacthealth.entity.BlogCategory;
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

    List<Blog> findByAuthorOrderByIdDesc(Doctor author);

    List<Blog> findByStatusOrderByIdDesc(BlogStatus status);

    @Query("SELECT b FROM Blog b WHERE b.status = :status AND " +
           "(:categorySlug IS NULL OR LOWER(b.category.slug) = LOWER(:categorySlug) OR LOWER(b.category.name) = LOWER(:categorySlug)) AND " +
           "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.shortDescription) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.content) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Blog> findPublicBlogs(@Param("status") BlogStatus status,
                              @Param("categorySlug") String categorySlug,
                              @Param("search") String search,
                              Pageable pageable);

    @Query("SELECT b FROM Blog b WHERE " +
           "(:status IS NULL OR b.status = :status) AND " +
           "(:categoryId IS NULL OR b.category.id = :categoryId) AND " +
           "(:authorId IS NULL OR b.author.id = :authorId) AND " +
           "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(b.author.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Blog> findAdminBlogs(@Param("status") BlogStatus status,
                             @Param("categoryId") Long categoryId,
                             @Param("authorId") Long authorId,
                             @Param("search") String search,
                             Pageable pageable);

    long countByStatus(BlogStatus status);
}

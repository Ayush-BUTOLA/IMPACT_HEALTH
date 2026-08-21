package com.example.impacthealth.repository;

import com.example.impacthealth.entity.Blog;
import com.example.impacthealth.entity.BlogImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogImageRepository extends JpaRepository<BlogImage, Long> {
    List<BlogImage> findByBlogOrderBySortOrderAsc(Blog blog);
    void deleteByBlog(Blog blog);
}

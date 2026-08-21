package com.example.impacthealth.controller;

import com.example.impacthealth.dto.BlogCategoryDTO;
import com.example.impacthealth.dto.BlogDTO;
import com.example.impacthealth.service.BlogCategoryService;
import com.example.impacthealth.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicBlogController {

    private final BlogService blogService;
    private final BlogCategoryService categoryService;

    @GetMapping("/blogs")
    public ResponseEntity<Page<BlogDTO>> getPublicBlogs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "publishedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<BlogDTO> blogs = blogService.getPublicBlogs(category, search, pageable);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/blogs/{slug}")
    public ResponseEntity<BlogDTO> getPublicBlogBySlug(@PathVariable String slug) {
        BlogDTO blog = blogService.getPublicBlogBySlug(slug);
        return ResponseEntity.ok(blog);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<BlogCategoryDTO>> getPublicCategories() {
        List<BlogCategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}

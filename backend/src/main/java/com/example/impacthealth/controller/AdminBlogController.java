package com.example.impacthealth.controller;

import com.example.impacthealth.dto.BlogCategoryDTO;
import com.example.impacthealth.dto.BlogDTO;
import com.example.impacthealth.dto.ReviewActionDTO;
import com.example.impacthealth.entity.BlogStatus;
import com.example.impacthealth.service.BlogCategoryService;
import com.example.impacthealth.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminBlogController {

    private final BlogService blogService;
    private final BlogCategoryService categoryService;

    @GetMapping("/blogs")
    public ResponseEntity<Page<BlogDTO>> getAllBlogs(
            @RequestParam(required = false) BlogStatus status,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long authorId,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<BlogDTO> blogs = blogService.getAdminBlogs(status, categoryId, authorId, search, pageable);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/blogs/pending")
    public ResponseEntity<List<BlogDTO>> getPendingBlogs() {
        List<BlogDTO> pending = blogService.getPendingBlogs();
        return ResponseEntity.ok(pending);
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<BlogDTO> getBlogForReview(@PathVariable Long id) {
        BlogDTO blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }

    @PostMapping("/blogs/{id}/approve")
    public ResponseEntity<BlogDTO> approveBlog(@PathVariable Long id) {
        BlogDTO approved = blogService.approveBlog(id);
        return ResponseEntity.ok(approved);
    }

    @PostMapping("/blogs/{id}/reject")
    public ResponseEntity<BlogDTO> rejectBlog(@PathVariable Long id,
                                             @Valid @RequestBody ReviewActionDTO actionDTO) {
        BlogDTO rejected = blogService.rejectBlog(id, actionDTO.getReason());
        return ResponseEntity.ok(rejected);
    }

    @PostMapping("/blogs/{id}/request-changes")
    public ResponseEntity<BlogDTO> requestChanges(@PathVariable Long id,
                                                  @Valid @RequestBody ReviewActionDTO actionDTO) {
        BlogDTO updated = blogService.requestChanges(id, actionDTO.getReason());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteAdminBlog(id);
        return ResponseEntity.noContent().build();
    }

    // CATEGORY ADMIN ENDPOINTS

    @PostMapping("/categories")
    public ResponseEntity<BlogCategoryDTO> createCategory(@Valid @RequestBody BlogCategoryDTO categoryDTO) {
        BlogCategoryDTO created = categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}

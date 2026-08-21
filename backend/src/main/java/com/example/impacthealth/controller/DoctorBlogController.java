package com.example.impacthealth.controller;

import com.example.impacthealth.dto.BlogCreateUpdateDTO;
import com.example.impacthealth.dto.BlogDTO;
import com.example.impacthealth.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DoctorBlogController {

    private final BlogService blogService;

    @PostMapping
    public ResponseEntity<BlogDTO> createBlog(@Valid @RequestBody BlogCreateUpdateDTO dto,
                                             @RequestParam(required = false) Long doctorId) {
        BlogDTO created = blogService.createBlog(dto, doctorId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<BlogDTO>> getMyBlogs(@RequestParam(required = false) Long doctorId) {
        List<BlogDTO> blogs = blogService.getDoctorBlogs(doctorId);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        BlogDTO blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable Long id,
                                             @Valid @RequestBody BlogCreateUpdateDTO dto,
                                             @RequestParam(required = false) Long doctorId) {
        BlogDTO updated = blogService.updateBlog(id, dto, doctorId);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<BlogDTO> submitBlog(@PathVariable Long id,
                                             @RequestParam(required = false) Long doctorId) {
        BlogDTO submitted = blogService.submitBlog(id, doctorId);
        return ResponseEntity.ok(submitted);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id,
                                           @RequestParam(required = false) Long doctorId) {
        blogService.deleteBlog(id, doctorId);
        return ResponseEntity.noContent().build();
    }
}

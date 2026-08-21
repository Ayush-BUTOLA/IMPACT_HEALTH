package com.example.impacthealth.service;

import com.example.impacthealth.dto.*;
import com.example.impacthealth.entity.*;
import com.example.impacthealth.exception.BadRequestException;
import com.example.impacthealth.exception.ResourceNotFoundException;
import com.example.impacthealth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final BlogCategoryRepository categoryRepository;
    private final DoctorRepository doctorRepository;
    private final BlogImageRepository blogImageRepository;
    private final BlogCategoryService categoryService;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    // DOCTOR METHODS

    @Transactional
    public BlogDTO createBlog(BlogCreateUpdateDTO dto, Long doctorId) {
        Doctor doctor = getDoctorById(dto.getAuthorId() != null ? dto.getAuthorId() : doctorId);
        BlogCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + dto.getCategoryId()));

        String slug = generateUniqueSlug(dto.getTitle());

        BlogStatus initialStatus = Boolean.TRUE.equals(dto.getSubmitForApproval()) ? BlogStatus.PENDING : BlogStatus.DRAFT;

        Blog blog = Blog.builder()
                .author(doctor)
                .category(category)
                .title(dto.getTitle())
                .slug(slug)
                .shortDescription(dto.getShortDescription())
                .content(dto.getContent())
                .featuredImage(dto.getFeaturedImage())
                .status(initialStatus)
                .images(new ArrayList<>())
                .build();

        Blog savedBlog = blogRepository.save(blog);

        if (dto.getAdditionalImages() != null && !dto.getAdditionalImages().isEmpty()) {
            int order = 1;
            for (String imgPath : dto.getAdditionalImages()) {
                if (imgPath != null && !imgPath.isBlank()) {
                    BlogImage blogImage = BlogImage.builder()
                            .blog(savedBlog)
                            .imagePath(imgPath)
                            .sortOrder(order++)
                            .build();
                    blogImageRepository.save(blogImage);
                    savedBlog.getImages().add(blogImage);
                }
            }
        }

        return mapToDTO(savedBlog);
    }

    public List<BlogDTO> getDoctorBlogs(Long doctorId) {
        Doctor doctor = getDoctorById(doctorId);
        return blogRepository.findByAuthorOrderByIdDesc(doctor).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BlogDTO getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));
        return mapToDTO(blog);
    }

    @Transactional
    public BlogDTO updateBlog(Long id, BlogCreateUpdateDTO dto, Long doctorId) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (doctorId != null && !blog.getAuthor().getId().equals(doctorId)) {
            // Verify author ownership if doctorId is explicitly supplied
            throw new BadRequestException("You are not authorized to update this blog.");
        }

        BlogCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + dto.getCategoryId()));

        blog.setTitle(dto.getTitle());
        blog.setShortDescription(dto.getShortDescription());
        blog.setContent(dto.getContent());
        blog.setCategory(category);
        if (dto.getFeaturedImage() != null) {
            blog.setFeaturedImage(dto.getFeaturedImage());
        }

        if (Boolean.TRUE.equals(dto.getSubmitForApproval())) {
            blog.setStatus(BlogStatus.PENDING);
        }

        // Handle additional images replacement
        if (dto.getAdditionalImages() != null) {
            blogImageRepository.deleteByBlog(blog);
            blog.getImages().clear();
            int order = 1;
            for (String imgPath : dto.getAdditionalImages()) {
                if (imgPath != null && !imgPath.isBlank()) {
                    BlogImage blogImage = BlogImage.builder()
                            .blog(blog)
                            .imagePath(imgPath)
                            .sortOrder(order++)
                            .build();
                    blogImageRepository.save(blogImage);
                    blog.getImages().add(blogImage);
                }
            }
        }

        return mapToDTO(blogRepository.save(blog));
    }

    @Transactional
    public BlogDTO submitBlog(Long id, Long doctorId) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (doctorId != null && !blog.getAuthor().getId().equals(doctorId)) {
            throw new BadRequestException("You are not authorized to submit this blog.");
        }

        if (blog.getStatus() != BlogStatus.DRAFT && blog.getStatus() != BlogStatus.CHANGES_REQUESTED && blog.getStatus() != BlogStatus.REJECTED) {
            throw new BadRequestException("Blog status must be DRAFT, CHANGES_REQUESTED, or REJECTED to submit.");
        }

        blog.setStatus(BlogStatus.PENDING);
        return mapToDTO(blogRepository.save(blog));
    }

    @Transactional
    public void deleteBlog(Long id, Long doctorId) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (doctorId != null && !blog.getAuthor().getId().equals(doctorId)) {
            throw new BadRequestException("You are not authorized to delete this blog.");
        }

        blogRepository.delete(blog);
    }

    // ADMIN METHODS

    public Page<BlogDTO> getAdminBlogs(BlogStatus status, Long categoryId, Long authorId, String search, Pageable pageable) {
        return blogRepository.findAdminBlogs(status, categoryId, authorId, search, pageable)
                .map(this::mapToDTO);
    }

    public List<BlogDTO> getPendingBlogs() {
        return blogRepository.findByStatusOrderByIdDesc(BlogStatus.PENDING).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public BlogDTO approveBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (blog.getStatus() != BlogStatus.PENDING) {
            throw new BadRequestException("Only PENDING blogs can be approved.");
        }

        blog.setStatus(BlogStatus.PUBLISHED);
        blog.setPublishedAt(LocalDateTime.now());
        blog.setRejectionReason(null);
        return mapToDTO(blogRepository.save(blog));
    }

    @Transactional
    public BlogDTO rejectBlog(Long id, String reason) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (reason == null || reason.isBlank()) {
            throw new BadRequestException("Rejection reason is required.");
        }

        blog.setStatus(BlogStatus.REJECTED);
        blog.setRejectionReason(reason);
        return mapToDTO(blogRepository.save(blog));
    }

    @Transactional
    public BlogDTO requestChanges(Long id, String reason) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));

        if (reason == null || reason.isBlank()) {
            throw new BadRequestException("Change request reason/message is required.");
        }

        blog.setStatus(BlogStatus.CHANGES_REQUESTED);
        blog.setRejectionReason(reason);
        return mapToDTO(blogRepository.save(blog));
    }

    @Transactional
    public void deleteAdminBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with ID: " + id));
        blogRepository.delete(blog);
    }

    // PUBLIC METHODS

    public Page<BlogDTO> getPublicBlogs(String category, String search, Pageable pageable) {
        return blogRepository.findPublicBlogs(BlogStatus.PUBLISHED, category, search, pageable)
                .map(this::mapToDTO);
    }

    public BlogDTO getPublicBlogBySlug(String slug) {
        Blog blog = blogRepository.findBySlugAndStatus(slug, BlogStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published blog not found with slug: " + slug));
        return mapToDTO(blog);
    }

    // UTILITY HELPER METHODS

    private Doctor getDoctorById(Long doctorId) {
        if (doctorId == null) {
            return doctorRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("No doctors found in the system."));
        }
        return doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + doctorId));
    }

    public BlogDTO mapToDTO(Blog blog) {
        List<BlogImageDTO> imageDTOs = blog.getImages() != null ?
                blog.getImages().stream().map(img -> BlogImageDTO.builder()
                        .id(img.getId())
                        .imagePath(img.getImagePath())
                        .altText(img.getAltText())
                        .sortOrder(img.getSortOrder())
                        .build()).collect(Collectors.toList()) : new ArrayList<>();

        DoctorDTO doctorDTO = DoctorDTO.builder()
                .id(blog.getAuthor().getId())
                .userId(blog.getAuthor().getUser().getId())
                .name(blog.getAuthor().getName())
                .email(blog.getAuthor().getEmail())
                .specialization(blog.getAuthor().getSpecialization())
                .profileImage(blog.getAuthor().getProfileImage())
                .build();

        BlogCategoryDTO categoryDTO = categoryService.mapToDTO(blog.getCategory());

        return BlogDTO.builder()
                .id(blog.getId())
                .author(doctorDTO)
                .category(categoryDTO)
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .shortDescription(blog.getShortDescription())
                .content(blog.getContent())
                .featuredImage(blog.getFeaturedImage())
                .status(blog.getStatus())
                .rejectionReason(blog.getRejectionReason())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .publishedAt(blog.getPublishedAt())
                .images(imageDTOs)
                .build();
    }

    private String generateUniqueSlug(String title) {
        String nowhitespace = WHITESPACE.matcher(title).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String baseSlug = NONLATIN.matcher(normalized).replaceAll("").toLowerCase(Locale.ENGLISH);
        
        if (baseSlug.isBlank()) {
            baseSlug = "blog-" + UUID.randomUUID().toString().substring(0, 8);
        }

        String slug = baseSlug;
        int count = 1;
        while (blogRepository.findBySlug(slug).isPresent()) {
            slug = baseSlug + "-" + count++;
        }
        return slug;
    }
}

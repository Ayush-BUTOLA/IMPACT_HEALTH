package com.example.impacthealth.service;

import com.example.impacthealth.dto.BlogCategoryDTO;
import com.example.impacthealth.entity.BlogCategory;
import com.example.impacthealth.exception.BadRequestException;
import com.example.impacthealth.exception.ResourceNotFoundException;
import com.example.impacthealth.repository.BlogCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogCategoryService {

    private final BlogCategoryRepository categoryRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public List<BlogCategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public BlogCategoryDTO getCategoryById(Long id) {
        BlogCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
        return mapToDTO(category);
    }

    @Transactional
    public BlogCategoryDTO createCategory(BlogCategoryDTO dto) {
        if (categoryRepository.findByName(dto.getName()).isPresent()) {
            throw new BadRequestException("Category already exists with name: " + dto.getName());
        }

        String slug = dto.getSlug();
        if (slug == null || slug.isBlank()) {
            slug = generateSlug(dto.getName());
        }

        BlogCategory category = BlogCategory.builder()
                .name(dto.getName())
                .slug(slug)
                .description(dto.getDescription())
                .build();

        return mapToDTO(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(Long id) {
        BlogCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
        categoryRepository.delete(category);
    }

    public BlogCategoryDTO mapToDTO(BlogCategory category) {
        return BlogCategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .build();
    }

    public String generateSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}

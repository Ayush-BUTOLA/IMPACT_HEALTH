package com.example.impacthealth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogCategoryDTO {
    private Long id;
    
    @NotBlank(message = "Category name is required")
    private String name;
    
    private String slug;
    private String description;
}

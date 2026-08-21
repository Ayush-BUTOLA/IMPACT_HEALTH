package com.example.impacthealth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogCreateUpdateDTO {
    
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String shortDescription;

    @NotBlank(message = "Content is required")
    private String content;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private Long authorId; // Doctor ID

    private String featuredImage;

    private List<String> additionalImages;

    private Boolean submitForApproval; // Optional flag to set status to PENDING immediately
}

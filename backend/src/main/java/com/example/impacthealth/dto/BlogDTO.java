package com.example.impacthealth.dto;

import com.example.impacthealth.entity.BlogStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO {
    private Long id;
    private DoctorDTO author;
    private BlogCategoryDTO category;
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private String featuredImage;
    private BlogStatus status;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;
    private List<BlogImageDTO> images;
}

package com.example.impacthealth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogImageDTO {
    private Long id;
    private String imagePath;
    private String altText;
    private Integer sortOrder;
}

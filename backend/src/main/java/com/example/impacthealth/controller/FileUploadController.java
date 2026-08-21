package com.example.impacthealth.controller;

import com.example.impacthealth.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String filePath = fileUploadService.storeFile(file);
        Map<String, String> response = new HashMap<>();
        response.put("url", filePath);
        response.put("message", "File uploaded successfully");
        return ResponseEntity.ok(response);
    }
}

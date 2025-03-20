package com.ims.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:4200") // Allow frontend access
public class CategoryController {

    @GetMapping
    public List<String> getCategories() {
        return List.of("Electronics", "Furniture", "Clothing", "Books", "Toys"); // Replace with database fetch later
    }
}

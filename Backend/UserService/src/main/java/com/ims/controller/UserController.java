package com.ims.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ims.entity.User;
import com.ims.service.UserService;

import lombok.Data;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200"}) // Allow Angular frontend to make requests
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDto) {
        userService.registerUser(userDto.toUser());
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (isValid) {
            return "AUTH-TOKEN-PLACEHOLDER"; // You should generate JWT token here
        } else {
            return "Invalid email or password!";
        }
    }
}

@Data
class UserDTO {
    private String firstName;
    private String lastName;
    private String username; // Added username field
    private String email;
    private String phoneNumber;
    private String password;

    public User toUser() {
        User user = new User();
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setUsername(this.username); // Set username
        user.setEmail(this.email);
        user.setPhoneNumber(this.phoneNumber);
        user.setPassword(this.password);
        return user;
    }
}

// DTO for Login Request
@Data
class LoginRequest {
    private String email;
    private String password;
}

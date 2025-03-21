package com.ims.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ims.entity.User;
import com.ims.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFirstName("Amit");
        testUser.setLastName("Kumar");
        testUser.setEmail("amit@gmail.com");
        testUser.setPassword("password123");
    }

    @Test
    void testRegisterUser() {
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User savedUser = userService.registerUser(testUser);

        assertNotNull(savedUser);
        assertEquals("Amit", savedUser.getFirstName());
        assertEquals("hashed_password", savedUser.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testValidateUser_ValidUser() {
        when(userRepository.findByEmail("amit@gmail.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", testUser.getPassword())).thenReturn(true);

        boolean isValid = userService.validateUser("amit@gmail.com", "password123");

        assertTrue(isValid);
        verify(userRepository, times(1)).findByEmail("amit@gmail.com");
    }

    @Test
    void testValidateUser_InvalidPassword() {
        when(userRepository.findByEmail("amit@gmail.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongpassword", testUser.getPassword())).thenReturn(false);

        boolean isValid = userService.validateUser("amit@gmail.com", "wrongpassword");

        assertFalse(isValid);
    }

    @Test
    void testValidateUser_UserNotFound() {
        when(userRepository.findByEmail("unknown@gmail.com")).thenReturn(Optional.empty());

        boolean isValid = userService.validateUser("unknown@gmail.com", "password");

        assertFalse(isValid);
    }
}
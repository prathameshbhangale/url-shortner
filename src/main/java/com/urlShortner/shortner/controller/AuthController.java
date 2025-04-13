package com.urlShortner.shortner.controller;


import com.urlShortner.shortner.controller.wrappers.ApiResponse;
import com.urlShortner.shortner.dto.LoginRequest;
import com.urlShortner.shortner.dto.RegisterRequest;
import com.urlShortner.shortner.models.User;
import com.urlShortner.shortner.security.jwt.JwtAuthenticationResponse;
import com.urlShortner.shortner.servise.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest requestUser){
        User user = new User();
        user.setEmail(requestUser.getEmail());
        user.setPassword(requestUser.getPassword());
        user.setUsername(requestUser.getUsername());
        user.setRole("ROLE_USER");
        User data = userService.userRegister(user);
        ApiResponse<User> resp = new ApiResponse<>(true,data);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        JwtAuthenticationResponse tokenObj = userService.userLogin(loginRequest);
        ApiResponse<JwtAuthenticationResponse> response = new ApiResponse<>(true, tokenObj);
        return ResponseEntity.ok(response);
    }
}

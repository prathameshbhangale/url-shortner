package com.urlShortner.shortner.servise;


import com.urlShortner.shortner.dto.LoginRequest;
import com.urlShortner.shortner.dto.RegisterRequest;
import com.urlShortner.shortner.models.User;
import com.urlShortner.shortner.repository.UserRepository;
import com.urlShortner.shortner.security.jwt.JwtAuthenticationResponse;
import com.urlShortner.shortner.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.webauthn.authentication.WebAuthnAuthentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public User userRegister(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public JwtAuthenticationResponse userLogin(LoginRequest request){
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);
        System.out.println(jwt);
        return new JwtAuthenticationResponse(jwt);
    }

}

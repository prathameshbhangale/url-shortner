package com.urlShortner.shortner.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.urlShortner.shortner.dto.JwtExceptionDTO;
import com.urlShortner.shortner.exceptions.InvalidJwtTokenException;
import com.urlShortner.shortner.servise.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtTokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // Extract JWT token from request header
            String jwt = jwtTokenProvider.getJwtFromHeader(request);

            // Validate the JWT token
            if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
                // Get username from the JWT token
                String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);

                // Load user details based on username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (userDetails != null) {
                    // Create authentication token
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    // Set authentication details
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Set the authentication in the SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }

        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            String json = new ObjectMapper().writeValueAsString(
                    new JwtExceptionDTO("Invalid JWT token or token expired", false)
            );
            response.getWriter().write(json);

//            throw new InvalidJwtTokenException("Invalid or expired JWT token", e);
        }

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }
}

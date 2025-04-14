package com.urlShortner.shortner.controller;


import com.urlShortner.shortner.controller.wrappers.ApiResponse;
import com.urlShortner.shortner.dto.UrlMappingDTO;
import com.urlShortner.shortner.models.User;
import com.urlShortner.shortner.servise.UrlMappingService;
import com.urlShortner.shortner.servise.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/url")
@AllArgsConstructor
public class UrlMappingController {
    private UserService userService;
    private UrlMappingService urlMappingService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createShortUrl(@RequestBody Map<String,String> request, Principal principal){
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
        ApiResponse<UrlMappingDTO> resp = new ApiResponse<>(true,urlMappingDTO);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        ApiResponse<List<UrlMappingDTO>> resp = new ApiResponse(true,urls);
        return ResponseEntity.ok(resp);
    }
}

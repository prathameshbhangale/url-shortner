package com.urlShortner.shortner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtExceptionDTO {
    private String message;
    private boolean jwt;
}

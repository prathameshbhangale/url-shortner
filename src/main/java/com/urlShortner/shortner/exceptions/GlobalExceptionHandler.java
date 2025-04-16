package com.urlShortner.shortner.exceptions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;

import com.urlShortner.shortner.dto.JwtExceptionDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidJwtTokenException.class)
    public ResponseEntity<JwtExceptionDTO> handleInvalidJwtToken(InvalidJwtTokenException ex) {
        // Log the stack trace for debugging
        ex.printStackTrace();

        // Return a custom response with a message and status
        JwtExceptionDTO response = new JwtExceptionDTO("Invalid JWT token or token expired", false);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    // You can also add a generic handler for other exceptions:
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

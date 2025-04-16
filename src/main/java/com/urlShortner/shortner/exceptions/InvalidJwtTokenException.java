package com.urlShortner.shortner.exceptions;


public class InvalidJwtTokenException extends RuntimeException {

    public InvalidJwtTokenException() {
        super("Invalid JWT token");
    }

    public InvalidJwtTokenException(String message) {
        super(message);
    }

    public InvalidJwtTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidJwtTokenException(Throwable cause) {
        super(cause);
    }
}

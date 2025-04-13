package com.urlShortner.shortner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ShortnerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ShortnerApplication.class, args);
	}

}


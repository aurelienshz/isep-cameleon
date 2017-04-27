package com.cameleon.chameleon;

import com.cameleon.chameleon.configuration.security.PasswordEncrypter;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableAuthorizationServer
@EnableResourceServer
public class ChameleonApplication {
	public static void main(String[] args) {
		System.out.println(PasswordEncrypter.encryptPassword("test"));
		SpringApplication.run(ChameleonApplication.class, args);
	}
}

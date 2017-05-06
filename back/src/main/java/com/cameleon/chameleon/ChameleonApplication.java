package com.cameleon.chameleon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
public class ChameleonApplication {
	public static void main(String[] args) {
		ConfigurableApplicationContext ac = SpringApplication.run(ChameleonApplication.class, args);
		TestDatabaseSeeder tdbs = ac.getBeanFactory().createBean(TestDatabaseSeeder.class);
		tdbs.qsdf();
//		ac.close();
	}
}

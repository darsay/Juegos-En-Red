package es.urjc.JER.BattleWeenServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BattleWeenServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BattleWeenServerApplication.class, args);
	}
	
	

}

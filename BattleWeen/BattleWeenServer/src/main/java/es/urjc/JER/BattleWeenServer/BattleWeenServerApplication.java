package es.urjc.JER.BattleWeenServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class BattleWeenServerApplication implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(BattleWeenHandler(), "/prueba").setAllowedOrigins("*");
		
	}
	
	@Bean
	public WebSocketBWHandler BattleWeenHandler() {
		
		return new WebSocketBWHandler();
	}
	
	
	
	public static void main(String[] args) {
		SpringApplication.run(BattleWeenServerApplication.class, args);
	}



	
	
	

}

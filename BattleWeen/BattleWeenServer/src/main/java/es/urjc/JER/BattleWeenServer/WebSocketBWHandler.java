package es.urjc.JER.BattleWeenServer;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebSocketBWHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	//private Map <Integer,Integer> sala = new ConcurrentHashMap<>(); 
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		 ObjectNode ready = mapper.createObjectNode();
		 ready.put("isready", "1");
		 ObjectNode host = mapper.createObjectNode();
		 host.put("ishost", "0");
		
		if(sessions.isEmpty()) {
				sessions.put(session.getId(), session);
                host.put("ishost", "1");
				
			}else { 
				
				sessions.put(session.getId(), session); 
				}
				
		               
		                //System.out.println("Probando: " + ready.toString()); 
		                System.out.println("Probando: " + host.toString());   
		                
		                session.sendMessage(new TextMessage(ready.toString()));
		                session.sendMessage(new TextMessage(host.toString()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
				sessions.remove(session.getId());
		                //int id = Integer.parseInt(session.getId());
		               // sala.remove(id);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
				//System.out.println("Message received: " + message.getPayload());
				JsonNode node = mapper.readTree(message.getPayload());
			
			sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		//System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
        
        newNode.put("x", node.get("x").asDouble());
        newNode.put("y", node.get("y").asDouble());
        newNode.put("animation", node.get("animation").asText());
        newNode.put("pLook", node.get("pLook").asText());
        newNode.put("isShooting", node.get("isShooting").asInt());
        newNode.put("hp", node.get("hp").asText());
        newNode.put("dg", node.get("dg").asInt());
        //newNode.put("dead", node.get("dead").asBoolean());

		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}

}

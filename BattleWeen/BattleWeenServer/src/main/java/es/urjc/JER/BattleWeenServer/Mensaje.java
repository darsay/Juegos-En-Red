package es.urjc.JER.BattleWeenServer;

public class Mensaje {
	private String mensaje;
	private String user;
	

	private long id;
	
Mensaje(String mensaje, String user){
		
		this.mensaje=mensaje;
		this.user= user;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
}

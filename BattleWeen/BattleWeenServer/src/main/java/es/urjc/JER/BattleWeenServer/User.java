package es.urjc.JER.BattleWeenServer;

public class User {
	private String name;
	private String password;
	private long id;
	
	
	User(String name, String password){
		this.name = name;
		this.password = password;		
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
	
}

package es.urjc.JER.BattleWeenServer;

import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@CrossOrigin
@RequestMapping(value="")
public class BattleWeenController {

	Map<Long, User> users = new ConcurrentHashMap<>(); 
	Map<Long, Mensaje> mensajes = new ConcurrentHashMap<>();
	Map<Long, Cliente> clients = new ConcurrentHashMap<>(); 
	
	String ArrayMsn[];
	
	AtomicLong nextId = new AtomicLong(0);
	AtomicLong nextId2 = new AtomicLong(0);
	AtomicLong nextIdClient = new AtomicLong(0);
	
	@GetMapping(value="/users")
	public Collection<User> items() {
		return users.values();
	}
	
	@GetMapping(value="/clients")
	public Collection<Cliente> itClients() {
		return clients.values();
	}
	
	@GetMapping(value="/mensajes")
	public Collection<Mensaje> msn() {
		return mensajes.values();
	}
	
	@PostMapping(value="/users")
	@ResponseStatus(HttpStatus.CREATED)
	public User nuevoUsuario(@RequestBody User usuario) {
		saveUser(usuario);

		return usuario;
	}
	
	@PostMapping(value="/clients")
	@ResponseStatus(HttpStatus.CREATED)
	public Cliente nuevoCliente(@RequestBody Cliente cliente) {
		long id3 = nextIdClient.incrementAndGet();
		cliente.setId(id3);
		clients.put(id3, cliente);

		return cliente;
	}
	
	@PostMapping(value="/mensajes")
	@ResponseStatus(HttpStatus.CREATED)
	public Mensaje nuevoMens(@RequestBody Mensaje mensaje) {
		long id2 = nextId2.incrementAndGet();
		mensaje.setId(id2);
		mensajes.put(id2, mensaje);

		return mensaje;
	}
	

	@GetMapping(value="users/{id}")
	public ResponseEntity<User> getUser(@PathVariable long id) {
		
		User usuario = users.get(id);
				
		if (usuario != null) {
			return new ResponseEntity<>(usuario, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		
	}
	
	/*@GetMapping(value = "/{nombre}")
	public ResponseEntity<Jugador> getJugon(@PathVariable String nombre) {
		
		boolean found = false;
		long i = 1;
		Jugador jugador = null;
		
		while(i<=jugones.size() && !found) {
			jugador = jugones.get(i);
			
			if(jugador.getNombre().equals(nombre)) {
				found = true;
			}
			i++;
		}
		
				
		if (jugador != null && found) {
			return new ResponseEntity<>(jugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		
	}*/
	
	@DeleteMapping("users/{id}")
	public ResponseEntity<User> borraItem(@PathVariable long id) {

		User savedItem = users.get(id);

		if (savedItem != null) {
			users.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("clients/{id}")
	public ResponseEntity<Cliente> borraClient(@PathVariable long id) {

		Cliente savedItem = clients.get(id);

		if (savedItem != null) {
			clients.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("users/{id}")
    public ResponseEntity<User> actulizaItem(@PathVariable long id, @RequestBody User usuarioActualizado) {

        User savedItem = users.get(id);

        if (savedItem != null) {
            usuarioActualizado.setId(id);
            users.put(id, usuarioActualizado);

            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

	@PutMapping("clients/{id}")
    public ResponseEntity<Cliente> actulizaCliente(@PathVariable long id, @RequestBody Cliente clienteActualizado) {

        Cliente savedItem = clients.get(id);

        if (savedItem != null) {
            clienteActualizado.setId(id);
            clients.put(id, clienteActualizado);

            return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@GetMapping("users/all")
	public void getAllUsers(){
		ArrayList<User> usuarios = readFileUsers();
		Iterator<User> it = usuarios.iterator();
		while(it.hasNext()) {
			User temp = it.next();
			System.out.println(temp.toString());
		}
	}
	
	
	@SuppressWarnings("unused")
    public void saveUser(User usuario) {
         ArrayList<User> usuarios = new ArrayList<User>();
         File file = new File("users.txt");
         if(!file.exists()){
        	long id = 1;
     		usuario.setId(id);
     		users.put(id, usuario);
            ObjectOutputStream objectOut;
            try {
                objectOut = new ObjectOutputStream(new FileOutputStream("users.txt"));
                usuarios.add(usuario);
                objectOut.writeObject(usuarios);
                objectOut.close();
            } catch (FileNotFoundException e) {
            } catch (IOException e) {
            }
         }else{
             ObjectInputStream ois;
             try {
                ois = new ObjectInputStream(new FileInputStream("users.txt"));
                usuarios = (ArrayList<User>) ois.readObject();
                long id = usuarios.get(usuarios.size()-1).getId() + 1;
                usuario.setId(id);
         		users.put(id, usuario);
                try {
                    ois.close();
                    ObjectOutputStream objectOut;
                    try {
                        objectOut = new ObjectOutputStream(new FileOutputStream("users.txt"));
                        usuarios.add(usuario);
                        objectOut.writeObject(usuarios);
                        objectOut.close();
                    } catch (FileNotFoundException e) {
                    } catch (IOException e) {
                    }
                } catch (IOException e) {
                }
            } catch (Exception e1) {
            }   
         }
    } 

	public ArrayList<User> readFileUsers(){
		ArrayList<User> usuarios = new ArrayList<User>();
		ObjectInputStream ois;
            try {
                ois = new ObjectInputStream(new FileInputStream("users.txt"));
                usuarios = (ArrayList<User>) ois.readObject();
				ois.close();
            } catch (Exception e1) {
            }  
		return usuarios;
	}
	
}

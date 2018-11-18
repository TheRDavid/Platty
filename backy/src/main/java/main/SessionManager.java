package main;

import java.util.HashMap;
import java.util.UUID;

public class SessionManager {
	public enum AccessLevel {
		Guest, Student, Teacher, Admin
	}
	// Might want to introduce a time limit
	private HashMap<UUID, String> currentUsers = new HashMap<>(); // token, email

	public UUID login(String email) {
		UUID uuid = UUID.randomUUID();
		currentUsers.put(uuid, email);
		return uuid;
	}

	public void logout(String email) {
		currentUsers.remove(email);
	}
	
/*	public AccessLevel getAccessLevel(UUID token) {
		if(!currentUsers.containsKey(token)) return AccessLevel.Guest;
		
	}*/

}

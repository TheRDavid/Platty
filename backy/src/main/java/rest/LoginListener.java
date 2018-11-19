package rest;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Formatter;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import main.Config;
import spark.Request;
import spark.Response;

public class LoginListener extends RestListener {
	@Override
	public JSONObject handle(Request req, Response res) throws Exception{
		System.out.println("Login request incoming");
		JSONObject credentials = (JSONObject) new JSONParser().parse(req.body());
		System.out.println("Cred: " + credentials.toString());
		String email = (String) credentials.get("email");
		String password = encryptPassword((String) credentials.get("password"));
		Connection con = DriverManager.getConnection(Config.getDatabaseURL(), Config.getDbuser(),
				Config.getDbpassword());
		PreparedStatement stmt = con.prepareStatement("select * from users where email = ? and password = ?");
		stmt.setString(1, email);
		stmt.setString(2, password);
		ResultSet rs = stmt.executeQuery();
		String response = "You have entered an invalid username or password";
		String responseType = "error";
		while (rs.next()) {
			System.out.println(rs.getString(1) + " " + rs.getString(2));
			response = "Signed in as " + rs.getString(1) + " " + rs.getString(2);
			responseType = "success";
		}
		con.close();
		JSONObject jObject = new JSONObject();
		jObject.put("type", responseType);
		jObject.put("data", response);
		return jObject;
	}

	private static String byteToHex(final byte[] hash) {
		Formatter formatter = new Formatter();
		for (byte b : hash) {
			formatter.format("%02x", b);
		}
		String result = formatter.toString();
		formatter.close();
		return result;
	}

	public static String encryptPassword(String password) {
		String sha1 = "";
		try {
			MessageDigest crypt = MessageDigest.getInstance("SHA-1");
			crypt.reset();
			crypt.update(password.getBytes("UTF-8"));
			sha1 = byteToHex(crypt.digest());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return sha1;
	}
}

package main;

import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.post;

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

import spark.servlet.SparkApplication;

public class Main implements SparkApplication {

	private static String mysqlDriver = "com.mysql.jdbc.Driver";
	public static String WELCOME_MESSAGE = "Hello there";

	public static void main(String[] args) {
		new Main().init();
	}

	@Override
	public void init() {
		System.out.println("init");
		try {
			Class.forName(mysqlDriver);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Config.init("backend-config");
		System.out.println("Setting port to "+Config.getPort());
		port(Config.getPort());
		// CorsFilter.apply();

		options("/*", (request, response) -> {

			String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
			if (accessControlRequestHeaders != null) {
				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			}

			String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
			if (accessControlRequestMethod != null) {
				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			}

			return "OK";
		});

		before((request, response) -> {

			response.header("Access-Control-Request-Method", "POST, GET, OPTIONS, DELETE, PUT");

			response.header("Access-Control-Allow-Origin", "*");

			response.header("Access-Control-Allow-Headers",
					"Authorization,Access-Control-Expose-Headers,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,content-type,Access-Control-Request-Method,Access-Control-Request-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Credentials,user_language,");
			response.header("Access-Control-Allow-Credentials", "true");
			response.header("Vary", "Origin");
			response.type("application/json");
		});

		get("/hello", (req, res) -> {
			JSONObject jObject = new JSONObject();
			jObject.put("data", WELCOME_MESSAGE);
			return jObject.toJSONString();
		});
		post("/login", (req, res) -> {
			System.out.println("Incoming");
			JSONObject credentials = (JSONObject) new JSONParser().parse(req.body());
			System.out.println("Cred: " + credentials.toString());
			String email = (String) credentials.get("email");
			String password = encryptPassword((String) credentials.get("password"));
			Connection con = DriverManager.getConnection(Config.getDatabaseURL(), Config.getDbuser(), Config.getDbpassword());
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
			return jObject.toJSONString();
		});
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

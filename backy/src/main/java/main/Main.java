package main;

import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.post;

import java.util.HashMap;

import rest.InfoListener;
import rest.LoginListener;
import rest.RestListener;
import spark.servlet.SparkApplication;

public class Main implements SparkApplication {

	private static String mysqlDriver = "com.mysql.jdbc.Driver";
	
	private HashMap<String, RestListener> restListeners = new HashMap<>();

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

		restListeners.put("/login",new LoginListener());
		restListeners.put("/info",new InfoListener());

		get("/*", (req, res) -> {
			return restListeners.get(req.pathInfo()).handle(req, res);
		});
		post("/*", (req, res) -> {
			return restListeners.get(req.pathInfo()).handle(req, res);
		});
	}

}

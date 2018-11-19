package rest;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.json.simple.JSONObject;

import main.Config;
import spark.Request;
import spark.Response;

public class InfoListener extends RestListener {
	private int buildNumber;
	private static final String name = "Platty", description = "Oh boy, it's the happy Platty platform!";


	public InfoListener() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = new FileInputStream("buildNumber.properties");
			prop.load(input);
			buildNumber = Integer.parseInt(prop.getProperty("buildNumber"));
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public JSONObject handle(Request req, Response res) throws Exception {

		JSONObject jObject = new JSONObject();
		jObject.put("name", name);
		jObject.put("description", description);
		jObject.put("buildNumber", buildNumber);
		return jObject;
	}

}

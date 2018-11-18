package main;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {

	private static String databaseURL, databaseRESTURL, dbuser, dbpassword;
	private static int port;

	/*
	 * Ensure singleton
	 */
	private Config() {
	}

	public static void init(String path) {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = new FileInputStream(path);
			prop.load(input);
			databaseURL = prop.getProperty("database");
			port = Integer.parseInt(prop.getProperty("port"));
			databaseRESTURL = prop.getProperty("databaseRest") + port;
			dbuser = prop.getProperty("dbuser");
			dbpassword = prop.getProperty("dbpassword");
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

	public static String getDatabaseURL() {
		return databaseURL;
	}

	public static String getDatabaseRESTURL() {
		return databaseRESTURL;
	}

	public static String getDbuser() {
		return dbuser;
	}

	public static String getDbpassword() {
		return dbpassword;
	}

	public static int getPort() {
		return port;
	}
}

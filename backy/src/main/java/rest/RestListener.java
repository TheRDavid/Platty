package rest;

import org.json.simple.JSONObject;

import spark.Response;
import spark.Request;   

public abstract class RestListener {
	public abstract JSONObject handle(Request req, Response res) throws Exception;
}

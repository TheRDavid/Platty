package rest;

import org.json.simple.JSONObject;

import spark.Request;
import spark.Response;

public abstract class RestListener {
	public abstract JSONObject handle(Request req, Response res);
}

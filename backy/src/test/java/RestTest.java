import org.json.simple.JSONObject;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import junit.framework.Assert;
import main.Main;

class RestTest {

	@Test
	void testAdminLogin() {
		new Main().init();
		RestAssured.baseURI = "http://localhost:4567";
		System.out.println("Base uri: " + RestAssured.baseURI);
		RequestSpecification request = RestAssured.given();
		JSONObject requestParams = new JSONObject();
		request.queryParam("password", "h-wl71");
		request.queryParam("email", "d.p.rosenbusch@student.utwente.nl");
		request.header("Content-Type", "application/json");
		request.body(requestParams.toJSONString());
		Response response = request.post("/login");
		Assert.assertEquals("Signed in as Hachmed Kibitzer", response.asString());
	}

}

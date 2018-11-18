export function post(url: string, data: FormData): String {
  var result: string = "no data :(";
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: data
  })
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        result = data;
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
  return result;
}

export function get(url: string, callback: () => any): Promise<void> {
  return fetch(url, {
    method: "get"
  })
    .then(function(response) {
      response.json().then(function(json) {
        callback();
        return json;
      });
    })
    .catch(function(err) {
      console.log("fetch error:");
      console.log(err);
    });
}

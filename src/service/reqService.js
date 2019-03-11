class Request {
  static reqUrl = 'http://site4/server.php';
  // static reqUrl = '/server.php';
  
  static createRequest(data) {

    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    }

    return req;
  }

  static createBody(controller, action, payload) {
    let body = {
      controller: controller,
      action: action,
      payload: payload,
    }

    return body;
  }

  static createRequestBody(controller, action, payload) {
    let body = {
      controller: controller,
      action: action,
      payload: payload,
    }
    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body),
    }

    return req;
  }

}

export default Request;
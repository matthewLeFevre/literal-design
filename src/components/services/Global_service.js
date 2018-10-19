//================================
// Globals Class
//================================

class Globals {

  url= 'http://site2/server.php';

  headers= {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  createRandomKey(length = 7) {
    let id = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return id;
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  createRequest(data) {

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

  createBody(controller, action, payload) {
    let body = {
      controller: controller,
      action: action,
      payload: payload,
    }

    return body;
  }

  createRequestBody(controller, action, payload) {
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

  concatArray(arr1, arr2) {
    return arr1.concat(arr2);
  }
}

//Export Statement
export default Globals;
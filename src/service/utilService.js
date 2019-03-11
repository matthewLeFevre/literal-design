
class Utility {

  static createRandomKey(length = 7) {
    let id = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return id;
  }

  static htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  static htmlEncode(input) {
    let elt = document.createElement('span'); 
    elt.textContent = input; 
    return elt.innerHTML;
  }

  static concatArray(arr1, arr2) {
    return arr1.concat(arr2);
  }

}

export default Utility;
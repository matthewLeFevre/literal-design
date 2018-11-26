//================================
// Styntax Highlight Class
//================================

class SyntaxHighlight {

  static format_html(code) {
      // debugger;
    // Replace crucial symboles with html entities
        code = code.replace(/">/g, '" >')
                   .replace(/"&gt;/g,'" &gt;')
                    // class="blue" >
                   .replace(/">/g, '&quot; >')
                   // > <h1
                  //  .replace(/</g, ' &lt;')
                   .replace(/&lt;/g, ' &lt;')
                   // /h1> <
                  //  .replace(/>/g, '&gt;  ')
                   .replace(/&gt;/g, '&gt; ')
                   // class= "blue">
                   .replace(/="/g, '= "')
                   .replace(/="/g, '= &quot;');

    // compile into an array for processing
    let codeParts = code.split(" "),
        finished  = "";
        // console.log(codeParts);
    
    // cycles through code and applies syntax
    for (let part of codeParts) {
      
      // finds opening comment
      if (part.startsWith('&lt;!--')) {
        finished += "<em><span class='c'>" + part;

        // finds closing comment
      } else if (part.endsWith('--&gt;')) {
        finished += part + "</span></em>";

      // finds opening and closing brackets for tags
      }else if (part.startsWith('&lt;') || part.endsWith('&gt;')) {
        finished += "<span class='t'>" + part + "</span> ";

        // finds attributes in tags
      } else if(part.endsWith("=")) {
        finished += "<span class='a'>" + part + "</span>";

        // finds values to attributes or strings
      } else if (part.startsWith('"')) {
        finished += "<span class='s'>" + part + " ";

      } else if(part.endsWith('"')) {
        finished += part + "</span>"

        // Adds all other parts of the code seperated by spaces
      }else {
        finished += part + " ";
      }
    }
    // debugger;
    // injects formatted code into dom for syntax highlighting
    // console.log(finished);
    return finished;
  }

  static format_css (code) {
    
    // remedies line breaks & space bug
    code = code.replace(/\n/g, " \n ");
    let codeParts = code.split(" "),
        finished = "";

    for (let part of codeParts) {
      // class
      if (part.startsWith(".")) {
          finished += "<span class='l'>"+ part + "</span> ";

      // id
      }else if (part.startsWith("#") 
                && !part.endsWith(";")) {

        finished += "<span class='t'>" + part + "</span> ";

      // property
      }else if (part.endsWith(":")) {
        finished += "<span class='a'>" + part + "</span> ";

      // value
      }else if (part.endsWith(";")) {
        finished += "<span class='s'>" + part + "</span>";

      // @ decorator 
      }else if (part.startsWith("@")) {
        finished += "<span class='t'>" + part + "</span> ";

      // comments
      } else if (part.startsWith("/*")) {
        finished += "<span class='c'>" + part + " ";
      } else if (part.endsWith("/*")) {
        finished += " " + part + "</span>";
      } else {
        finished += part + " ";
      }
    }
    return finished;

  }

  static format_js (code) {
    return code;
  }

  static format_php (code) {
    return code;
  }
}

export default SyntaxHighlight;
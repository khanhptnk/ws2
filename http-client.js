var url = require('url');
var http = require('http');
var fs = require('fs');

if (process.argv.length < 3) {
  console.log('usage: node http-client.js [h|rh|json|user_data] [url]');
  process.exit(1);
}

// The handler function to invoke:
var handlerType = process.argv[2];

// The url to connect to:
var urlStr = process.argv[3] || 'http://www-edlab.cs.umass.edu/cs326/schedule/';

if (!(handlerType === 'h' || handlerType === 'rh' || handlerType === 'json' || 
      handlerType === 'user_data')) {
  console.log('usage: node http-client.js [h|rh|json|user_data] [url]');
  process.exit(1);  
}

var url = url.parse(urlStr);

var options = {
    host: url.hostname,
    path: url.path,
    port: url.port || 80,
    method: 'GET'
  };

/**
 * A function to create a response handler.
 */
function createResponseHandler (callback) {
  /**
   * A function to handle a response.
   */
  function responseHandler(res) {
    // A variable to capture the data from the response:
    var str = '';

    // When data is received we append to string.
    res.on('data', function (chunk) {
      str += chunk;
    });

    // When the connection is closed, we invoke our callback.
    res.on('end', function () {
      callback(str);
    });
  }

  // Return the created function:
  return responseHandler;
}

// Create a basic handler:
var handler = createResponseHandler(function (data) {
  console.log(data);
});

// A slightly more interesting handler:
var re_handler = createResponseHandler(function (data) {
  var lines = data.split("\n");

  console.log('Found Links:');
  var re = /<a +href="([^"]+)".*>/; // <a href="URL">link text</a>
  lines.forEach(function (line) {
    var match = re.exec(line);

    if (match !== null) {
      console.log(match[1]);
    }
  });
});

// Even more interesting:
var json_handler = createResponseHandler(function (data) {
  var obj = JSON.parse(data);
  console.log(obj);
});

// Read user data from a JSON object and output content
var user_data_handler = createResponseHandler(function (data) {
  var obj = JSON.parse(data)
  fs.writeFile('user_client.csv', obj.user_data, function (err) {
      if (err) {
         console.log(err);
      } else {
         console.log("The file 'user_client.csv' was saved!");
      }
  });
  user_data = obj.user_data.split("\r\n");
  user_data = user_data.map(
      function (line) {
          return line.split(',').map(
              function (token) {
                  token = ' ' + token;
                  token = token + Array(15 - token.length).join(' ');
                  token = token + '|'; 
                  return token; 
          }).join(""); 	
      });
  console.log(user_data.join("\n"));
}); 

console.log(' --> connecting to ' + options.host + ' on port ' + options.port);
console.log(' --> resource ' + options.path);

switch (handlerType) {
  case 'h':
    var req = http.request(options, handler);
    req.end();
    break;
  case 'rh':
    var req = http.request(options, re_handler);
    req.end();
    break;
  case 'json':
    var req = http.request(options, json_handler);
    req.end();
    break;  
  case 'user_data':
    var req = http.request(options, user_data_handler);
    req.end();
    break;
  default:
    console.log('unknown handler type');
}



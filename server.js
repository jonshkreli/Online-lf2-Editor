var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   var fileTypePattern = new RegExp('\\.\\w+','g');
   var fileType = pathname.match(fileTypePattern);
   if(fileType==undefined) {
      console.log("Can not read file, it must have the extension");
      response.writeHead(415, {'Content-Type': 'text/html'});
      response.write('Can not read file, it must have the extension');
   }

   // Read the requested file content from file system
   else{
   fs.readFile(pathname.substr(1), function (err, data) {
      fileType = fileType[fileType.length-1];
      console.log('File type reading: '+fileType);
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {
         if(fileType=='.bmp'){
            response.writeHead(200, {'Content-Type': 'image/bmp'});
            response.end(data); // Send the file data to the browser.
         }
         else{
         //If it is not image   
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});
         // Write the content of the file to response body
         response.write(data.toString());
            // Send the response body
            response.end();
      }
      }

   });
   }
}).listen(8082);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');


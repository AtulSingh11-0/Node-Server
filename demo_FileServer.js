/*
    * what did I learn?
    * I learned how to host a local server using node.
    * so concluding the steps on how to host your own server are : 
    * 
    * 1) you will need to require some modules, namely 'http', 'url' and 'fs'
    * 2) after requiring those module use http.createServer method and pass a function with req and res param
    * 3) then you will need to get the URL object with the help of url.parse() and pass req.url and true to it and
    *    store it in a variable
    * 4) then after getting the URL obj you gotta extract the pathName of your file and store it in a variable too
    * 5) then you need to read your file using fs.readFile() and pass your fileName along with a function with params
    *    err and data in it, err is the general error which it will throw such as 404 and data is the buffer data
    *    which will be displayed on the site
    * 6) then inside the function you need to run a if statment where if the err is true then in the res.writeHead()
    *    you need to pass '404', {'Content-Type': 'text/html'} in it and then in next line return res.end('404 not found')
    * 7) if the if-block is not executed which means that it's not a 404 error and hence a 200 success, then in the res.writeHead()
    *    we will pass the same we passed in the if-block, we just need to replace the '404' with '200'
    * 8) then we need to write on the webpage so we will use res.write() and pass the data in it
    * 9) we will end this function by returning the response as return res.end();
    * 10) At last we gotta tell the server to listen and host our site by using the .listen() and passing a portName of our choice
*/

const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer( function(req, res) {

    let link = url.parse(req.url, true);
    let fileName = '.' + link.pathname;

    fs.readFile(fileName, function(err, data) {
        if(err) {
            res.writeHead('404', {'Content-Type': 'text/html'});
            console.log('Server throwed a 404 not found error');
            return res.end('404 not found');
        }
        res.writeHead('200', {'Content-Type': 'text/html'});
        res.write(data);
        console.log(data);
        console.log(`Server running ${fileName} successfully`);
        return res.end();
    });
}).listen(4000);
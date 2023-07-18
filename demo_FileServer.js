const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer( function(req, res) {

    let link = url.parse(req.url, true);
    let fileName = '.' + link.pathname;

    fs.readFile(fileName, function(err, data) {
        if(err) {
            res.writeHead('404', {'Content-type': 'text/html'});
            return res.end('404 not found')
        }
        res.writeHead('200', {'Content-type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);
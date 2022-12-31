var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.url === "/") {
      fs.readFile("index.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else if (["/about", "/contact-me"].includes(req.url)) {
      var parseReq = url.parse(req.url, true);
      var filename = parseReq.pathname.substring(1) + ".html";
      fs.readFile(filename, function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      fs.readFile("404.html", function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);

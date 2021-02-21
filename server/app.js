const express = require("express");
const twitterRouter = require("./routes/twitter");
var fs = require("fs");
var https = require("https");
const app = express();
const hostname = "127.0.0.1";
const port = 3005;
const cors = require("cors");

app.get("/", (req, res) => {
  const str =
    "<!DOCTYPE html>" +
    "<html><head><title>GCTweet Server</title></head>" +
    "<body>" +
    "<h1>" +
    `Server is running.` +
    "</h1>" +
    "</body></html>";

  res.writeHead(200, { "content-type": "text/html" });
  res.write(str);
  res.end();
});

app.use(cors());
app.use("/t-router", twitterRouter);

// http stuff
// app.listen(port, function () {
//     console.log(`Express app listening at http://${hostname}:${port}/`);
// });

// https stuff
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(process.env.PROT || port, function () {
    console.log(`Express app listening at https://${hostname}:${port}/`);
  });

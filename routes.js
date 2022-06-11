const fs = require("fs");

const reqHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
if (url === "/") {
    res.setHeader("COntent-Type", "text/html");
    res.write("<h1>Home</h1>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">clickMe</button></form>'
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {

    const body = [];
    req.on('data', (chunk)=>{
        body.push(chunk)
    });

    return req.on('end', ()=>{
        const parsedbody = Buffer.concat(body).toString()
        const message = parsedbody.split('=')[1]
        // console.log(message)
        fs.writeFile('message.txt', message, (err)=>{
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        })

    })

    res.setHeader("COntent-Type", "text/html");
    res.write("<h1>message</h1>");
    return res.end();
  }
  res.setHeader("COntent-Type", "text/html");
  res.write("<h1>Not Home</h1>");
  res.end();
}


module.exports = reqHandler;
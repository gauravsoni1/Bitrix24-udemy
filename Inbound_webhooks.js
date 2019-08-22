//Inbound Bitrix webhook
//http://92.99.141.71:3000/name

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const App = express();
App.use(bodyParser.json());
App.use(
  bodyParser.urlencoded({
    extended: true
  })
);


//Endpoint that will be called by Bitrix
//Once called , this app will create a new file called tests.txt

App.post("/name", (req, res) => {
  console.log(req.body);

  //Check if the request is from the right bitrix app
  if (
    req.body.auth.domain === "xyz.allcad.com" &&
    req.body.auth.application_token === "coh72r749u7jocbecjf8s7r20j1asdasda"
  ) {
      console.log('Server authenticated')
    fs.writeFile(
      __dirname + "/tests.txt",
      `The deal with ID ${req.body.data.FIELDS.ID} got updated`,
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  }else{
      console.log("Spam request");
  }
  res.send("Execute the program here !!").status(200);
});

//Your app need to be accessible from outside your network if you run this application locally
//you need to do the port forwarding on your router
//Enter the IP address of the computer running the 

App.listen(3000, "192.168.2.14", function() {
  console.log("server started on port 3000");
});

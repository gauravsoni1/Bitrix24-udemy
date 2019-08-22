const express = require("express");
const bodyParser = require("body-parser");
const Axios = require("axios");
const App = express();

let accessToken = "";
let dealData = { TITLE: "" };

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.set("view engine", "ejs");

//Index page , this will help to login to Bitrix (checkout the views/index.ejs and update the client ID to your Bitrix URL)
App.get("/", (req, res) => {
  res.render("index");
});

//Deals get page for getting the auth token.
//Update the Client ID , Client secret to your Bitrix application

App.get("/deals", (req, res) => {
  if (req.query.code) {
    Axios.post(
      `https://oauth.bitrix.info/oauth/token/?client_id=local.5d57eb432701c8.48502774&grant_type=authorization_code&client_secret=dhSK2BQ1dqCsbJPc6TqGJy2RTOUsjLt8TSRPD1UhpdDRQyhDMO&code=${
        req.query.code
      }&scope=user,task`
    )
      .then(res => {
        accessToken = res.data.access_token;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  res.render("deals", { data: dealData });
});

//Get the data from Bitrix for individual deal
App.post("/deals", (req, response) => {
  console.log(req.body, accessToken);
  Axios.post(
    `https://staging.allcadservices.com/rest/crm.deal.get?auth=${accessToken}`,
    { id: req.body.dealid }
  )
    .then(res => {
      console.log(res);
      dealData = res.data.result;
      response.render("deals", { data: dealData });
    })
    .catch(err => {
      console.log(err);
    });
});


//Update to your Servers IP address

App.listen("3000", "192.168.2.18", function() {
  console.log("server started on port 3000");
});

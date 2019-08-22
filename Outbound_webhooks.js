const axios = require("axios");

//The data and the ID of the deal that will be updated
const data = { 
    id: 76,
    fields:
    { 
        "COMPANY_ID": "22"
    }				
};

//Call the API crm.deal.update to update the particulat deal

axios
  .post("https://staging.allcadservices.com/rest/1/w2y22nynxqajb2zi/crm.deal.update",data)
  .then(res => {
    //Logs the data on the console
    console.log(res.data);
  }).catch(err=>{
    //Logs the error on the console
    console.log(err);
  })

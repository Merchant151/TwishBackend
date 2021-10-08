require('dotenv').config();
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);
const fs = require('fs');
var ourdata = "";
//read file to data
fs.readFile('test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const jsonArray = [];
  //ourdata = data;
  //console.log(typeof ourdata);
  //console.log(data);
  ourdata = data.replace(/\[/g,'');
  ourdata = ourdata.replace(/\]/g,'');
  //marking separators
  ourdata = ourdata.replace(/\},\{/g,"}(,){");
  ourdata = ourdata.replace(/\}\{/g,"}(,){");
  //console.log("after replacement:");
  //console.log(ourdata);
  const array = ourdata.split("(,)");
  //console.log("array at 1"+array[1]);
  //console.log("\n\n\n")
  for (let i = 0; i < array.length; i++) {
  console.log(i);
  //console.log(""+array[i]);
  jsonArray.push(JSON.parse(array[i]));
  console.log(jsonArray[i].message);

  }
  const msg = setTwishData(jsonArray[1]);
  sendTwish(msg);
  //testEmail();
  //console.log(data);
})

function setTwishData(jsonObject){
  console.log(jsonObject.email);
 const msg = {
   to: ""+jsonObject.email,
   from: "Twish2021@outlook.com",
   subject: "Incoming Twish",
   text: jsonObject.message,
 }
  return msg
  console.log("Called setTwishData");

}

function sendTwish(msgData) {
  //add a check to insure data is complete
  sgMail
    .send(msgData)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

}

function testfunction() {
  console.log("calling Default function from a different class");
  console.log(process.env.SENDGRID_API_KEY);

}
function testEmail(){
  //console.log(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "joshntram@gmail.com",
    from: "Twish2021@outlook.com",
    subject: "Fifth Sendgrid Test",
    text: "This email was sent from the backend server"
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

}

//checking scope
//console.log("global scope: "+ourdata);

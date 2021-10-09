require('dotenv').config();
var isEqual = require('lodash.isequal');
const file = "test.txt"
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);
const fs = require('fs');
var ourdata = "";
//read file to data
console.log("AutoTwish.js started.")
fs.readFile(file, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const array = dataslice(data);

  var jsonArray = [];
  for (let i = 0; i < array.length; i++) {
  jsonArray.push(JSON.parse(array[i]));
  console.log(jsonArray[i].message);
  }
  //removecopys
  jsonArray = removecopys(jsonArray);
  //sendanydue
  sendAnyDue(jsonArray);

  //save
  save(jsonArray);
});

function sendAnyDue(jsonArray){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');

  console.log(today);
  for (let i = 0; i < jsonArray.length; i++) {
    console.log(jsonArray[i].date);
    var dateArray = (""+jsonArray[i].date).split('-');
    console.log(mm == dateArray[1]);
    console.log(dd == dateArray[2]);

    if(mm == dateArray[1]&& dd == dateArray[2]){
      var msg = setTwishData(jsonArray[i]);
      sendTwish(msg);

    }
  }
}

function removecopys(jsonArray){
  var remove = false;
  var wasBroke = false;
  do{
    wasBroke =false;
    remove = false;
    for (let i = 0; i < jsonArray.length; i++) {
      console.log(i);
      for (let j = 0; j < jsonArray.length; j++) {
        wasBroke = false;
        if(i != j){
          console.log(i+" "+j)
          if(isEqual(jsonArray[i],jsonArray[j])){
            console.log("found copy attempting removal");
            jsonArray.splice(j,1);
            wasBroke = true;
            remove = true;
            break;
          }
        }
      }
      if(wasBroke){
        break;
      }
    }
  }while(remove)
  for (let i = 0; i < jsonArray.length; i++) {
  //checking to make sure all coppies are removed.
  console.log(jsonArray[i].message);
  }

  return jsonArray;
}

function save(jsonArray){
  fs.writeFile(file, JSON.stringify(jsonArray), function(err) {
      if (err) {
          console.log(err);
      }
  });
}

function dataslice(data){
  ourdata = data.replace(/\[/g,'');
  ourdata = ourdata.replace(/\]/g,'');
  //marking separators
  ourdata = ourdata.replace(/\},\{/g,"}(,){");
  ourdata = ourdata.replace(/\}\{/g,"}(,){");
  const array = ourdata.split("(,)");

  return array;
}

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

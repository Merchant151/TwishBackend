const express = require("express");
const cron = require('node-cron');
const bodyParser = require("body-parser");
const fs = require('fs');
var request = require('request');
//the bodyParser is middle ware used to process data from a post request
const PORT3 = process.env.PORT3 || 3003;
const PORT = process.env.PORT || 3001; //todo change this to 443

const router = express.Router();

const app = express();
const app2 = express();

//configureing express to use bodyParser
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.json());
console.log("bodyParser set");

//enable cors polocy
app2.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//1 minute schedule
var cronschedule2 = '* * * * *';
//var cronschedule2 = '* * * * *';
//8am
var cronschedule =   '*/5 * * * *';
const autoTwish = require("./AutoTwish.js");
cron.schedule(cronschedule, function() {
  console.log('cron job ran');
  try{
    console.log("running auto");
    autoTwish.auto();
  }catch(err){
    console.log('there was an error with auto'+err);
  }
  //AutoTwish.js;GrabData
});
/*
//trying to print file every minute.
cron.schedule(cronschedule2, function(){
//added this function to keep server awake
  //console.log('server log.')
  const file = "test.txt"
  fs.readFile(file, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const array = data;
    //var jsonArray = [];
    //for (let i = 0; i < array.length; i++) {
    //jsonArray.push(JSON.parse(array[i]));
    //console.log(jsonArray[i].message);
    //console.log(array);
    //}
})
});
*/

cron.schedule('*/16 * * * *', function() {
  //console.log('running a get every 16th minute to stay awake');
  request({
    uri: 'https://aqueous-retreat-86609.herokuapp.com/',
    port: 3005,
    method: 'GET'
    }, function (err, res, body) {
          console.log('sending get');
          console.log(res.message);
          console.log(res.statusCode);
    });
  });


app2.post('/',  function(req, res, next) {
console.log("req of POST: "+ req +" req.body stringify" + JSON.stringify(req.body) +
  "writting file");
  fs.appendFile("test.txt", JSON.stringify(req.body), function(err) {
      if (err) {
          console.log(err);
      }
  });

console.log(`statusCode: ${res.statusCode}`);
 res.end('Passed to client.')
});

app.get("/api", (req, res) => {
  res.json({ message: "Attempting post!" });
});

app2.use("/", router);
app2.listen(PORT, () => console.log("Server listening at " + PORT));

app.listen(PORT3, () => {
  console.log(`Server listening on ${PORT3}`);
});

const express = require("express");
const cron = require('node-cron');
const bodyParser = require("body-parser");
const fs = require('fs');
//the bodyParser is middle ware used to process data from a post request
const PORT = process.env.PORT || 3001;
const PORT2 = process.env.PORT2 || 3002;

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


//5 minute schedule
//var cronschedule = '* * * * *';
//8am
var cronschedule =   '0 8 * * *';
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
cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
});
*/

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
app2.listen(PORT2, () => console.log("Server listening at http://%s:%s",
    "localhost", PORT2));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
//the bodyParser is middle ware used to process data from a post request
const PORT = process.env.PORT || 3001;
const PORT2 = process.env.PORT || 3002;

const router = express.Router();

const app = express();
const app2 = express();

//attempting to enable cors polocy
app2.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* not needed
app.get('/', function(req, res, next) {
  // Handle the get for this route
});
*/
app2.post('/', function(req, res, next) {
 // Handle the post for this route
 console.log("POST triggered at / instead of /handle");
//failled line
 //console.log("body of post: "+ JSON.stringify(req.body, null, 2));
//attempt two
console.log("req of POST: "+ req +" " + JSON.stringify(req.body) +" "+req);
console.log("res of POST: "+ res+" "+ res.body);
console.log("next of POST: "+ next+" "+ res.body);
 res.end('Passed to client.')
});

app.get("/api", (req, res) => {
  res.json({ message: "Attempting post!" });
});

//configureing express to use bodyParser
app2.use(bodyParser.urlencoded({ extended: false }));
app2.use(bodyParser.json());
console.log("times i am triggered");
/* I am going to try app post next.
router.post("/handle",(reqPost,resPost) => {
//code to perform particular action.
//To access POST variable use req.body()methods.
console.log(reqPost.body);
});
*/
app2.post("/handle", (req, res) => {
  console.log("POST triggered");
});

app2.use("/", router);
app2.listen(PORT2, () => console.log("Server listening at http://%s:%s",
    "localhost", PORT2));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
//the bodyParser is middle ware used to process data from a post request
const PORT = process.env.PORT || 3001;
const PORT2 = process.env.PORT || 3002;

const router = express.Router();

const app = express();
const app2 = express();

//configureing express to use bodyParser
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.json());
console.log("bodyParser set");

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

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
//bodyParser,
app2.post('/',  function(req, res, next) {
 // Handle the post for this route
 console.log("POST triggered at / instead of /handle");
//failled line
 //console.log("body of post: "+ JSON.stringify(req.body, null, 2));
//attempt two
//bodyParser.urlencoded({extended: true});
console.log("req of POST: "+ req +" req.body stringify" + JSON.stringify(req.body) +
  "req.params ");
//console.log("res of POST: "+ res+" "+ JSON.stringify(req));
console.log(`statusCode: ${res.statusCode}`);
 res.end('Passed to client.')
});

app.get("/api", (req, res) => {
  res.json({ message: "Attempting post!" });
});


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

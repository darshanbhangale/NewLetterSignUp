const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

// const request = require("request");
// const { Http2ServerRequest } = require("http2");
// const { post } = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/320a2a5670";

    const options = {
        method: "POST",
        auth: "rajat:5d751c6a535ba88b8a55c1636536a1f6-us5",
    }


    const request =  https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/sucess.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});



// API key
// 5d751c6a535ba88b8a55c1636536a1f6-us5

// List id 
// 320a2a5670 

// https://warm-headland-28169.herokuapp.com/
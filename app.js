//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// app is an instance of express
app.use(express.static("public"));
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));



app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");

});
//70e8a270234ef26d4d98b7ba99690d19-us19

//list id  6ccaea413a
app.post("/",function(req,res)
{

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

var data = {
    members: [
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};
var jsonData = JSON.stringify(data);

    var options =
    {
        url:"https://us19.api.mailchimp.com/3.0/lists/6ccaea413a",
        method:"POST",
        headers:
        {
            "Authorization":"nitanshu 70e8a270234ef26d4d98b7ba99690d19-us19"
        },
        body:jsonData

    };
    request(options,function(error,response,body)
    {
        if(error)
        {
            res.send("There was an error with sugn up please try again ")
        }
        else{
            if(response.statusCode===200)
            {
                res.sendFile(__dirname+"/success.html");
            }
            else
            {
                res.sendFile(__dirname+"/faliure.html");

            }
        }

    });
});

app.post("/faliure.html",function(req,res)
{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function()
{
    console.log("Server is running on port 3000");
});


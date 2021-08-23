 // Permissão
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

  // Declarando um novo 
   var app = express()
   app.use(bodyParser.json())
   app.use(awsServerlessMiddleware.eventContext())

    app.use(function(req, res, next) {
        res.header("Acess-Control-Allow-Original", "*")
        res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-Width,Content-Type")
        next()
    });

     const AWS = require('aws-sdk')
     const docClient = new AWS.DynamoDB.DocumentClient();

     function id () {
         return Math.random().toString(50).substring(2) + Date.now().toString(36);

     }

    

  app.post('/contact', function(req, res) {

    console.log(req);

    var params = {
        TableName : process.env.STORAGE_FORMATTABLE_NAME,
        Item: {
            id: id(),
            name: req.body.name,
            email:req.body.email,
            message:req.body.message

        }
    }

    docClient.put(params,fuction(err,data)) {
        if(err) res.json({ err })
        else res.json({ sucess: 'Contact create sucessfully !'})
    })
});


app.listen(3000, function() {
    console.log("App started")
});


const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const nodemailer = require('nodemailer')
var port = process.env.PORT || 3001; //create a port for listening for requests...
const MongoClient = require('mongodb').MongoClient;
const password = '' //Enter password here
const uri = 'mongodb+srv://stefy:' + password + '@cluster0-xhrbw.mongodb.net/test?retryWrites=true'; //This the uri to the remote MongoDb Cluster

const app = express()
app.use(bodyParser.urlencoded({ extended: true })); //init body parser
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors())



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sstefyboy@gmail.com',
        pass: 'Sep51995'
    }
});



let studentsArray = new Array()
let emailHtml = "<div class=\"wrapper\" style = \"text-align: center;\"><h1>Results From Surveys</h1>"

function myFunction(value, index, array) {
     emailHtml += "<table><tr><th>Email</th><th>Rating</th><th>Favorite Topic</th><th>Questions</th><th>Tell A Friend</th><th>Favorite Social Media</th></tr>"+
     "<tr><td>"+value.user_email +"</td><td>"+value.rating +"</td><td>"+value.fav_topic +"</td><td>"+value.questions +"</td><td>"+value.tell_option +"</td><td>"+value.social_media +"</td></tr></table></div>"


   

  }


app.get('/', (req, res) => {

    res.sendFile(path.resolve('index.html'))



})

app.get('/send', (req, res) => {
    MongoClient.connect(uri, { useNewUrlParser: true })
        .then(client => {
            const db = client.db('Financial-Literacy-App');
            const applicant = db.collection('applicant')
            applicant.find({}).toArray(function (err, result) {
                if (err) throw err;
                result.forEach(myFunction)
                

                

                
                var mailOptions = {
                    from: 'sstefyboy@gmail.com',
                    to: 'sstefyboy@gmail.com',
                    subject: 'Sending Email using Node.js',
                    html: emailHtml
                };
                
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                
                
                
                
                




                client.close();
            });

            //Testing to check if i could insert a collection to the remote DB
            //var myobj = {name: "Stefon", age:"23", language: "English"}
            /*players.insertOne(myobj, function(err,res){
                if(err) throw err;
                console.log("1 document inserted")
            })*/


        }).catch(err => console.log(err))


        res.json("Email Succesfully Sent. CAUTION DO NOT SPAM BUTTON OR YOU WILL SPAM YOUR EMAIL.")
        
        

})


app.listen(port); //Listens for requests (asynchronous!)
console.log('Listening on port ' + port);
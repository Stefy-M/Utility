const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const nodemailer = require('nodemailer')
var port = process.env.PORT || 3001; //create a port for listening for requests...
const MongoClient = require('mongodb').MongoClient;
const password = 'sep51995...' //Enter password here
const uri = 'mongodb+srv://stefy:' + password + '@cluster0-xhrbw.mongodb.net/test?retryWrites=true'; //This the uri to the remote MongoDb Cluster

const app = express()
app.use(bodyParser.urlencoded({ extended: true })); //init body parser
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors())


/*
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssy@gmail.com',
        pass: ''
    }
});

var mailOptions = {
    from: 'sstefyboy@gmail.com',
    to: 'martin.stefon@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
*/
let studentsArray = new Array()

function myFunction(value, index, array) {
    let emailHtml = ""
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
                
                
                




                client.close();
            });

            //Testing to check if i could insert a collection to the remote DB
            //var myobj = {name: "Stefon", age:"23", language: "English"}
            /*players.insertOne(myobj, function(err,res){
                if(err) throw err;
                console.log("1 document inserted")
            })*/


        }).catch(err => console.log(err))



        
        

})


app.listen(port); //Listens for requests (asynchronous!)
console.log('Listening on port ' + port);
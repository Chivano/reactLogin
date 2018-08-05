const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

let session = require("express-session");


const newUserQuery = 'INSERT INTO users.users(username, password) VALUES($1, $2) RETURNING *'
const getPassword = 'SELECT password FROM users.users WHERE username = $1'

const config = {
    database: "postgres",
    user : "passwordWriter",
    password : "postgres"
}

const { Client } = require('pg')
var client = null;

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false,
        cookieName: 'session',
        maxAge: 1000 * 60 * 60 * 24,
        path : "/",
        name : "bajs"
    }
}));


app.use([express.json()])
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

async function addNewUser  (valuesArray) {
    client = new Client(config);
    await client.connect()
    client.query(newUserQuery, valuesArray, (err, res) => {
        if (err) {
          client.end()
        } else {
          client.end()
        }
      })
}

function checkCredentials  (password, userName) {
    var promiseArray = [];
    var userAllowed = false;

    client = new Client(config);
    client.connect()
        var promise = new Promise(function(resolve, reject){      
        client.query(getPassword, [userName], (err, res) => {
            console.log(res.rows.length,"res")
            if(res.rows.length == 0){   
                reject("No matching credentials")
            }
            else{
                if (err) {
                    client.end((err) => {
                        if (err) {
                        console.log('error during disconnection', err.stack)
                        reject(err, "Error")
                        }
                    })
                } else {  
                    res.rows.forEach((userObject)=>{
                        bcrypt.compare(password, userObject.password).then(function(x){
                            resolve(x);
                        }, function(err){
                            resolve(err)
                        })
                                
                    });  
                }   
            }
        })  
    })
    return promise;
}

function hashPassword (password) {

    const saltRounds = 10;
    const myPlaintextPassword = 'hej';

    return bcrypt.hash(password, saltRounds);
}

app.post('/newuser', (req, res) => {
    console.log(req.body,"req")
    var userName = req.body.userName;
    var password = req.body.password;

    console.log(password,"password")
    console.log(userName,"userName")

    var hash = hashPassword(password);
    
    hash.then((e)=> {      
        console.log(e,"e") 
        var newUser = [userName, e];
        addNewUser(newUser)  
    });
    

    res.send("Password Saved")

})

app.post('/login', (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    var userLoggedOn = checkCredentials(password,userName)
    
    userLoggedOn.then(function(loggedOn){
        if(loggedOn){
            res.sendStatus(200)
        }
    }, function(err){
        res.sendStatus(403)
    })
})

app.get('/dashboard', (req, res) => {

    if(!req.session.loggedOn){
        res.status(401).send("NOT AUTENTICATED")
    }
    else{
        res.status(200).send("Authenticated")
    }

    

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
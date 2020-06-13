const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const fetch = require("node-fetch");

const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.get('/', (req, res, next) => {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
        let arr = [];
        for (let i = 0; i < json.length; i++) {
            let users = {
                id: json[i].id,
                name: json[i].name,
                username: json[i].username,
                email: json[i].email,
            }
            arr.push(users);

            stringUsers = JSON.stringify(arr, null, 2);
            fs.writeFile('./users.json', stringUsers, function (err) {
                if (err) throw err;
            });
        }
        return res.send("Welcome")
    }).catch(err => err)
});


app.get('/users', (req, res, next) => {
    fs.readFile('./users.json', function(err, data) {
        res.write(data);
        return res.end();
    });
});

app.get('/name', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let arrNames = [];
        let pData = JSON.parse(data);
        for (let i = 0; i < pData.length; i++) {
            let names = {
                name: pData[i].name
            }
            arrNames.push(names);
        }

        res.send(arrNames);
    });
});

app.get('/email', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let arrEmail = [];
        let eData = JSON.parse(data);
        for (let i = 0; i < eData.length; i++) {
            let emails = {
                email: eData[i].email
            }
            arrEmail.push(emails);
        }

        res.send(arrEmail);
    });
});

app.get('/username', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let arrUsernames = [];
        let uData = JSON.parse(data);
        for (let i = 0; i < uData.length; i++) {
            let usernames = {
                username: uData[i].username
            }
            arrUsernames.push(usernames);
        }

        res.send(arrUsernames);
    });
});

app.get('/delete', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let newData = JSON.parse(data);
        let x = newData.pop();
        res.send(newData);
    });
});

app.get('/deleteall', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let newerData = JSON.parse(data);
        newerData.splice(0, 10);
        res.send(newerData);
    });
});

app.get('/newuser', (req, res, next) => {
    fs.readFile('./users.json', 'utf8', function(err, data) {
        let newuser = JSON.parse(data);

        /*const newId = (newuser) => {
            if (newuser.length > 0) {
                return array[array.length - 1].id + 1
            } else {
                return 1
            }
        }*/

        /*const { name, email, username } = req.body
        if
        newuser.push(req.body);
        res.send(newerData);*/
    });
});

app.use((req, res, next) => {
    res.status(302).send(`Head over to /users`);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
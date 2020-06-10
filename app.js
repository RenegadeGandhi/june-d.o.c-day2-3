const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const fetch = require("node-fetch");

const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/users', (req, res, next) => {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            let users = {
                id: json[i].id,
                name: json[i].name,
                username: json[i].username,
                email: json[i].email,
            }
            onsole.log(users);
        }
    });
    /*fs.appendFile('users.json', word, function (err) {
        if (err) throw err;
        res.status(200).send("Word Added!");
    });*/
});


app.use((req, res, next) => {
    res.status(302).send(`Head over to /users`);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
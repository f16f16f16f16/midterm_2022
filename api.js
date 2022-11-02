const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_login_midterm_2022'
});


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, '/views'))


app.use(session({
    secret: 'folky',
    resave: true,
    saveUninitialized: true
})
);


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/gallery', (req, res) => {
    res.sendFile(__dirname + '/views/gallery.html');
})
app.get('/staff', (req, res) => {
    res.sendFile(__dirname + '/views/staffs.html');
})
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
})

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const post={
        username: username,
        password: password,
    };

    connection.query("INSERT INTO accounts SET ?", post, (err)=>{
        console.log('Data Inserted');
        return res.redirect('/courses');
    });

});

app.get('/login', (req, res) => {
    if(req.session.loggedin)
    connection.query("SELECT * FROM accounts", (err, results) =>{
        res.redirect('/courses');
    });
    else
    res.sendFile(__dirname + '/views/login.html')
})

app.get('/courses', (req, res) => {
    if(req.session.loggedin)
    connection.query("SELECT * FROM accounts", (err, results) =>{
        res.sendFile(__dirname + '/views/courses.html');
    });
    else
    res.redirect('/login');
});



app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        connection.query(
            "SELECT * FROM accounts WHERE username = ? AND password = ?",
            [username, password],
            (err, results, fields) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/courses');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                res.end();
            }
        );
    } else {
        res.redirect('/logout');
    }
})

app.get("/logout", function(req, res) {
    if (req.session.loggedin){
    req.session.destroy(function (err) {  
        res.redirect('/');
          res.end();
    });
}
});


  
app.listen(4000, () => {
    console.log('Application listening on port 4000!')
});
const express = require('express')
const app = express()
const sessions = require('express-session');
const path = require('path')


const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: 'folk',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname));

app.set('views', path.join(__dirname, '/views'))



const myusername = 'admin'
const mypassword = 'Web999'
const myusername2 = 'commu'
const mypassword2 = 'Cosci7749'

// a variable to save a session
var session;

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

app.get('/login', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.redirect('/courses')
    } else{
        res.sendFile(__dirname + '/views/login.html');
    }

})

app.get('/courses', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.sendFile(__dirname + '/views/courses.html');
    } else{
        res.redirect('/login')
    }
});



app.post('/login', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword || req.body.username == myusername2 && req.body.password == mypassword2 ) {
        session = req.session;
        session.userid = req.body.username;
        console.log(req.session)
        res.redirect('/courses')

    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(req.session)
    res.redirect('/home');
});


  
app.listen(4000, () => {
    console.log('Application listening on port 4000!')
});
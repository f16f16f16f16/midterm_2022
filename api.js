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
app.set('view engine', 'ejs')


app.use(session({
    secret: 'folky',
    resave: true,
    saveUninitialized: true
})
);


app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.render('index.ejs',{isLogIn: true})
    } else{
        res.render('index.ejs',{isLogIn: false})
    }
})

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/crud', (req, res) =>{
    if(req.session.loggedin)
    connection.query("SELECT * FROM accounts", (err, results) =>{
        res.render("crud.ejs", {
            posts: results
        });
        console.log(results);
    });
    else
    return res.redirect('/courses');
  });

  app.get('/loginlog', (req, res) =>{
    if(req.session.loggedin)
    connection.query("SELECT * FROM extra", (err, results) =>{
        res.render("loginlog.ejs", {
            posts: results
        });
        console.log(results);
    });
    else
    return res.redirect('/courses');
  });

app.get('/gallery', (req, res) => {
    if (req.session.loggedin) {
        res.render('gallery.ejs',{isLogIn: true})
    } else{
        res.render('gallery.ejs',{isLogIn: false})
    }
})
app.get('/staff', (req, res) => {
    if (req.session.loggedin) {
        res.render('staffs.ejs',{isLogIn: true})
    } else{
        res.render('staffs.ejs',{isLogIn: false})
    }
})
app.get('/contact', (req, res) => {
    if (req.session.loggedin) {
        res.render('contact.ejs',{isLogIn: true})
    } else{
        res.render('contact.ejs',{isLogIn: false})
    }
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
        return res.redirect('/crud');
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
        res.render('courses.ejs',{isLogIn: true})
    });
    else
    res.redirect('/login');
});



app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = `INSERT INTO extra (id, count, time) VALUES ("${username}", +1, CURRENT_TIMESTAMP);`
    

    if (username && password) {
        connection.query(
            "SELECT * FROM accounts WHERE username = ? AND password = ?",
            [username, password],
            (err, results, fields) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    connection.query(sql);
                    res.redirect('/courses');
                } else {
                    res.redirect('/login');
                }
                res.end();
            }
        );
    } else {
        res.redirect('/logout');
    }
});

app.get('/edit/:id', (req, res) => {
    const edit_postID = req.params.id;

    connection.query(
        "SELECT * FROM accounts WHERE id=?", 
        [edit_postID],
        (err, results) => {
            if (results) {
                res.render('edit', {
                    post: results[0],
                });
            }
        }
    );
});
app.post('/edit/:id', (req, res) => {
    const update_username = req.body.username;

    const update_password = req.body.password;
    const id = req.params.id;
    connection.query(
        "UPDATE accounts SET username = ?,password = ? WHERE id = ?",
        [update_username, update_password, id],
        (err, results) => {
            if (results.changedRows === 1) {
                console.log("Post Updated");
            }
            return res.redirect('/crud');
        }
    );
});

app.get('/delete/:id', (req, res) => {
    connection.query(
        "DELETE FROM accounts WHERE id = ?",
        [req.params.id],
        (err, results) => {
            return res.redirect('/crud');
        }
    );
});

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
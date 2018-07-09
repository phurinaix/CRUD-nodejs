const express = require('express');
const mysql = require('mysql');
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUD'
});

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "pug");

// C => Create
app.post("/Create/add", (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    var sql = "INSERT INTO user (name, email) VALUES ('" + input.name + "','" + input.email + "')";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});
app.get("/Create", (req, res) => {
    res.render("create", {title:"CREATE"});
});

// R => Read
app.get("/", (req, res) => {
    var sql = "SELECT * FROM user";
    con.query(sql, (err, result) => {
        res.render("read", {title:"READ", data:result});
    });
});

// U => Update
app.get("/Update/:id", (req, res) => {
    var sql = "SELECT * FROM user WHERE id='" + req.params.id + "'";
    con.query(sql, (err, result) => {
        res.render("update", {title:"UPDATE", data:result});
    });
});
app.post("/Update/:id", (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        name: input.name,
        email: input.email,
    }
    var sql = "UPDATE user SET name='" + data.name + "', email='" + data.email + "' WHERE id ='" + req.params.id + "'";
    con.query(sql, (err, result) => {
        if(err) {
            console.log("error", err);
        }
        res.redirect("/");
    })
});


// D => Delete
app.get("/Delete/:id", (req, res) => {
    var sql = "DELETE FROM user WHERE id='" + req.params.id + "'";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});
app.listen(3000, () => {

});
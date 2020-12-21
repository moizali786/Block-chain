const express = require('express')
const app = express();
const port = 3000;
    
app.get('/', (req, res) => {
    res.send('This is ROOT Page')
    });

app.get('/home', (req, res) => {
    res.send('This is Home Page')
    });
    
app.get('/about', (req, res) => {
    res.send('This is About Page')
    console.log("Ali")
    });
      
app.get('/info', (req, res) => {
    res.send("This is Info Page")
    console.log("Moiz Ali")
    });
app.get('/contact', (req, res) => {
    res.send("This is contact Page")
    console.log("Moiz Ali")
    });

app.get('/login', (req, res) => {
    res.send("This is Login Page")
    console.log("Moiz Ali")
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    });
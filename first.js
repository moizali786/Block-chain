const express = require('express')
const app = express();
const port = 3000;

app.use(express.static("public"));
app.get('/home', (req, res) => {
res.sendFile("C:/Users/OPTIMUS PRIME/moizexp/public/index.html")
console.log("Moiz")
});

app.get('/home/about', (req, res) => {
    res.send('This is About Page')
    console.log("Ali")
    });


 app.get('/home/about/info', (req, res) => {
        res.send("This is Info Page")
        console.log("Moiz Ali")
        });
        app.get('/home/about/cv', (req, res) => {
        
            res.type('json').send(JSON.stringify(arraydt,null,1));
            console.log(arraydt)
            });

app.listen(port, () => {
console.log(`Example app listening on port ${port}!`)
});
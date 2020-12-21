const express = require('express')
const app = express()
const port = 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use( express.static( "views") );
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('./index', {
        mascots: mascots,
        tagline: tagline
    });
});


// // about page
app.get('/about', function(req, res) {
    res.render('./about');
})

app.get('/github', function(req, res) {
    res.render("./github",{
        giturl : "https://github.com/moizali786"
    });
})

app.get('/contacts', function(req, res) {
    res.render("./contacts",{
        email : "moiz.ali01@yahoo.com",
        ph_num : "0304-1234786"
    });
})

app.get('/cv', function(req, res) {
    var mascots = ["EXPERIENCE",
               "Worked In PTCL as an Managaement Trainee from (Jan 2014-Jan 2015)",
               "Worked In UFONE as an Internee from (Jul 2018-Dec 2018)",
               "Worked In NIS Medical as an Sales Trainee from (Jan 2019-Jan 2020)",
               "EDUCATION",
               "Bachelor           Electronics          From Indus University                  (2013)",
               "Intermediate       Pre-Engineering      From Govt Deg Boys College Bufferzone  (2010)",
               "Matric             Science              From H.N Public School                 (2006)",
               "CERTIFICATIONS",
               "03 Months Short Course in FPGA from  Skill Tech (2013)",
	             "03 Months Short Course in Optical Fiber Cable Splicing/Jointing from STEVTA (2014)",
               "03 Months Short Course in GPON from  STEVTA  (2014)",
               "SKILLS",
               "Verilog","Pyhton","Matlab","Assembly Language",
               "Workes on BTS, BSC and MSC equipement of Huawei and ZTE",
               "Worked on Network Monitoring and Analyzing Tools Such as Net Numen, IManager M2000 and IManager U2000"];

    res.render('./cv', {
        mascots: mascots});
});
app.listen(port);
console.log('3000 is the magic port');


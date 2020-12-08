console.log("Precise Age Calculator");
var readline=require('readline');
var takeInput=readline.createInterface(process.stdin,process.stdout)
function rl(){
takeInput.question("Enter your Date of Birth According To Following Format YEAR,MONTH,DAY : ",function(val){
             dob(val)})}

function dob(a){
        var dt = new Date()
        var db = new Date(a)
        var yr = dt.getFullYear()-db.getFullYear()
        var mt = dt.getMonth()-db.getMonth()
        var dy = dt.getDate()-db.getDate()
        var dy1 = Math.abs(dy)
        var mt1 = Math.abs(mt)
        if(isNaN(yr) == true && isNaN(mt) == true && isNaN(dy) == true){
            console.log("You Have Not Entered Your Date of Birth According To Given Format");
            rl()
        }else{
        console.log(`Your Precise Age is ${yr} Years ${mt1} Months and ${dy1} Days`);
        takeInput.close()}}
    rl()











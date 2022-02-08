const express = require('express')
var parser = require('body-parser');
const mongoose = require('mongoose');
let sha256 = require('js-sha256') 
let data = require('./seller');
let data1 = require('./verfy');
let property_info = require('./propery');
let block = require('./block')
let blockchain  =require('./blockchain')
let transs = require('./transaction');
let transs1 = require('./transaction1');
let swal = require("sweetalert");
let Swal = require("sweetalert2");
let genesblock = new block()
let genesisblock = new blockchain(genesblock)
const app = express()
const port = 3000;

var mongoDB = 'mongodb://localhost/project';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true})
.then((result) => console.log("success"))
.catch((err) => console.log("error"))

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use( express.static( "views"));
// use res.render to load up an ejs view file
function val(val1,val2){
  return { ammount: val1, date : val2 }
}
let register ;
let  block1 ; 
let num;
let cniccheck;
let Owner;
let seller;
let buyer;
let adress;
let propertyinfo;
let property = []
let k = 0;
let notary;
let property_address = [];
let property_address_1 = [];
// notary.hash = "0000000"
let notary_data_cnic;
let buyer_data_cnic;
let Owner_data_cnic;
let newNumberArray;
// let property_verification_officer;
let verificationofficer;
function makehash(x){
  let comb  = JSON.stringify(x)
  let hash = sha256(comb)
  return hash}


const find_reg_data = (array, key) => {
  let n_array = []
  for(let i = array.length - 1; i >= 1; i--){
  if(array[i].transactions[0].transclass === "Registration")
    {
    if(array[i].transactions[0].owner === key){
      // return array[i].trans[0].reg
          for (const element of array[i].transactions[0].propertydetails) {
                        n_array.push(element)
                        console.log(element);
                      }
    }
  }
}
  return n_array;
};


const find_buyernseller_data = (array, key,value) => {
  let n_array3 = []
  for(let i = array.length - 1; i >= 1; i--){
  if(array[i].transactions[0].transclass === "Transfer")
    {
    if(array[i].transactions[0][value] === key){
      // return array[i].trans[0].reg
            n_array3.push(array[i].transactions[0].propertyinfo)
            console.log(array[i].transactions[0].propertyinfo);
                      
    }
  }
}
  return n_array3;
};




var myPromise2 = (collectionname,findvalue,array) => (
  new Promise((resolve, reject) => {
      // var cursor = db.collection(collectionname).find({ hash: { $in: findvalue } }).project({prop_owner_cnic: 1,sr_no:1,address:1,type:1})
      var cursor = db.collection(collectionname).find({ hash: { $in: findvalue } })
      cursor.forEach(function(doc,err){
          if(err){
              console.log("Error");
          }
          else{ array.push(doc)
          }
      },function() {  
          if(array.length == 0){
            array.push("Property Not Found")
          resolve(array)
        }
        else{ resolve(array)
      }  
  })
})
);

function chek_for_arr(isMember,val) {
  let array_go = []
  for (variable of isMember) {
      (variable == "Property Not Found") ? array_go.push(variable) : array_go.push(variable[val])
    }
  return (array_go)
}


function popdata(property) {
  db.collection("property").insertMany(property, function (err, result) {     
    if (err) {
                console.log("error");
              } else {
                console.log("inserted data");
                }}
                );}

// index page 
app.get('/', function(req, res) {
  res.render('./index',{
    masots5 :"false"
      });
    // res.render('./index',{
    //   });
});


// about page
app.get('/about', function(req, res) {
  var mascots = [
    { name: 'Registration Process Now Became a Lot Easier.'},
    { name: "Property Buying & Selling Services At it's Preak."},
    { name: 'User Friendly Interface that is not Critically Dependent on Usability'},
    { name: 'Uses A Revolutionary Blockchain Technology To Secure Your Information'}
];

res.render('./about', {
    mascots: mascots
});
})

app.get('/form',(req,res)=>{

res.render('./form',{
  action : "/seller",
  heading : "Add Details of Seller",
  type1 : "hidden",
type : "hidden",
required : "",
required1 : "",masots5 : "",masots6:""})
})

app.post('/seller',(req,res)=>{
    seller = new data()
    seller.name = req.body.name
    seller.address   = req.body.addres
    seller.cnic   = req.body.cnic
    seller.email  = req.body.email
    seller.ph_no = req.body.ph_no
    cniccheck = seller.cnic
      db.collection("Property_Owner").findOne({cnic :seller.cnic}, function(err, doc) {
          if (err) throw err;
          if(doc && doc._id){
              if(seller.cnic == doc["cnic"] && doc["restriction"] == false){
                cniccheck = seller.cnic
                  seller.hash = makehash([seller.cnic])
                  // transac.seller = seller.hash
                  console.log(seller);
                res.render('./form',{
                    action : "/buyer",
                    heading : "Add Details of Buyer",
                    type : "hidden",
                    type1 : "hidden",
                    required : "",
                    required1 : "",masots5 : "",masots6:""});
              }else{
        res.render('./form',{
          action : "/seller",
          heading : "Add Details of Seller",
          type1 : "hidden",
        type : "hidden",
        required : "",
        required1 : "",masots5 : "true",masots6:"This Person is Restricted To Sell Any Property"})
              }
          }else{
                  res.render('./form',{
                    action : "/seller",
                    heading : "Add Details of Seller",
                    type1 : "hidden",
                  type : "hidden",
                  required : "",
                  required1 : "",masots5 : "true",masots6:"This Person is Not Registered"})
          }
      });
  })

  app.post('/ownerdata',(req,res)=>{
    Owner = new data()
    Owner.name = req.body.name
    Owner.address   = req.body.addres
    Owner.cnic   = req.body.cnic
    Owner.email  = req.body.email
    Owner.ph_no = req.body.ph_no
    num = req.body.prop_amount
    cniccheck = Owner.cnic
    db.collection("Property_Owner").findOne({cnic :Owner.cnic}, function(err, doc) {
      if (err) throw err;
      if(doc && doc._id){
          if(Owner.cnic == doc["cnic"] && doc["restriction"] == false){
            Owner_data_cnic = doc["cnic"]
            Owner.hash = makehash([Owner.cnic])
            register = new transs1(Owner.hash)
              console.log(Owner);
              res.render('./property',{
                action : "/propertyinfo",
                type1 : "active",
                type  : "hidden",
              required1 : "required",masots4 : "",masots5 : "",masots6:""});
          }else{
            res.render('./form',{
              action : "/ownerdata",
              heading : "Add Details of Property Owner",
            type1 : "active",
            type  : "hidden",
          required1 : "required",required : "",
        masots5 : "true", masots6 : "This Person is Restricted To Register Any Property"})
          }
      }else{
        Owner.hash = makehash([Owner.cnic])
        register = new transs1(Owner.hash)
            console.log(Owner);
        res.render('./property',{
          action : "/propertyinfo",
          type1 : "active",
          type  : "hidden",
        required1 : "required",masots4 : "",masots5 : "",masots6:""})
      }
  });
  console.log(Owner);
  })

app.post('/buyer',(req,res)=>{
    buyer = new data()
    buyer.name = req.body.name
    buyer.address   = req.body.addres
    buyer.cnic   = req.body.cnic
    buyer.email  = req.body.email
    buyer.ph_no = req.body.ph_no
    if( seller.cnic == buyer.cnic){
       res.render('./comf',{
      manheading : "Back To Home Page",
      anchor :  "/",
      heading : "Seller and Buyer Information cannot be same",
    type : "hidden",type1: "hidden",
    head1: "active",head2: "hidden"});}
    else{
      db.collection("Property_Owner").findOne({cnic :buyer.cnic}, function(err, doc) {
        if (err) throw err;
        if(doc && doc._id){
            if(buyer.cnic == doc["cnic"] && doc["restriction"] == false){
              buyer_data_cnic = doc["cnic"]
                buyer.hash = makehash([buyer.cnic])
                // transac.buyer = buyer.hash
                console.log(buyer);
                notary = {hash : "0000000"}
                res.render('./comf',{
                  manheading : "Back To Home Page",
                  anchor :  "/",
                  heading : "Is Real Estate Agent Included In Your Tansaction",
                type : "hidden",type1: "active",
                head2: "active",head1: "hidden"})
            }else{
              res.render('./form',{
                action : "/buyer",
                heading : "Add Details of Buyer",
                type : "hidden",
                type1 : "hidden",
                required : "",
                required1 : "",masots5 : "true",masots6:"This Person is Restricted To Buy Any Property"});
            }
        }else{
          buyer.hash = makehash([buyer.cnic])
          // transac.buyer = buyer.hash
          console.log(buyer);
          notary = {hash : "0000000"}
          res.render('./comf',{
                  manheading : "Back To Home Page",
                  anchor :  "/",
                  heading : "Is Real Estate Agent Included In Your Tansaction",
                type : "hidden",type1: "active",
                head2: "active",head1: "hidden"})
        }
    });
}
  })

  app.get('/notaryofficer', function(req, res) {
      res.render('./form',{
    action : "/notaryofficer",
    heading : "Add Details of Real Estate Agent",
    type : "active",
    type1 : "hidden",
    required : "required",
    required1 : "",masots5 : "",masots6:""});
})

app.get('/verificationofficer', function(req, res) {
  res.render('./form',{
    action : "/verificationofficer",
    heading : "Add Details of Property Verification Officer",
    type : "active",
    type1 : "hidden",
    required : "required",
    required1 : "",masots5 : "",masots6:""});
})
  app.post('/notaryofficer',(req,res)=>{
    notary = new data1()
    notary.name = req.body.name
    notary.address   = req.body.addres
    notary.cnic   = req.body.cnic
    notary.email  = req.body.email
    notary.ph_no = req.body.ph_no
    notary.designation  = req.body.desg
    notary.id_number = req.body.id
    notary.organization = req.body.org
    db.collection("real_state-agents").findOne({cnic :notary.cnic}, function(err, doc) {
      if (err) throw err;
      if(doc && doc._id){
          if(notary.cnic == doc["cnic"] && doc["restriction"] == false){
            notary_data_cnic = doc["cnic"]
              notary.hash = makehash([notary.cnic])
              // transac.notary_public_officer = notary.hash
              console.log(notary);
              res.render('./form',{
                action : "/verificationofficer",
                heading : "Add Details of Property Verification Officer",
                type : "active",
                type1 : "hidden",
                required : "required",
                required1 : "",masots5 : "",masots6:""});
          }else{
        res.render('./form',{
          action : "/notaryofficer",
          heading : "Add Details of Real Estate Agent",
          type : "active",
          type1 : "hidden",
          required : "required",
          required1 : "",masots5 : "true",masots6:"This Estate Agent is Restricted"});
          }
      }else{
        notary.hash = makehash([notary.cnic])
        // transac.notary_public_officer = notary.hash
        console.log(notary);
        res.render('./form',{
          action : "/verificationofficer",
          heading : "Add Details of Property Verification Officer",
          type : "active",
          type1 : "hidden",
          required : "required",
          required1 : "",masots5 : "",masots6:""});
      }
  });
  })

  app.post('/verificationofficer',(req,res)=>{
    verificationofficer = new data1()
    verificationofficer.name = req.body.name
    verificationofficer.address   = req.body.addres
    verificationofficer.cnic   = req.body.cnic
    verificationofficer.email  = req.body.email
    verificationofficer.ph_no = req.body.ph_no
    verificationofficer.designation  = req.body.desg
    verificationofficer.id_number = req.body.id
    verificationofficer.organization = req.body.org
    db.collection("property_verification_officer").findOne({cnic :verificationofficer.cnic}, function(err, doc) {
      if (err) throw err;
      if(doc && doc._id){
          if(verificationofficer.cnic == doc["cnic"] && doc["restriction"] == false && verificationofficer.id_number == doc["id_number"]){
              verificationofficer.hash = makehash([verificationofficer.cnic])
              // transac.property_verification_officer = verificationofficer.hash
              console.log(verificationofficer);
              res.render('./property',{
              action : "/propertyeval",
               type : "active",
                type1  : "hidden",
                required1 : "",masots4:"",masots5 : "",masots6:""});      
          }else{
        res.render('./form',{
          action : "/verificationofficer",
          heading : "Add Details of Property Verification Officer",
          type : "active",
          type1 : "hidden",
          required : "required",
          required1 : "",masots5 : "true",masots6:"This Verification Officer is Not Authorized"});
          }
      }else{
              res.render('./form',{
                action : "/verificationofficer",
                heading : "Add Details of Property Verification Officer",
                type : "active",
                type1 : "hidden",
                required : "required",
                required1 : "",masots5 : "true",masots6:"Cannot find Information to Verify This Verfication Officer"});
      }
         })
  })
 


  app.post('/propertyinfo',(req,res)=>{
    propertyinfo = new property_info()
    propertyinfo.type = req.body.type
    propertyinfo.size_in_sqyrd   = req.body.sqyrd
    propertyinfo.price  = req.body.price
    propertyinfo.sr_no= req.body.rg_no
    adress = req.body.hous_no
    let fadress = adress.concat(",").concat(req.body.proj_name).concat(",").concat(req.body.town).concat(",").concat(req.body.city)
    propertyinfo.address = fadress.toLowerCase()
    console.log("address is " ,propertyinfo.address);
    propertyinfo.property_tax = val(req.body.gst_amount,req.body.gst_date)
    propertyinfo.electricity_bill = val(req.body.elec_amount,req.body.gst_date)
    propertyinfo.gas_bill= val(req.body.gas_amount,req.body.gas_date)
    propertyinfo.water_bill = val(req.body.water_amount,req.body.water_date)
    // propertyinfo.prop_owner_cnic =  cniccheck
    // propertyinfo.hash = "0000000"
    console.log(propertyinfo);

  num = num - 1
  if(num > 0){
    propertyinfo.prop_owner_cnic = cniccheck
    propertyinfo.hash = makehash([propertyinfo.type,propertyinfo.sr_no])
    register.propertydetails.push(propertyinfo.hash)
          propertyinfo.prop_registrtaion = val(req.body.reg_amount,req.body.reg_date)
          property[k] = propertyinfo
          k = k+1
          // property.push(propertyinfo)
          res.render('./property',{
            action : "/propertyinfo",
            type1 : "active",
            type  : "hidden",
          required1 : "required",
          masots4 : "",masots5 : "",masots6:"" })
  }
  else if(num == 0){
   
    propertyinfo.prop_owner_cnic = cniccheck
    propertyinfo.hash = makehash([propertyinfo.type,propertyinfo.sr_no])
    register.propertydetails.push(propertyinfo.hash)
          propertyinfo.prop_registrtaion = val(req.body.reg_amount,req.body.reg_date)
          // property.push(propertyinfo)
          property[k] = propertyinfo
          console.log(property);
          popdata(property)
          if(Owner_data_cnic !== Owner.cnic){
            db.collection("Property_Owner").insertOne(Owner, function (err, result) {     
              if (err) {
                          console.log("error");
                        } else {
                          console.log("inserted data");
                          }});}
  prorhash = makehash(register.propertydetails)
  register.hash = makehash([Owner.hash,prorhash])
  let block2 = genesisblock.newblock([register])
  genesisblock.addBlock(block2)
  console.log(block2);
  db.collection("Transactions").insertOne(register, function (err, result) {     
    if (err) {
                console.log("error");
              } else {
                console.log("inserted data");
                }});
  console.log("Block is added");
  res.render('./property',{
    action : "/propertyinfo",
    type1 : "active",
    type  : "hidden",
  required1 : "required",
  masots4 : "true",masots5 : "",masots6:"Registration Successful!" })
  }
  })


  app.post('/propertyeval',(req,res)=>{
    propertyinfo = new property_info()
    propertyinfo.type = req.body.type
    propertyinfo.size_in_sqyrd   = req.body.sqyrd
    propertyinfo.price  = req.body.price
    propertyinfo.sr_no= req.body.rg_no
    adress = req.body.hous_no
    let fadress = adress.concat(",").concat(req.body.proj_name).concat(",").concat(req.body.town).concat(",").concat(req.body.city)
    propertyinfo.address = fadress.toLowerCase()
    console.log("address is " ,propertyinfo.address);
    propertyinfo.property_tax = val(req.body.gst_amount,req.body.gst_date)
    propertyinfo.electricity_bill = val(req.body.elec_amount,req.body.gst_date)
    propertyinfo.gas_bill= val(req.body.gas_amount,req.body.gas_date)
    propertyinfo.water_bill = val(req.body.water_amount,req.body.water_date)
    // propertyinfo.prop_owner_cnic =  cniccheck
    console.log(propertyinfo);
    var resultarray = []
    var cursor = db.collection("property").find({sr_no : propertyinfo.sr_no}).project({prop_owner_cnic: 1,restriction:1,prop_registrtaion:1,address:1,type:1})

  cursor.forEach(function(doc,err){
      if(err){
          console.log("Error");
      }
      else{ resultarray.push(doc)
      }
  },function() {
    console.log(resultarray);
    console.log("lengthof",resultarray.length);
    if(resultarray.length == 0){
      res.render('./property',{
        action : "/propertyeval",
         type : "active",
          type1  : "hidden",
          required1 : "",masots4:"",masots5 : "true",masots6:"Cannot Find Property Information"});  
    }
    else if(resultarray[0].prop_owner_cnic == cniccheck && resultarray[0].restriction == false){
    var nameParts = resultarray[0].address.split(",");
     let words = nameParts.map(v => v.toLowerCase());
     var num = words[0].replace(/\D/g,'')
     var num2 = adress.toLowerCase().replace(/\D/g,'')
     console.log(num2);
     console.log(num);
     if(num == num2 && resultarray[0].type == propertyinfo.type ){
        propertyinfo.prop_owner_cnic = buyer.cnic
        propertyinfo.previous_property_owners.push(seller.cnic)
        propertyinfo.prop_registrtaion = resultarray[0].prop_registrtaion
        // propertyinfo.hash = makehash([propertyinfo.type,propertyinfo.address,propertyinfo.sr_no])
        propertyinfo.hash = makehash([propertyinfo.type,propertyinfo.sr_no])
        // transac.propertyinfo = propertyinfo.hash
        console.log(propertyinfo);
        res.render('./property',{
          action : "/propertyeval",
          type1 : "active",
          type  : "hidden",
        required1 : "required",
        masots4 : "fales",masots5 : "",masots6:"" })
     }
     else {
      res.render('./property',{
        action : "/propertyeval",
         type : "active",
          type1  : "hidden",
          required1 : "",masots4:"",masots5 : "true",masots6:"The Address/Property Type Does Not Match"});
    }
      }
      else {
        res.render('./property',{
          action : "/propertyeval",
           type : "active",
            type1  : "hidden",
            required1 : "",masots4:"",masots5 : "true",masots6:"The CNIC Number of Property Owner is Differernt from CNIC Number of Seller"});
      
      }
      })
  })


  app.get('/mine',(req,res)=>{
    let transac = new transs(seller.hash,buyer.hash,verificationofficer.hash,notary.hash,propertyinfo.hash)
    transac.hash = makehash([transac.seller,transac.buyer,transac.notary_public_officer,transac.property_verification_officer,transac.propertyinfo])
    if(buyer_data_cnic !== buyer.cnic){
    db.collection("Property_Owner").insertOne(buyer, function (err, result) {     
      if (err) {
                  console.log("error");
                } else {
                  console.log("inserted data");
                  }});}
      else{
        db.collection("Property_Owner").updateOne({cnic : buyer.cnic}, {$set: {hash : buyer.hash}}, function (err, result) {     
        if (err) {
                    console.log("error");
                  } else {
                    console.log("updated data");
                    }});}
      if(notary_data_cnic !== notary.cnic){
        db.collection("real_state-agents").insertOne(notary, function (err, result) {     
          if (err) {
                      console.log("error");
                    } else {
                      console.log("inserted data");
                      }});}
    db.collection("property").updateOne({sr_no : propertyinfo.sr_no}, {$set: {price : propertyinfo.price, hash : propertyinfo.hash, prop_owner_cnic:buyer.cnic, property_tax : propertyinfo.property_tax,
  electricity_bill: propertyinfo.electricity_bill, gas_bill : propertyinfo.gas_bill,water_bill : propertyinfo.water_bill},$push:{previous_property_owners : seller.cnic}}, function (err, result) {     
      if (err) {
                  console.log("error");
                } else {
                  console.log("updated data");
                  }});
    db.collection("Property_Owner").updateOne({cnic : seller.cnic}, {$set: {hash : seller.hash}}, function (err, result) {     
          if (err) {
                      console.log("error");
                    } else {
                      console.log("updated data");
                      }});
    db.collection("Transactions").insertOne(transac, function (err, result) {     
      if (err) {
                  console.log("error");
                } else {
                  console.log("inserted data");
                  }});
    block1 = genesisblock.newblock([transac])
    genesisblock.addBlock(block1)
    console.log(transac);
    console.log("you have entered all data");
    res.render('./property',{
      action : "/propertyeval",
       type : "active",
        type1  : "hidden",
        required1 : "",masots4:"true",masots5 : "",masots6:"Transfer Successful!"});
    })

 
    app.get('/ownerinfoform',(req,res)=>{
    res.render('./form',{
      action : "/ownerdata",
      heading : "Add Details of Property Owner",
    type1 : "active",
    type  : "hidden",
  required1 : "required",
  required : "", masots5 : "", masots6 : ""})
    })
  
  
    app.get('/transaction',(req,res)=>{
    res.render('./transaction',{
      action : "/transaction",
      seller : "",
      seller_n : "",
      buyer_n : "",
      reagent_n : "",
      officer_n : "",
      prop_ad : "",
      buyer : "",
      reagent : "",
      govt : "",
      property : "",
      disp : "display: none",
      disp1 : "display: none",
      masots2 :"",
      masots3 : "",
      masots4 : "" 
  })
    })


    app.get('/cnictrack',(req,res)=>{
      res.render('./nictrack',{
        action : "/cnictrack",
        masots : "",
        masots1 : "",
        disp : "display: none",
        masots4 :"" 
    })
      })



  
app.post('/cnictrack',(req,res)=>{
        let fndcnic = req.body.cnic
        let nichash =  makehash([fndcnic])
        console.log(nichash);
        let val_3 = find_reg_data(genesisblock.blocks,nichash)
        let val_4 = find_buyernseller_data(genesisblock.blocks,nichash,"seller")
        let val_5 = find_buyernseller_data(genesisblock.blocks,nichash,"buyer")
        if(val_3.length == 0 && val_5.length == 0 && val_4.length == 0){
          res.render('./nictrack',{
            action : "#",
           masots : "",
           masots1 : "",
            disp : "display: none",
            masots4 : "true" 
        })
          console.log("Data Not Found");
        }
        else{
        var array3 = val_3.filter(function(obj) { return val_4.indexOf(obj) == -1; });
        var array4 = array3.concat(val_5)
Promise.all([myPromise2("property",array4,property_address), myPromise2("property",val_4,property_address_1)])
.then((values) => {
  // let prop_address = chek_for_arr(property_address,"address")
  // let prop_srno = chek_for_arr(property_address,"sr_no")
  // let prop_type = chek_for_arr(property_address,"type")

  console.log(values);
  res.render('./nictrack',{
    action : "#",
   masots : property_address,
   masots1 : property_address_1,
    disp : "display: block",
    masots4 : "false" 
})
property_address = []
property_address_1 = []
});
          console.log("Data found");
          console.log(val_3);
        }
        var children = val_3.concat(val_4).concat(val_5)
        console.log(children);
         var uniq = [...new Set(children)]
         console.log("Total Properties found of user",uniq);
        console.log(array3);
        console.log("Current properties owned by user",array4);
        
        console.log("Previous properties owned by user",val_4);
        })


    app.post('/transaction',(req,res)=>{
      let tran = req.body.transs
      let resulttran = []
      let buyer_name = [];
      let agent_name = [];
      let officer_name= [];
      let Owner_name =[]
      let prop_details = []
      const find_trans_data = () => {
      for(let i = genesisblock.blocks.length - 1; i >= 1; i--){
        if(genesisblock.blocks[i].transactions[0].hash === tran)
          { return (genesisblock.blocks[i].transactions) }
      }
    }

    function chek_for(isMember,val) {
      return ((isMember[0] == "Property Not Found") ? "Not Found" : isMember[0][val])
    }
    var trans_dtaa = find_trans_data()
    if(trans_dtaa == undefined){
      res.render('./transaction',{
        action : "/transaction",
        seller : "",
        seller_n : "",
        buyer_n : "",
        reagent_n : "",
        officer_n : "",
        prop_ad : "",
        buyer : "",
        reagent : "",
        govt : "",
        property : "",
        disp : "display: none",
        disp1 : "display: none",
        masots2 :"",
        masots3 : "",
        masots4 : "true" 
    })
    }
    else{
      if(trans_dtaa[0].transclass === "Registration"){
        for (const element of trans_dtaa[0].propertydetails) {
          resulttran.push(element)
          console.log(element);
        }
        console.log("result",resulttran);
        console.log("transta",trans_dtaa[0].owner);
        Promise.all([myPromise2("Property_Owner",[trans_dtaa[0].owner],Owner_name), myPromise2("property",resulttran,prop_details)])
.then((values) => {
console.log("values",values);
  let owner_nam = chek_for(Owner_name,"name")
  let prop_addd = chek_for_arr(prop_details,"address")
  console.log("prop_addD",prop_addd);
  res.render('./transaction',{
            action : "#",
            seller : trans_dtaa[0].owner,
            seller_n : owner_nam,
            buyer : "",
            buyer_n : "",
            reagent : "",
            reagent_n : "",
            govt : "",
            officer_n : "",
            property : "",
            prop_ad : "",
            disp1 : "display: block",
            disp : "display: none",
            masots2 : resulttran,
            masots3 :prop_addd,
            masots4 : "" 
        })
  console.log("then valu",values);
  console.log("Owner" ,Owner_name[0].name);
  console.log("property",prop_details);
});
      }
      else if(trans_dtaa[0].transclass === "Transfer"){
        Promise.all([myPromise2("Property_Owner",[trans_dtaa[0].seller],Owner_name), myPromise2("Property_Owner",[trans_dtaa[0].buyer],buyer_name),
        myPromise2("real_state-agents",[trans_dtaa[0].notary_public_officer],agent_name),myPromise2("property_verification_officer",[trans_dtaa[0].property_verification_officer],officer_name),
        myPromise2("property",[trans_dtaa[0].propertyinfo],prop_details)])
        .catch((err) => console.log("error"))
        .then((values) => {
          console.log(values);
let seller_nam = chek_for(Owner_name,"name")
let buyer_nam = chek_for(buyer_name,"name")
let agent_nam = chek_for(agent_name,"name")
let govt_name = chek_for(officer_name,"name")
let prop_add = chek_for(prop_details,"address")
          res.render('./transaction',{
                    action : "#",
                    seller : trans_dtaa[0].seller,
                    seller_n : seller_nam,
                    buyer : trans_dtaa[0].buyer,
                    buyer_n : buyer_nam,
                    reagent : trans_dtaa[0].notary_public_officer,
                    reagent_n : agent_nam,
                    govt : trans_dtaa[0].property_verification_officer,
                    officer_n : govt_name,
                    property : trans_dtaa[0].propertyinfo,
                    prop_ad : prop_add,
                    disp : "display: block",
                    disp1 : "display: none",
                    masots2 : "",
                    masots3 : "",
                    masots4 : "" 
                })
      })
    }
    }
    console.log(trans_dtaa); 
    })

  app.get('/block',(req,res)=>{
    let check = () =>{
          if(genesisblock.blocks.length <= 1 ){
             return true
          }else{return false}}
      if (check() == true){
        res.render('./index',{
        masots5 :"true"
          });
    }
    else if(check() == false) {
      console.log(block1);
      res.render('./block',{
        mascots  : genesisblock.blocks[genesisblock.blocks.length-1].timestamp,
        index : genesisblock.blocks[genesisblock.blocks.length-1].index,
        previoushash : genesisblock.blocks[genesisblock.blocks.length-1].previoushash,
        hash : genesisblock.blocks[genesisblock.blocks.length-1].hash,
        nonce : genesisblock.blocks[genesisblock.blocks.length-1].nonce,
        transaction : genesisblock.blocks[genesisblock.blocks.length-1].transactions[0].hash,
        transactiontype : genesisblock.blocks[genesisblock.blocks.length-1].transactions[0].transclass})
    console.log("you have entered all data");
    }
      })

  app.get('/blockchain',(req,res)=>{
    console.log(genesisblock);
    res.render('./blockchain',{
      mascots  : genesisblock.blocks})
        })

app.listen(port);
console.log('3000 is the magic port');


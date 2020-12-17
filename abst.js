class dter {  
    constructor(name,clas,adress,ph_num){  
       this.name = name
       this.class = clas
       this.adress = adress
       this.ph_num = ph_num
    }
    stdinfo(){
        console.log("Student Name is :",this.name);
        console.log("Clas of Student is :",this.class);
    }
} 
console.log(`Program Without Abstratcion
==========================`);
var a = new dter("Moiz Ali",6,"House No ABC, Street No 2 , Karachi","0300-1234765")
console.log("Client Should only Get Name and Class and Not adress and Phone Number\n");
console.log("Calling Student information from Class : ");
a.stdinfo()
console.log(`Calling Address and phone Number From Class : 
Address os Student : ${a.adress}
Phone Number of Student : ${a.ph_num}`)

class dter1 {  
    constructor(name,clas,adress,ph_num){  
        this.name = name
        this.class = clas
        let _adress = adress
        let _ph_num = ph_num
        this.getadress = () => _adress;
        this.getph_num= () => _ph_num;    
     }
     stdinfo(){
        console.log("Student Name is :",this.name);
        console.log("Clas of Student is :",this.class);
    }
} 

console.log(`\nProgram With Abstraction
==========================`);
var b = new dter1("Moiz Ali",6,"House No ABC, Street No 2 , Karachi","0300-1234765")
console.log("Client Should only Get Name and Class and Not adress and Phone Number\n");
console.log("Calling Student information from Class : ");
b.stdinfo()
console.log(`Calling Address and phone Number From Class : 
Address of Student : ${b.adress}
Phone Number of Student : ${b.ph_num}`)


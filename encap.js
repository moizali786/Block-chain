class Coter {  
    constructor(){  
       this.name = "Moiz"  
    }
    get _name(){return this.name}  
} 

console.log(`Program Without Encapsulation
==========================`);
var a = new Coter()
console.log("Calling original Value from Class : ",a._name);
console.log("Value Changed Easily");
a.name ="Ali"
console.log("Calling Changed Value from Class : ",a._name);

class Coter1 {  
    constructor(){  
        let name = "Moiz"  
        this.getname = () => name;  
    }
    get _name(){return  this.getname()}  
} 

console.log(`\nProgram With Encapsulation
==========================`);
var b = new Coter1()
console.log("Calling original Value from Class : ",b._name);
console.log("Value is Not Changed");
b.name = "Ali"
console.log("Calling Changed Value from Class : ",b._name);;



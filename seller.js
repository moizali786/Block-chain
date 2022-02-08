class data{
    constructor(name,address,ph_no,email,cnic_no,hassh){
        this.name = name,
        this.address = address,
        this.email = email,
        this.ph_no = ph_no,
        this.cnic = cnic_no
        this.hash = hassh
        this.restriction = false
    }
}

module.exports = data
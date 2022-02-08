class verify{
    constructor(name,address,ph_no,email,cnic_no,designation,organization,id_number,hassh){
        this.name = name,
        this.address = address,
        this.email = email,
        this.ph_no = ph_no,
        this.cnic = cnic_no,
        this.designation = designation,
        this.organization = organization,
        this.id_number = id_number
        this.hash = hassh
        this.restriction = false
    }
}

module.exports = verify
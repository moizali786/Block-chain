class property_info{
    constructor(type,address,sqyrds,registration_number,price,property_tax,elec_bills,gas_bill,water_bill,hassh,popcnic,prop_reg){
        this.type= type,
        this.address = address,
        this.size_in_sqyrd = sqyrds,
        this.sr_no = registration_number,
        this.price = price,
        this.property_tax = property_tax,
        this.electricity_bill = elec_bills
        this.gas_bill = gas_bill
        this.water_bill = water_bill
        this.prop_registrtaion = prop_reg
        this.hash = hassh
        this.prop_owner_cnic = popcnic
        this.previous_property_owners = []
        this.restriction = false
    }

}

module.exports = property_info
class transaction{
    constructor(seller,buyer,property_verification_officer,notary_public_officer,propertyinfo,hash){
        this.seller = seller,
        this.buyer = buyer,
        this.propertyinfo = propertyinfo,
        this.notary_public_officer = notary_public_officer,
        this.property_verification_officer = property_verification_officer,
        this.hash = hash,
        this.transclass = "Transfer"

    }
 }

module.exports = transaction
class transaction{
    constructor(seller,seller_properties,buyer,property_verification_officer,notary_public_officer,propertyinfo,hash){
        this.seller = seller,
        this.seller_property = seller_properties
        this.buyer = buyer,
        this.buyer_property = [],
        this.propertyinfo = propertyinfo,
        this.notary_public_officer = notary_public_officer,
        this.property_verification_officer = property_verification_officer,
        this.hash = hash,
        this.transclass = "Transfer"

    }
 }

module.exports = transaction
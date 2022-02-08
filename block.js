class Block{
    constructor(){
        this.timestamp = Date.now();
        this.index = 0,
        this.previoushash = "",
        this.hash = "",
        this.nonce= 0,
        this.transactions = []
    }

    get key(){
        return JSON.stringify(this.transactions)+this.index+this.previoushash+this.nonce+this.timestamp
    }
    addtransactions(transaction){
        this.transactions.push(transaction)
    }

}
    


module.exports = Block

let sha256 = require('js-sha256') 
let blck = require('./block')

class blockchain{
    constructor(genesisblock){
        this.blocks = []
        this.addBlock(genesisblock)
    }

  addBlock(block){
      if(this.blocks.length == 0){
        block.previoushash = "0000000000000000"
        block.hash = this.generateHash(block)
      }
this.blocks.push(block)
  } 
  
generateHash(block) {
    let hash = sha256(block.key)
    return hash
    }
newblock(transactions){
        let block = new blck() 
        transactions.forEach(function(transaction){
        block.addtransactions(transaction)
})
let previousBlock = this.getPreviousBlock()
block.index = this.blocks.length
block.previoushash = previousBlock.hash
block.hash = this.generateHash(block)

return block
}
getPreviousBlock() {
    return this.blocks[this.blocks.length - 1]
    }
generateHash(block) {
        let hash = sha256(block.key)
        while(!hash.startsWith("000")) {
        block.nonce += 1
        hash = sha256(block.key)
        console.log(hash)
        }
        return hash
        }

}

module.exports = blockchain

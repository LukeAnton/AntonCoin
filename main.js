const SHA256 = require('crypto-js/sha256');

class block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

calculateHash() {
  return SHA256(this.index +
     this.previousHash +
     this.timestamp +
     JSON.stringify(this.data) + this.nonce).toString();
   }

mineBlock(difficulty) {
  while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
    this.nonce++;
    this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}



class blockchain {
  constructor(){
    this.chain = [this.createGenisisBlock()];
    this.difficulty = 4;
  }

  createGenisisBlock(){
    return new block(0, "07/03/2019", "Genisis block", "0");

  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}

let antonCoin = new blockchain();

console.log('Mining block 1...');
antonCoin.addBlock(new block(1, "17/03/2019", { amount: 4}));

console.log('Mining block 2...');
antonCoin.addBlock(new block(2, "18/03/2019", { amount: 10}));


/*
console.log(JSON.stringify(antonCoin, null, 4));

console.log('Is blockchain valid? ' + antonCoin.isChainValid());

antonCoin.chain[1].data = {amount: 100};
antonCoin.chain[1].hash = antonCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + antonCoin.isChainValid());

console.log(JSON.stringify(antonCoin, null, 4));

*/

const SHA256 = require("crypto-js/sha256");

 class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

 class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

     calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

     mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

         console.log("BLOCK MINED: " + this.hash);
    }
}


 class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

     createGenesisBlock() {
        return new Block("01/01/2017", "Genesis block", "0");
    }

     getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

     minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

         console.log('Block successfully mined!');
        this.chain.push(block);

         this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

     createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

     getBalanceOfAddress(address){
        let balance = 0;

         for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                 if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

         return balance;
    }

     isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

             if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

             if (currentBlock.previousHash !== previousBlock.hash) {
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

const SHA256 = require('crypto-js/sha256');

class Block {
   constructor(index, timestamp, data, name, cost, previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.name = name;
       this.cost = cost;
       this.previousHash = previousHash;
       this.hash = this.calculateHash();
   }
   calculateHash(){
       return SHA256(this.index +  this.previousHash + this.timestamp + this.data + this.name + this.cost + JSON.stringify(this.data)).toString();
   }
}

class Blockchain {
   constructor(){
       this.chain = [this.createGenesisBlock()];
   }
  createGenesisBlock(){
      return new Block(0, "01/01/2017", "Genesis Block", "First", "$10.00", "0");
  }
   getLatestBlock(){
   return this.chain[this.chain.length - 1];
   }
   addBlock(newBlock){
       newBlock.previousHash = this.getLatestBlock().hash;
       newBlock.hash = newBlock.calculateHash();
       this.chain.push(newBlock);
   }
   find(name) {

   	// loop through this.chain

   	for(var i = 1; i < this.chain.length; i++) {
   		if (this.chain[i].name == name) {
   			return this.chain[i].cost;
   		}
   	}
   }
}

let pastelitoCoin = new Blockchain();
pastelitoCoin.addBlock(new Block(1, "6:58", "Dylan", "Primero", 3.00));
pastelitoCoin.addBlock(new Block(2, "6:59", "Roberto", "Segundo", 2.00));
pastelitoCoin.addBlock(new Block(3, "7:02", "Ibis", "Tercero", 1.50));
pastelitoCoin.addBlock(new Block(4, "7:05", "Maurice", "Quarto", 1.00));
pastelitoCoin.addBlock(new Block(5, "8:15", "Salvi", "Quinto", 1.90));

console.log(JSON.stringify(pastelitoCoin, null,4));


var pastelitoType = "Carne";

console.log(pastelitoCoin.find(pastelitoType));

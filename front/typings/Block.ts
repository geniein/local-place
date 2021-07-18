
export interface Block {

    index: number;
    hash: string;
    previousHash: string;
    timestamp: number;
    data?: Transaction[];
    difficulty?: number;
    nonce?: number;

    // constructor(index: number, hash: string, previousHash: string,
    //             timestamp: number, data: Transaction[], difficulty: number, nonce: number) {
    //     this.index = index;
    //     this.previousHash = previousHash;
    //     this.timestamp = timestamp;
    //     this.data = data;
    //     this.hash = hash;
    //     this.difficulty = difficulty;
    //     this.nonce = nonce;
    // }
}

interface Transaction {

    id: string;

    txIns: TxIn[];
    txOuts: TxOut[];
}

interface TxIn {
    txOutId: string;
    txOutIndex: number;
    signature: string;
}

interface TxOut {
    address: string;
    amount: number;

    // constructor(address: string, amount: number) {
    //     this.address = address;
    //     this.amount = amount;
    // }
}
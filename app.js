const TronWeb = require("tronweb");
require('dotenv').config();

const fullNode = "https://api.shasta.trongrid.io";
const solidityNode = "https://api.shasta.trongrid.io";
const eventServer = "https://api.shasta.trongrid.io";
const fromAddress = "TV8GjTwz6i2QiA7rQqGoeih6vWcbhofBDd";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, process.env.PRIVATE_KEY);

// Replace with your TRC20 USDT contract address
// const usdtContractAddress = 'TRC20_USDT_CONTRACT_ADDRESS';

// Create a wallet
async function createWallet() {
  const account = await tronWeb.createAccount();
  return account;
}

// Get wallet balance
async function getBalance(address) {
  const balance = await tronWeb.trx.getBalance(address);
  return balance;
}

async function sendTrx(toAddress) {
  console.log("31");

  // let receipt = await tronWeb.trx.sendTransaction(toAddress, 100, privateKey)

  const tradeobj = await tronWeb.transactionBuilder.sendTrx(
    tronWeb.address.toHex(toAddress),
    2 * 1000 * 1000,
    tronWeb.address.toHex(fromAddress)
  );
  console.log("37");
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

  return receipt;
}

// Receive USDT (called when a user sends USDT to the wallet address)
// async function receiveUSDT(amount, senderAddress) {
//     const contract = await tronWeb.contract().at(usdtContractAddress);

//     // The contract's "transfer" function
//     const transferFunction = 'transfer(address,uint256)';

//     // Convert the amount to the contract's format (multiply by 10^6 for 6 decimals)
//     const amountInContractFormat = amount * 1e6;

//     try {
//         // Transfer USDT to the wallet address
//         await contract[transferFunction](tronWeb.address.toHex(senderAddress), amountInContractFormat).send();
//         return true;
//     } catch (error) {
//         console.error('Error receiving USDT:', error);
//         return false;
//     }
// }

// Send USDT to a given address
// async function sendUSDT(amount, receiverAddress) {
//     const contract = await tronWeb.contract().at(usdtContractAddress);

//     // The contract's "transfer" function
//     const transferFunction = 'transfer(address,uint256)';

//     // Convert the amount to the contract's format (multiply by 10^6 for 6 decimals)
//     const amountInContractFormat = amount * 1e6;

//     try {
//         // Transfer USDT to the receiver address
//         await contract[transferFunction](tronWeb.address.toHex(receiverAddress), amountInContractFormat).send();
//         return true;
//     } catch (error) {
//         console.error('Error sending USDT:', error);
//         return false;
//     }
// }

// Example usage:
async function main() {
  const wallet = await createWallet();
  console.log("New Wallet Address:", wallet.address);
  console.log("Address:", wallet.address.base58);
  console.log("Private Key:", wallet.privateKey);

  // let receipt = await sendTrx(wallet.address.base58);
  // console.log('receipt', receipt);

  // const balance = await getBalance(wallet.address.base58);
  // console.log('Wallet Balance:', balance);

  //   // Simulate receiving 100 USDT from another wallet (replace senderAddress with the sender's address)
  //   await receiveUSDT(100, 'SENDER_ADDRESS');

  //   // Simulate sending 50 USDT to another wallet (replace receiverAddress with the receiver's address)
  //   await sendUSDT(50, 'RECEIVER_ADDRESS');
}

main();

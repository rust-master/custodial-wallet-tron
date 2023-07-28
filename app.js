const TronWeb = require("tronweb");
require("dotenv").config();

// Testnet: https://api.shasta.trongrid.io
// Mainnet: https://api.trongrid.io

const fullNode = "https://api.trongrid.io";
const solidityNode = "https://api.trongrid.io";
const eventServer = "https://api.trongrid.io";
const fromAddress = "https://api.trongrid.io";

const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

async function setupTron(privateKey) {
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  return tronWeb;
}

// Create a wallet
async function createWallet() {
  let tronWeb = await setupTron(process.env.PRIVATE_KEY);
  const account = await tronWeb.createAccount();
  return account;
}

// Get wallet balance
async function getBalance(address) {
  let tronWeb = await setupTron(process.env.PRIVATE_KEY);
  const { abi } = await tronWeb.trx.getContract(CONTRACT);
  const contract = tronWeb.contract(abi.entrys, CONTRACT);

  const balance = await contract.methods.balanceOf(address).call();
  let bln = balance / 1000000;

  return bln;
}

async function withdraw(address, amount) {
  try {
    let tronWeb = await setupTron(process.env.PI_KEY);

    const { abi } = await tronWeb.trx.getContract(CONTRACT);
    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const resp = await contract.methods.transfer('TV8GjTwz6i2QiA7rQqGoeih6vWcbhofBDd', 3).send();

    return resp;
  } catch (error) {
    console.error("Error during withdraw:", error);
    throw error; // Rethrow the error to be caught by the caller (if any).
  }
}


// async function sendTrx(toAddress) {
//   const tradeobj = await tronWeb.transactionBuilder.sendTrx(
//     tronWeb.address.toHex(toAddress),
//     2 * 1000 * 1000,
//     tronWeb.address.toHex(fromAddress)
//   );

//   const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
//   const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

//   return receipt;
// }

// Example usage:
async function main() {
  // const wallet = await createWallet();
  // console.log("New Wallet Address:", wallet.address);
  // console.log("Address:", wallet.address.base58);
  // console.log("Private Key:", wallet.privateKey);

  // let receipt = await sendTrx(wallet.address.base58);
  // console.log('receipt', receipt);

  const balance = await getBalance("TFKbJHrhpX37ciT8vpL5TPV8inVKg8jtV9");
  console.log("Wallet Balance:", balance);

  // let resp = await withdraw("TV8GjTwz6i2QiA7rQqGoeih6vWcbhofBDd", 8);
  // console.log("transfer:", resp);

  withdraw('TV8GjTwz6i2QiA7rQqGoeih6vWcbhofBDd', 3)
  .then(resp => {
    console.log("Withdraw response:", resp);
  })
  .catch(error => {
    console.error("Withdraw failed:", error);
  });

  const balancei = await getBalance("TV8GjTwz6i2QiA7rQqGoeih6vWcbhofBDd");
  console.log("Wallet Balance:", balancei);
}

// TFKbJHrhpX37ciT8vpL5TPV8inVKg8jtV9

main();

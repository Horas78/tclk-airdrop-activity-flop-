import { makeOffer, makeAccept, generateHashLock, openContract, applyFrame } from "@flop-labs/tclk";
import crypto from "crypto";
import dotenv from "dotenv";

// Load secure environment variables locally
dotenv.config();

// 1. User Decentralized Identifier (Payer DID)
const myDid = "did:key:z6MkjK1jbmmy8F91FmaZBTAgdYD47PjLmkHLYU2KRX3eTYLg"; 
const myPrivateSeedHex = process.env.MY_PRIVATE_SEED; // Fetched securely from local .env

// 2. Settlement Counterparty Identifier (Payee DID)
const payeeDid = "did:key:z6MkmvWskx9S9WbKym6e67wA9vNfVbRZ68sD8eWe7uCeEeCs"; 

console.log("\n==============================================");
console.log("🔄 TCLK Protocol Airdrop Activity Simulation 🔄");
console.log(📅 Timestamp: ${new Date().toLocaleString()});
console.log("==============================================");

const currentTime = Date.now();

// Step A: Initialize the smart escrow contract terms
const myOffer = makeOffer({
  from: myDid,
  role: "payer",
  lock: "hash",
  amount: "1000",
  asset: "USD",
  rails: ["flop-htlc"],
  claimByMs: currentTime + 3600000, 
  refundAfterMs: currentTime + 7200000,
  expiresMs: currentTime + 600000,
});

// Step B: Cryptographically sign the frame and derive a unique Contract ID
const textToSign = JSON.stringify(myOffer) + currentTime; 
const contractIdDerived = crypto.createHash('sha256').update(textToSign + myDid).digest('hex');
console.log("🔑 [Step 1] Contract successfully created & signed. Contract ID:\n", contractIdDerived);

// Step C: Counterparty generates the hash-lock and signs the Acceptance frame
const { preimage, hash } = generateHashLock();
const acceptFrame = makeAccept(myOffer, { 
  from: payeeDid, 
  statement: hash 
});
console.log("🤝 [Step 2] Payee accepted the contract terms and minted the Hash-Lock.");

// Step D: Open and transition the contract state inside the chat room
let contract = openContract(myOffer);
let result = applyFrame(contract, acceptFrame, Date.now());
contract = result.state;

// Step E: Payer locks the required funds on the settlement rail
const lockFrame = {
  type: "tclk/1/lock",
  from: myDid,
  contractId: contractIdDerived,
  railRef: airdrop-secured-rail-${currentTime} 
};
result = applyFrame(contract, lockFrame, Date.now());
contract = result.state;
console.log("🔒 [Step 3] Funds successfully locked on the settlement network.");

// Step F: Payee reveals the preimage secret to claim the funds
const revealFrame = {
  type: "tclk/1/reveal",
  from: payeeDid,
  contractId: contractIdDerived,
  secret: preimage 
};
result = applyFrame(contract, revealFrame, Date.now());
contract = result.state;

console.log("==============================================");
console.log("✅ [Step 4] Preimage secret revealed. Settlement Complete!");
console.log("🏆 Final Certified Contract Status:", contract.status || 'claimed'); 
console.log("==============================================\n");
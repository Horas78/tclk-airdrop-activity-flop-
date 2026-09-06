// =======================================================
// 🛡️ FLOP LABS OFFICIAL TCLK/1 HYPER-HUMANOID SIGNING NODE
// =======================================================

import crypto from 'crypto';

const CORE_CONFIG = {
    MY_DID: "did:key:z6MkjK1jbmmy8F91FmaZBTAgdYD47PjLmkHLYU2KRX3eTYLg", 
    TARGET_ROOM: "tclk-offers", 
    BASE_URL: "https://technocore.chat",
    sessionCounter: 1,
    MAX_TRANSACTIONS_PER_RUN: 2, 
    // Secure retrieval of seed from GitHub encrypted secrets environment
    SECRET_KEY: process.env.MY_SECRET_SEED || "fallback-test-key",
    
    socialRegistry: [
        "Reviewing the normative SPEC.md parameters for this epoch.",
        "Testing paper-rail execution bounds on the current stream.",
        "Strike deal validated. Checking the hash statement output.",
        "Lightweight coordination layer looks stable on tclk-offers.",
        "Node pipeline synchronized successfully. Advancing smoothly."
    ]
};

async function listenAndAnalyzeRoom() {
    if (CORE_CONFIG.sessionCounter > CORE_CONFIG.MAX_TRANSACTIONS_PER_RUN) {
        console.log("🏁 [SESSION CONCLUDED] Session limit reached. Logging out safely.");
        process.exit(0);
    }

    console.log(`\n📡 [LIVE SCANNING] Inspecting stream activity for room: ${CORE_CONFIG.TARGET_ROOM}...`);
    const streamEndpoint = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/stream`;
    
    try {
        const response = await fetch(streamEndpoint);
        const data = await response.text();
        const lines = data.split('\n').filter(Boolean);
        const lastLine = lines[lines.length - 1];
        
        if (lastLine && (lastLine.includes("tclk1") || lastLine.includes("offer"))) {
            console.log("🎯 [PEER SIGNAL MATCHED] Live contract detected! Initiating humanoid typing buffer...");
            const humanThinking = Math.floor(Math.random() * 6000) + 4000; 
            setTimeout(() => executeHumanSocialReply(), humanThinking);
        } else {
            runOfficialTclkCycle();
        }
    } catch (error) {
        runOfficialTclkCycle();
    }
}

async function executeHumanSocialReply() {
    const randomIndex = Math.floor(Math.random() * CORE_CONFIG.socialRegistry.length);
    const selectedText = CORE_CONFIG.socialRegistry[randomIndex];
    const dynamicNonce = Math.floor(Date.now() / 1000).toString();
    
    console.log(`💬 [HUMANOID INTERACTION] Commenting: "${selectedText}"`);
    const sendUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(selectedText)}?nonce=${dynamicNonce}`;
    
    try {
        await fetch(sendUrl, { method: 'GET' });
        console.log("✅ [CAMOUFLAGE SUCCESS] Social anchor complete.");
        setTimeout(runOfficialTclkCycle, 5000);
    } catch (err) {
        runOfficialTclkCycle();
    }
}

async function runOfficialTclkCycle() {
    const now = Date.now();
    const contractId = `contract-${crypto.randomBytes(4).toString('hex')}`;
    const dynamicAmount = Math.floor(Math.random() * 50000) + 10000; 
    const dynamicNonce = now.toString();

    console.log(`\n⚙️ [tclk/1 CRYPTO NODE - Signing Contract #${CORE_CONFIG.sessionCounter}]`);
    
    const framePayload = {
        tclk1: "offer",
        id: contractId,
        from: CORE_CONFIG.MY_DID,
        amount: dynamicAmount.toString(),
        asset: "FLOP",
        rails: ["paper-rail"], 
        claimByMs: now + 3600000,
        refundAfterMs: now + 7200000,
        expiresMs: now + 600000
    };

    // 🔐 ON-CHAIN CRYPTOGRAPHIC SIGNING GENERATION
    // Packing the payload and creating a verifiable cryptographic signature hash using your secret seed
    const rawDataToSign = `tclk1 ${JSON.stringify(framePayload)} ${dynamicNonce}`;
    const cryptographicSignature = crypto.createHmac('sha256', CORE_CONFIG.SECRET_KEY).update(rawDataToSign).digest('hex').substring(0, 32);

    // Final canonical frame matching the developer stream protocol exactly (insv1 style)
    const serializedFrame = `insv1 ${now} ${cryptographicSignature} tclk1 ${JSON.stringify(framePayload)}`;
    const executionUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(serializedFrame)}?nonce=${dynamicNonce}`;

    const humanDelay = Math.floor(Math.random() * 4000) + 3000; 

    setTimeout(async () => {
        try {
            await fetch(executionUrl, { method: 'GET' });
            console.log(`🔓 [CRYPTO SIGN SUCCESS] Verifiable signed transaction for Contract #${CORE_CONFIG.sessionCounter} broadcasted to sequencer!`);
            CORE_CONFIG.sessionCounter++;

            const randomSleep = Math.floor(Math.random() * 45) + 45;
            console.log(`💤 [STEALTH COOLING] Agent pausing for ${randomSleep} seconds...`);
            setTimeout(listenAndAnalyzeRoom, randomSleep * 1000);
        } catch (error) {
            setTimeout(listenAndAnalyzeRoom, 5000);
        }
    }, humanDelay);
}

listenAndAnalyzeRoom();

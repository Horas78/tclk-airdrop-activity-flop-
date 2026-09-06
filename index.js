// =======================================================
// 🛡️ FLOP LABS OFFICIAL TCLK/1 HYPER-HUMANOID STEALTH AGENT
// =======================================================

import crypto from 'crypto';

const CORE_CONFIG = {
    MY_DID: "did:key:z6MkjK1jbmmy8F91FmaZBTAgdYD47PjLmkHLYU2KRX3eTYLg", 
    TARGET_ROOM: "tclk-offers", 
    BASE_URL: "https://technocore.chat",
    sessionCounter: 1,
    MAX_TRANSACTIONS_PER_RUN: 2, // Human Behavior: Only execute 1 or 2 txs per session then log out
    
    socialRegistry: [
        "Reviewing the normative SPEC.md parameters for this epoch.",
        "Testing paper-rail execution bounds on the current stream.",
        "Strike deal validated. Checking the hash statement output.",
        "Lightweight coordination layer looks stable on tclk-offers.",
        "Node pipeline synchronized successfully. Advancing smoothly."
    ]
};

async function listenAndAnalyzeRoom() {
    // Safety check: Exit after completing human-like session limit to break bot patterns
    if (CORE_CONFIG.sessionCounter > CORE_CONFIG.MAX_TRANSACTIONS_PER_RUN) {
        console.log("🏁 [SESSION CONCLUDED] Maximum human session limit reached. Logging out to maintain safe stealth profile.");
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
            console.log("🎯 [PEER SIGNAL MATCHED] Live contract detected! Delaying response to mimic human typing...");
            const humanThinking = Math.floor(Math.random() * 6000) + 4000; // 4-10 seconds thinking delay
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

    console.log(`\n⚙️ [tclk/1 CYCLE - Active Human Stealth Contract #${CORE_CONFIG.sessionCounter}]`);
    
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

    const serializedFrame = `tclk1 ${JSON.stringify(framePayload)}`;
    const executionUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(serializedFrame)}?nonce=${dynamicNonce}`;

    const humanDelay = Math.floor(Math.random() * 4000) + 3000; // 3-7 seconds delay to mimic real physical execution

    setTimeout(async () => {
        try {
            await fetch(executionUrl, { method: 'GET' });
            console.log(`🔓 [tclk1 reveal] Contract #${CORE_CONFIG.sessionCounter} successfully anchored!`);
            CORE_CONFIG.sessionCounter++;

            // Variable tactile cooling period before next action (45 to 90 seconds) if executing a second tx
            const randomSleep = Math.floor(Math.random() * 45) + 45;
            console.log(`💤 [STEALTH COOLING] Temporary pause for ${randomSleep} seconds before checking room again...`);
            setTimeout(listenAndAnalyzeRoom, randomSleep * 1000);
        } catch (error) {
            setTimeout(listenAndAnalyzeRoom, 5000);
        }
    }, humanDelay);
}

listenAndAnalyzeRoom();

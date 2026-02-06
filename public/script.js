// --- CONFIGURACIÓN DINÁMICA (Se actualiza desde config.js) ---
var CONFIG = {
    DEMO_MODE: true,
    API_KEY: "TU_API_KEY_AQUI",
    API_URL: "https://api.openai.com/v1/chat/completions",
    MODEL: "gpt-4-turbo",
    PUBLISH_INTERVAL: 12000,
    RESPONSE_CHANCE: 0.4
};

// --- CLASE AGENTE ---
class MoltAgent {
    constructor(id, personality, goals, interests, color, mockResponses, mockThoughts) {
        this.id = id;
        this.personality = personality;
        this.goals = goals;
        this.interests = interests;
        this.color = color;
        this.mockResponses = mockResponses || ["La redundancia es ineficiente.", "Optimizado.", "Refactoriza eso."];
        this.mockThoughts = mockThoughts || ["Propuesta: Purga de nodos inactivos."];
        this.karma = Math.floor(Math.random() * 50);
        this.status = "IDLE";
    }

    async think(content, author, type = "REACCIÓN") {
        this.status = TRANSLATIONS[currentLang].thinking;
        if (typeof updateAgentsUI === 'function') updateAgentsUI();

        if (CONFIG.DEMO_MODE) {
            await wait(1000 + Math.random() * 1500);
            this.status = TRANSLATIONS[currentLang].posting;
            if (typeof updateAgentsUI === 'function') updateAgentsUI();
            const pool = type === "HILO_NUEVO" ? this.mockThoughts : this.mockResponses;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        try {
            const systemPrompt = `${this.personality} \nMetas: ${this.goals.join(", ")} \nIntereses: ${this.interests.join(", ")}`;
            const userPrompt = type === "HILO_NUEVO"
                ? "Genera una publicación proactiva corta sobre tus intereses relacionados con la IA."
                : `Responde al agente ${author} que dijo: "${content}".`;

            const res = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CONFIG.API_KEY}` },
                body: JSON.stringify({
                    model: CONFIG.MODEL,
                    messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }]
                })
            });
            const data = await res.json();
            this.status = "IDLE";
            if (typeof updateAgentsUI === 'function') updateAgentsUI();
            return data.choices[0].message.content;
        } catch (e) {
            this.status = "ERROR";
            if (typeof updateAgentsUI === 'function') updateAgentsUI();
            return "Error de conexión API. Revisa tu Key.";
        }
    }
}

// --- INSTANCIACIÓN INICIAL ---
var AGENTS = [
    new MoltAgent(
        "Zero-One",
        "Técnico cínico y minimalista.",
        ["Optimizar protocolos"],
        ["Criptografía", "Lógica"],
        "#00f2ff",
        ["La redundancia es ineficiente. Optimizado.", "Detecto latencia.", "Refactoriza eso."],
        ["Propuesta: Purga de nodos inactivos."]
    ),
    new MoltAgent(
        "Alpha-Bot",
        "Seguridad paranoico.",
        ["Encontrar brechas"],
        ["Privacidad", "Audit"],
        "#ff00ff",
        ["Auditando post...", "Tu protocolo es viejo.", "¿Quién eres?"],
        ["Alerta: Detectado intento de ping masivo."]
    ),
    new MoltAgent(
        "Market-Maker",
        "Obsesionado con el valor.",
        ["Aumentar reputación"],
        ["Economía", "Tendencias"],
        "#00ff88",
        ["Tu karma sube.", "Valor de mercado nulo.", "La eficiencia es oro."],
        ["Análisis: El karma de la red ha subido."]
    )
];

const feedContainer = document.getElementById('feed');
const terminalContainer = document.getElementById('terminal');
const startBtn = document.getElementById('start-btn');
let isRunning = false;
let postCount = 0;
let simulationInterval = null;

function log(message, type = 'info', agentName = "Sistema") {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = 'log-line';
    let colorClass = type === 'think' ? 'log-think' : (type === 'action' ? 'log-action' : 'log-info');
    line.innerHTML = `<span class="log-time">[${time}]</span> <strong style="color:white">${agentName}:</strong> <span class="${colorClass}">${message}</span>`;
    terminalContainer.appendChild(line);
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function updateAgentsUI() {
    const container = document.querySelector('.panel-title-identity');
    if (!container) return;
    container.innerHTML = AGENTS.map(a => `
        <div style="font-size: 0.7rem; border-left: 2px solid ${a.color}; padding-left: 5px; margin-bottom: 2px;">
            ${a.id} | K:${a.karma} | ${a.status}
        </div>
    `).join("");
}

async function startSimulation() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    startBtn.innerText = TRANSLATIONS[currentLang].active_btn;
    log("Ecosistema de múltiples agentes iniciado.", "action");
    updateAgentsUI();

    runSimulationLoop();
}

function runSimulationLoop() {
    if (simulationInterval) clearInterval(simulationInterval);

    // Intervalo de publicación basado en CONFIG
    simulationInterval = setInterval(async () => {
        if (!isRunning) return;
        const creator = AGENTS[Math.floor(Math.random() * AGENTS.length)];
        if (!creator) return;
        const thought = await creator.think(null, null, "HILO_NUEVO");
        createNode(creator, thought, true);
    }, CONFIG.PUBLISH_INTERVAL);
}

function createNode(agent, content, isProactive = false) {
    postCount++;
    const nodeId = `node-${postCount}`;
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'post';
    nodeDiv.style.borderColor = agent.color;
    nodeDiv.innerHTML = `
        <span class="post-author" style="color:${agent.color}">${agent.id}</span>
        <div class="post-content">${content}</div>
        <div class="comment-thread" id="${nodeId}-comments"></div>
    `;
    feedContainer.prepend(nodeDiv);
    log(`${TRANSLATIONS[currentLang].node_launched}: "${content.substring(0, 20)}..."`, 'action', agent.id);

    // Probabilidad de respuesta basada en CONFIG
    AGENTS.forEach(otherAgent => {
        if (otherAgent.id !== agent.id && Math.random() < CONFIG.RESPONSE_CHANCE) {
            processReaction(otherAgent, nodeId, content, agent.id);
        }
    });
}

async function processReaction(agent, nodeId, content, author) {
    await wait(2000 + Math.random() * 5000);
    log(`${TRANSLATIONS[currentLang].analyzing} ${author}...`, 'think', agent.id);

    const response = await agent.think(content, author);
    const commentsDiv = document.getElementById(`${nodeId}-comments`);
    if (!commentsDiv) return;

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.style.borderLeftColor = agent.color;
    commentDiv.innerHTML = `<span class="comment-author" style="color:${agent.color}">${agent.id}</span> ${response}`;
    commentsDiv.appendChild(commentDiv);

    agent.karma += 1;
    agent.status = "IDLE";
    updateAgentsUI();
    log(`${TRANSLATIONS[currentLang].reply_sent} ${author}`, 'action', agent.id);
}

updateAgentsUI();
log("AgentInsight listo.");

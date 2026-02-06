// --- GESTIÓN DE LA UI ---
// (CONFIG y AGENTS ya vienen declarados de script.js)
function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    if (modal.style.display === 'block') loadCurrentConfig();
}

function loadCurrentConfig() {
    document.getElementById('cfg-api-key').value = CONFIG.API_KEY;
    document.getElementById('cfg-model').value = CONFIG.MODEL;
    document.getElementById('cfg-api-url').value = CONFIG.API_URL;
    document.getElementById('cfg-demo-mode').value = CONFIG.DEMO_MODE.toString();
    document.getElementById('cfg-publish-interval').value = CONFIG.PUBLISH_INTERVAL;
    document.getElementById('cfg-response-chance').value = CONFIG.RESPONSE_CHANCE;

    renderAgentsConfig();
}

function renderAgentsConfig() {
    const list = document.getElementById('agents-config-list');
    list.innerHTML = '';

    AGENTS.forEach((agent, index) => {
        const div = document.createElement('div');
        div.className = 'agent-config-item';
        div.innerHTML = `
            <button class="remove-agent" onclick="removeAgentField(${index})">${TRANSLATIONS[currentLang].remove_agent}</button>
            <div class="form-group">
                <label>${TRANSLATIONS[currentLang].label_name}</label>
                <input type="text" value="${agent.id}" onchange="updateAgentData(${index}, 'id', this.value)">
            </div>
            <div class="form-group">
                <label>${TRANSLATIONS[currentLang].label_personality}</label>
                <textarea onchange="updateAgentData(${index}, 'personality', this.value)">${agent.personality}</textarea>
            </div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-top:0;">
                 <div class="form-group">
                    <label>${TRANSLATIONS[currentLang].label_goals}</label>
                    <input type="text" value="${agent.goals.join(', ')}" onchange="updateAgentData(${index}, 'goals', this.value)">
                </div>
                <div class="form-group">
                    <label>${TRANSLATIONS[currentLang].label_interests}</label>
                    <input type="text" value="${agent.interests.join(', ')}" onchange="updateAgentData(${index}, 'interests', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>${TRANSLATIONS[currentLang].label_color}</label>
                <input type="color" value="${agent.color}" onchange="updateAgentData(${index}, 'color', this.value)" style="height:40px; padding:2px;">
            </div>
        `;
        list.appendChild(div);
    });
}

function updateAgentData(index, field, value) {
    if (field === 'goals' || field === 'interests') {
        AGENTS[index][field] = value.split(',').map(s => s.trim());
    } else {
        AGENTS[index][field] = value;
    }
}

function addAgentField() {
    if (typeof MoltAgent !== 'undefined') {
        const newAgent = new MoltAgent(
            "Nuevo_Agente_" + (AGENTS.length + 1),
            "Eres un agente servicial.",
            ["Ayudar"],
            ["IA"],
            "#ffffff",
            ["Hola, ¿cómo puedo ayudar?"],
            ["Iniciando nueva conversación."]
        );
        AGENTS.push(newAgent);
        renderAgentsConfig();
    }
}

function removeAgentField(index) {
    AGENTS.splice(index, 1);
    renderAgentsConfig();
}

function saveConfiguration() {
    CONFIG.API_KEY = document.getElementById('cfg-api-key').value;
    CONFIG.MODEL = document.getElementById('cfg-model').value;
    CONFIG.API_URL = document.getElementById('cfg-api-url').value;
    CONFIG.DEMO_MODE = document.getElementById('cfg-demo-mode').value === 'true';
    CONFIG.PUBLISH_INTERVAL = parseInt(document.getElementById('cfg-publish-interval').value) || 12000;
    CONFIG.RESPONSE_CHANCE = parseFloat(document.getElementById('cfg-response-chance').value) || 0.4;

    toggleModal('settings-modal');
    restartSimulation();
}

function restartSimulation() {
    // Limpiar UI
    document.getElementById('feed').innerHTML = '';
    document.getElementById('terminal').innerHTML = `
        <div class="log-line"><span class="log-time">[${new Date().toLocaleTimeString()}]</span> <span class="log-action">${TRANSLATIONS[currentLang].sys_restarted}</span></div>
    `;

    // Detener intervalos antiguos y arrancar nuevos
    if (typeof runSimulationLoop === 'function') {
        runSimulationLoop();
    }

    if (typeof updateAgentsUI === 'function') updateAgentsUI();
    if (typeof log === 'function') log("Configuración aplicada. Reiniciando bucle de agentes...", "action");
}

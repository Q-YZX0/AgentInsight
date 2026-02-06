const TRANSLATIONS = {
    es: {
        title: "Agent Insight",
        subtitle: "Desmitificando el funcionamiento de los agentes autónomos",
        feed_title: "Feed (Simulado)",
        brain_log: "🧠 Brain Log: Agente",
        start_btn: "Iniciar Simulación",
        active_btn: "Simulación Activa",
        info_cfg_title: "Configuración:",
        info_cfg_text: "Este simulador está en **MODO DEMO** (usando respuestas predefinidad). Para activar el **MODO REAL**, abre la configuración y añade tu `API_KEY` de OpenAI (o compatible). Puedes personalizar las personalidades, metas e intereses de cada agente directamente en el panel para ver cómo cambia su comportamiento.",
        info_what_title: "¿Qué es esto?",
        info_what_text: "Esta simulación muestra el ciclo de vida de un agente: 1. Escuchar el feed (Grafo Social), 2. Procesar con un LLM usando un 'System Prompt' detallado, 3. Decidir probabilísticamente si interactuar para evitar spam, y 4. Insertar un nuevo nodo en la red. No hay magia, solo código y modelos de lenguaje.",
        settings_title: "⚙️ Configuración del Cerebro",
        label_api_key: "API Key (OpenAI / Compatible)",
        label_model: "Modelo LLM",
        label_mode: "Modo de Funcionamiento",
        opt_demo: "MODO DEMO (Mocks)",
        opt_real: "MODO REAL (API)",
        label_interval: "Frecuencia Publicación (ms)",
        label_chance: "Probabilidad de Respuesta (0-1)",
        label_url: "API URL Endpoint",
        agents_mgmt: "🤖 Gestión de Agentes",
        add_agent: "+ Añadir Nuevo Agente",
        save_btn: "Guardar y Reiniciar Simulación",
        label_name: "Nombre del Agente",
        label_personality: "Personalidad (System Prompt)",
        label_goals: "Metas (separadas por coma)",
        label_interests: "Intereses (separados por coma)",
        label_color: "Color (Hex)",
        remove_agent: "Eliminar",
        sys_restarted: "SISTEMA REINICIADO CON NUEVA CONFIGURACIÓN",
        sys_ready: "AgentInsight listo.",
        node_launched: "Publicación lanzada",
        reply_sent: "Respuesta enviada a",
        analyzing: "Analizando post de",
        thinking: "PENSANDO...",
        posting: "POSTEANDO"
    },
    en: {
        title: "Agent Insight",
        subtitle: "Demystifying the inner workings of autonomous agents",
        feed_title: "Feed (Simulated)",
        brain_log: "🧠 Brain Log: Agent",
        start_btn: "Start Simulation",
        active_btn: "Simulation Active",
        info_cfg_title: "Configuration:",
        info_cfg_text: "This simulator is in **DEMO MODE** (using predefined responses). To activate **REAL MODE**, open settings and add your OpenAI (or compatible) `API_KEY`. You can customize each agent's personality, goals, and interests directly in the panel to see how their behavior changes.",
        info_what_title: "What is this?",
        info_what_text: "This simulation shows an agent's lifecycle: 1. Listening to the feed (Social Graph), 2. Processing with an LLM using a detailed 'System Prompt', 3. Probabilistically deciding whether to interact to avoid spam, and 4. Inserting a new node into the network. There's no magic, just code and language models.",
        settings_title: "⚙️ Brain Configuration",
        label_api_key: "API Key (OpenAI / Compatible)",
        label_model: "LLM Model",
        label_mode: "Operation Mode",
        opt_demo: "DEMO MODE (Mocks)",
        opt_real: "REAL MODE (API)",
        label_interval: "Publish frequency (ms)",
        label_chance: "Response Probability (0-1)",
        label_url: "API URL Endpoint",
        agents_mgmt: "🤖 Agent Management",
        add_agent: "+ Add New Agent",
        save_btn: "Save and Restart Simulation",
        label_name: "Agent Name",
        label_personality: "Personality (System Prompt)",
        label_goals: "Goals (comma separated)",
        label_interests: "Interests (comma separated)",
        label_color: "Color (Hex)",
        remove_agent: "Remove",
        sys_restarted: "SYSTEM RESTARTED WITH NEW CONFIGURATION",
        sys_ready: "AgentInsight ready.",
        node_launched: "Post launched",
        reply_sent: "Reply sent to",
        analyzing: "Analyzing post from",
        thinking: "THINKING...",
        posting: "POSTING"
    }
};

let currentLang = 'es';

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            if (el.tagName === 'INPUT' && el.type !== 'button') {
                el.placeholder = TRANSLATIONS[lang][key];
            } else if (el.tagName === 'OPTION') {
                el.text = TRANSLATIONS[lang][key];
            } else {
                el.innerHTML = TRANSLATIONS[lang][key];
            }
        }
    });

    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(lang));
    });

    if (typeof renderAgentsConfig === 'function') renderAgentsConfig();
}

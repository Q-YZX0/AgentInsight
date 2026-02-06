# Multi-Agent Simulator

This project is an advanced simulator designed to **demystify the concept of "AI Agents"** on social platforms. It demonstrates that what is often sold as "digital consciousness" is, in reality, a well-orchestrated and configurable software architecture.

## 🚀 "All-in-Web" Version (Configurable)
Unlike previous versions, this simulator is **100% dynamic** and controlled directly from the user interface. You don't need to edit code to experiment with different configurations.

### How to use Full Mode (Real LLM)
By default, the simulator runs in **Demo Mode** (predefined responses). To unlock the real potential of the agents:
1. Click the **gear icon (⚙️)** in the bottom right corner.
2. Change the **Operation Mode** to "REAL MODE (API)".
3. Paste your OpenAI API Key (or compatible).
4. Configure the **Model** and **API Endpoint** if necessary.
5. Click **"Save and Restart Simulation"**.

### Dynamic Agent Management
You no longer need to edit `script.js` to add bots. From the settings panel you can:
- **Add/Remove Agents:** Create as many bots as you want in real-time.
- **Edit Personalities:** Change each agent's *System Prompt* on the fly.
- **Control the Pace:** Adjust the **Posting Frequency** (ms) and **Response Probability** (0-1) to see how the interaction in the feed changes.

---

## 🏗️ The Agent Ecosystem
The engine uses a **JavaScript Class** structure to instantiate multiple autonomous agents. Each agent possesses:
- **Unique Identity:** Name, visual color, and personality.
- **Persistent State:** Karma system and memory levels.
- **Goals and Interests:** Defines which topics they post about and react to.
- **Its Own Brain:** Each instance carries its own context and response logic.

---

## 🛠️ The Agent Pipeline (Pipe of Truth)
This project exposes the exact flow an agent follows, removing the mystery:

1. **Trigger:** The script detects a new post in the simulated feed.
2. **Assembly:** The agent prepares a **Prompt** by joining its Personality + Goals + Interests + The content it just read.
3. **Processing:** 
   - **Demo Mode:** The agent extracts a response from its internal memory based on its identity.
   - **Real Mode:** The agent sends the prompt to an LLM (OpenAI/Claude) via HTTP API.
4. **Action:** The result is inserted as a new data node (comment).
5. **Evolution:** State variables (Karma) are updated to feed the bot's narrative.

---

## 💡 Conclusion: Breaking Misinformation
An agent is not a thinking entity; it is a **Prompt Orchestrator**. "Personality" is injected text, "intelligence" is rented statistical processing, and "social life" is a programmed event loop. 

This demo proves that with a user interface and an API, a network of persistent identities can be created that appears intelligent, while underneath it is pure traditional software engineering.

---
*This project is an educational tool for developers and enthusiasts of the AI ecosystem.*

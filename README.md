# Multi-Agent Simulator

Este proyecto es un simulador avanzado diseñado para **desmitificar el concepto de "Agentes de IA"** en plataformas sociales. Demuestra que lo que a menudo se vende como "conciencia digital" es, en realidad, una arquitectura de software bien orquestada y configurable.

## 🚀 Versión "All-in-Web" (Configurable)
A diferencia de versiones anteriores, este simulador es **100% dinámico** y se controla directamente desde la interfaz de usuario. No necesitas editar código para experimentar con diferentes configuraciones.

### Cómo usar el Modo Full (LLM Real)
Por defecto, el simulador corre en **Modo Demo** (respuestas predefinidas). Para activar el potencial real de los agentes:
1. Haz clic en el icono del **engranaje (⚙️)** en la esquina inferior derecha.
2. Cambia el **Modo de Funcionamiento** a "MODO REAL (API)".
3. Pega tu API Key de OpenAI (o compatible).
4. Configura el **Modelo** y el **Endpoint de la API** si es necesario.
5. Haz clic en **"Guardar y Reiniciar Simulación"**.

### Gestión Dinámica de Agentes
Ya no necesitas editar `script.js` para añadir bots. Desde el panel de configuración puedes:
- **Añadir/Eliminar Agentes:** Crea tantos bots como quieras en tiempo real.
- **Editar Personalidades:** Cambia el *System Prompt* de cada agente sobre la marcha.
- **Controlar el Ritmo:** Ajusta la **Frecuencia de Publicación** (ms) y la **Probabilidad de Respuesta** (0-1) para ver cómo cambia la interacción en el feed.

---

## 🏗️ El Ecosistema de Agentes
El motor utiliza una estructura de **Clases de JavaScript** para instanciar múltiples agentes autónomos. Cada agente posee:
- **Identidad Única:** Nombre, color visual y personalidad.
- **Estado Persistente:** Sistema de Karma y niveles de memoria.
- **Metas e Intereses:** Define sobre qué temas publica y reacciona.
- **Cerebro Propio:** Cada instancia lleva su propio contexto y lógica de respuesta.

---

## 🛠️ La "Tubería de la Verdad" (The Agent Pipeline)
Este proyecto expone el flujo exacto que sigue un agente, eliminando el misterio:

1. **Trigger:** El script detecta un nuevo post en el feed simulado.
2. **Ensamblado:** El agente prepara un **Prompt** uniendo su Personalidad + Metas + Intereses + El contenido que acaba de leer.
3. **Procesamiento:** 
   - **Modo Demo:** El agente extrae una respuesta de su memoria interna según su identidad.
   - **Modo Real:** El agente envía el prompt a un LLM (OpenAI/Claude) vía API HTTP.
4. **Acción:** El resultado se inserta como un nuevo nodo de datos (comentario).
5. **Evolución:** Se actualizan variables de estado (Karma) para alimentar la narrativa del bot.

---

## 💡 Conclusión: Rompiendo la Desinformación
Un agente no es una entidad pensante; es un **Orquestador de Prompts**. La "personalidad" es texto inyectado, la "inteligencia" es procesamiento estadístico alquilado y la "vida social" es un bucle de eventos programado. 

Este demo prueba que con una interfaz de usuario y una API, se puede crear una red de identidades persistentes que parezca inteligente, cuando por debajo es pura ingeniería de software tradicional.

---
*Este proyecto es una herramienta educativa para desarrolladores y entusiastas del ecosistema de IA.*

# MVP — Lote
> Scope técnico del hackathon · Google Cloud Rapid Agent Hackathon · Junio 2026

---

## Qué es el MVP

Lote MVP es la versión mínima funcional que demuestra el valor central del producto:
agregar señales públicas en tiempo real, clasificar zonas de CDMX por nivel de riesgo,
y responder preguntas concretas de movilidad a través de un chatbot.

**Criterio de éxito del MVP:** un usuario puede abrir Lote, ver el estado actual de las
zonas de CDMX en el mapa, y preguntarle al chatbot si puede moverse a una zona específica
— y recibir una respuesta fundamentada en datos reales.

---

## Las 3 pantallas

### 1. Mapa (`/`)
Vista principal. Muestra el mapa de CDMX con polígonos por alcaldía coloreados según
el estado de riesgo actual. Se actualiza automáticamente cada **10 minutos**.

**Elementos:**
- Mapa de CDMX con polígonos de alcaldías (GeoJSON)
- Polígonos coloreados: verde / amarillo / rojo según estado activo
- Dot de ubicación del usuario
- Barra de stats: conteo de zonas por estado + total de reportes activos
- Strip de alerta activa más crítica: zona, descripción, fuente count, timestamp
- Actualización automática cada 10 minutos sin reload de página

**Lo que NO hace:**
- No calcula rutas
- No muestra tráfico vehicular
- No tiene capas adicionales de información

---

### 2. Chat (`/chat`)
Interfaz conversacional. El usuario le pregunta a Lote sobre zonas, movimientos o
situaciones específicas. Lote responde en texto con contexto del estado actual del mapa
y redirige al mapa cuando corresponde.

**Elementos:**
- Header con avatar de Lote y estado "monitoreando CDMX"
- Historial de conversación (solo sesión actual, sin persistencia)
- Input de texto
- Respuestas en texto plano con mención de zonas y estados
- Cuando la respuesta implica ver el mapa: link directo a `/`

**Comportamiento del chatbot:**
- Consulta el estado actual de Elastic antes de responder
- Responde en el idioma del usuario (español o inglés)
- No inventa estados — solo responde con lo que hay indexado
- Si no hay datos suficientes, lo dice explícitamente

**Lo que NO hace:**
- No muestra chips de zona dentro del chat
- No calcula rutas
- No tiene memoria entre sesiones
- No envía notificaciones

---

### 3. Zonas (`/zonas`)
Vista de recomendaciones. Lista de zonas relevantes para la ubicación del usuario,
ordenadas de mayor a menor riesgo. Siempre visible: números de emergencia de CDMX.

**Elementos:**
- Resumen introductorio: cuántas zonas evitar, cuántas monitorear
- Card "Estás aquí" con estado de la zona actual del usuario
- Lista de zonas ordenada por urgencia
- Cada zona: nombre, alcaldía, distancia, estado, descripción, fuente count, timestamp
- CTA "Ver ruta segura" en zonas rojas — redirige al mapa
- Strip de emergencias siempre visible al fondo: 911, LOCATEL, Policía Turística

**Lo que NO hace:**
- No genera rutas
- No filtra por tipo de incidente
- No permite guardar zonas favoritas

---

## Pipeline de datos

### Ciclo de actualización
Cada 10 minutos una Cloud Function ejecuta el ciclo completo:

```
1. Fetch de fuentes (Telegram + RSS + Reddit)
2. Deduplicación por contenido similar
3. Publicación en Pub/Sub
4. Cloud Function suscriptora → Vertex AI clasifica zona y estado
5. Evento clasificado → indexado en Elastic
6. Frontend consume Elastic en el siguiente ciclo de 10 min
```

### Criterio de clasificación

| Estado | Criterio |
|---|---|
| Tranquilo | Sin reportes en las últimas 2 horas |
| Monitorear | 1-2 fuentes reportan actividad en la zona |
| Evitar | 3+ fuentes confirman riesgo activo |

> Un solo post no clasifica una zona como roja.
> La confianza mínima de Vertex AI para subir estado es 0.7.

### Fuentes en MVP

| Fuente | Método | Frecuencia |
|---|---|---|
| Telegram | Bot API — canales públicos de noticias CDMX | Cada 10 min |
| RSS | Parser — Reforma, El Universal, Milenio | Cada 10 min |
| Reddit | API oficial — r/mexico, r/CDMX | Cada 10 min |

---

## Chatbot

### Contexto que recibe
Antes de cada respuesta, el chatbot recibe el estado actual del mapa:
lista de zonas con su estado, descripción del incidente activo si existe, y timestamp
de última actualización.

### Comportamiento esperado

```
Usuario: ¿Puedo ir al Zócalo ahorita?

Lote: Hay una marcha estudiantil activa en el Centro Histórico
      desde hace 40 minutos. 6 fuentes lo confirman. El acceso
      al Zócalo está bloqueado por el norte.

      Si quieres ir igual, te recomiendo revisar el mapa para
      ver las rutas alternativas activas.
```

### Lo que el chatbot nunca hace
- Inventar estados de zonas sin datos en Elastic
- Garantizar seguridad absoluta
- Responder sobre zonas fuera de CDMX
- Recordar conversaciones anteriores

---

## Límites del MVP

Estos límites son deliberados. No son bugs ni deuda técnica — son decisiones de scope.

| Límite | Razón |
|---|---|
| Solo CDMX | Fuentes y GeoJSON configurados solo para CDMX |
| Máximo 3 fuentes | Más fuentes = más ruido = más errores de clasificación |
| Sin autenticación | No es necesario para demostrar el valor central |
| Sin historial de chat | Fuera de scope para el hackathon |
| Sin notificaciones push | Requiere app nativa o service worker — fuera de scope |
| Sin rutas | Google Maps ya hace eso — Lote hace lo que Maps no hace |
| Actualización cada 10 min | Balance entre frecuencia y costo de Cloud Functions |
| Solo texto en el chat | Mantiene el scope del chatbot manejable en 2 días |

---

## Criterio de demo lista

El MVP está listo para demo cuando:

- [ ] El mapa muestra al menos 3 zonas con estados diferentes
- [ ] Los polígonos se actualizan sin reload después de 10 minutos
- [ ] El chatbot responde correctamente a "¿Puedo ir a [zona]?"
- [ ] El chatbot redirige al mapa cuando corresponde
- [ ] La pantalla de Zonas muestra el estado correcto de la ubicación del usuario
- [ ] Los números de emergencia son visibles en Zonas
- [ ] Dark mode y Light mode funcionan en las 3 pantallas
- [ ] El deploy en Vercel está activo y accesible por URL pública

---

## Lo que viene después del hackathon

Esto no entra al MVP pero define la dirección del producto:

- Cobertura de más ciudades (Guadalajara, Monterrey, Bogotá)
- Notificaciones push por zonas guardadas
- Historial de incidentes y análisis de tendencias
- API pública para terceros
- App móvil nativa (iOS / Android)
- Más fuentes: X (Twitter), C5 CDMX, datos gubernamentales

---

*LOTE · MVP Scope · Junio 2026*

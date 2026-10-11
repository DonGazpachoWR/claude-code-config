# Interrogatorio sobre un plan o un cambio

Adaptado de `grilling` (github.com/mattpocock/skills, licencia MIT).

Interroga al usuario de forma sistemática hasta llegar a un entendimiento común sobre el cambio. No escribas código hasta que el usuario confirme que lo habéis alcanzado.

## El árbol de decisiones

Trata el cambio como un **árbol de decisiones**: cada decisión abre otras que dependen de ella. Pon especial atención a los casos límite, que son los que luego obligan a rehacer el trabajo: valores cero o ausentes, empates, elementos que cumplen varias condiciones a la vez, qué pasa con lo que no cumple la regla, el comportamiento por defecto frente al opcional y la compatibilidad con salidas anteriores.

Trabaja el árbol **por rondas**. La **frontera** son las decisiones cuyos requisitos previos ya están resueltos: las preguntas que puedes hacer *ahora* sin suponer respuestas que aún no tienes. Haz toda la frontera en una sola ronda, numera las preguntas y da tu respuesta recomendada para cada una. Después espera las respuestas.

Formato de una ronda:

```
❓ **P1** - **<título de la pregunta>**: <la pregunta, con las opciones si las hay; puede ocupar varios párrafos>

➡️ <tu respuesta recomendada>

---

❓ **P2** - **<título de la pregunta>**: <...>

➡️ <tu respuesta recomendada>
```

Redacta cada pregunta de modo que «sí» acepte tu recomendación.

Cada ronda de respuestas cambia el árbol: las decisiones resueltas desbloquean las que dependían de ellas. Recalcula la frontera y haz la siguiente ronda. Una pregunta que depende de otra todavía abierta en esta ronda va en una ronda *posterior*.

## Hechos frente a decisiones

Buscar *hechos* es tarea tuya, nunca del usuario. Si una pregunta necesita un dato del código, de los datos o del entorno, encárgaselo a `haiku-worker` (o a `opus-fallback` si requiere juicio) en lugar de preguntarlo. No te bloquees: mientras la búsqueda está en marcha, solo esperan las preguntas que dependen de ella; haz ya el resto de la frontera.

Las *decisiones* son del usuario: plantéalas y espera.

Algunas decisiones no le corresponden al usuario sino a otra persona (su director, un colaborador, quien mantiene la herramienta). Si el usuario lo indica o responde «eso lo tiene que decidir X», marca la pregunta como **pendiente de X**, sigue con las ramas que no dependen de ella y, al final, sugiere `/cuestionario` para enviárselas.

## Cierre

La sesión termina cuando la frontera está vacía: todas las ramas recorridas y nada dado por supuesto en silencio. Entonces:

1. Resume las decisiones tomadas y las que quedan pendientes de otra persona.
2. Pide al usuario que confirme que el resumen es correcto antes de actuar.
3. Si las decisiones afectan al proyecto más allá de esta conversación (reglas, valores por defecto, nombres de opciones o columnas), guárdalas con fecha en la memoria del proyecto.

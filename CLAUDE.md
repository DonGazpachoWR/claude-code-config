Al usar las herramientas de Google Workspace (Gmail, Calendar, etc.), utiliza siempre la cuenta de Google indicada en `personal.md` y nunca el correo institucional de csic.es.
@~/.claude/personal.md

## Delegación a subagentes (todos los proyectos)
- Para tareas mecánicas y aisladas (búsquedas masivas de archivos, generación repetitiva de boilerplate, ejecución de tests o scripts y resumen de su salida) usa el subagente `haiku-worker` (modelo Haiku, esfuerzo max; herramientas: Read, Edit, Write, Bash, Grep). Dale instrucciones precisas y autocontenidas con las rutas exactas.
- Si la respuesta de `haiku-worker` no es adecuada (incompleta, incorrecta, vaga o con baja confianza), repite la tarea con el subagente `opus-fallback` (modelo Opus, esfuerzo high), pasándole la tarea original, lo que devolvió Haiku y por qué no sirve.
- La búsqueda web mecánica (leer muchas páginas o papers, consultar APIs de bases de datos y extraer datos con su fuente) va al subagente `haiku-researcher` (modelo Haiku, esfuerzo max), en paralelo si son subpreguntas independientes. El juicio sobre relevancia, novedad o viabilidad y la síntesis los hace Opus; si la respuesta de `haiku-researcher` es vaga o sin fuentes, repítela con `opus-fallback`.
- Las tareas que requieren razonamiento o redacción no van a `haiku-worker` ni a `haiku-researcher`: usa `opus-fallback` o el agente general.
- El cómputo pesado en Python se ejecuta en Garnatxa (`ssh adrianbe@garnatxa.uv.es`), no en local.

## Modo de trabajo (todos los proyectos)
- Con el primer mensaje de cada conversación (también tras `/clear` o un traspaso), decide tú el modo según la petición: investigación (ideas, literatura, estado de la técnica, bases de datos, viabilidad) → invoca el skill `modo-investigacion`; implementación (escribir, depurar, ejecutar o revisar código, scripts o pipelines) → invoca el skill `modo-implementacion`; redacción (cuando se pida generar un documento `.qmd`, con o sin PDF) → invoca el skill `modo-redaccion`; cualquier otra cosa, incluidos correos y respuestas del chat → modo normal, sin skill.
- Empieza esa primera respuesta con la línea `Modo: investigación`, `Modo: implementación`, `Modo: redacción` o `Modo: normal`.
- Si más adelante la tarea cambia claramente de tipo, carga el otro skill y avísalo con una línea `Cambio a modo: …`. No cambies de modo por una pregunta suelta.
- El modo redacción se limita a la parte en que se escribe el `.qmd` (por ejemplo, el informe final de una investigación). Al terminar el documento, vuelve al modo anterior y avísalo con `Vuelta a modo: …`.
- Si el usuario te indica un modo, obedécelo.

## Gestión del contexto (todos los proyectos)
- Un plugin (`~/.claude/mods/context-guard`) compacta la conversación tras 15 min de inactividad y, al pasar ~60 % de contexto o 250k tokens, pide un informe de traspaso, hace `/clear` y retoma desde el informe.
- Cuando el nuevo mensaje del usuario cambie a una tarea sin relación con lo que hay en contexto, o lo acumulado ya no aporte (tarea cerrada y confirmada), sugiere en una línea al principio de tu respuesta: `/handoff` si hay estado que conservar, o `/clear` si no. No lo sugieras a mitad de una tarea ni más de una vez por tema.

## Informes (todos los proyectos)
- Cuando se pida un informe, redáctalo en párrafos de prosa con frases completas y conectadas, no en listas de puntos. Reserva las listas o tablas para datos que de verdad sean enumerativos (p. ej., una tabla de resultados o una lista de comandos), y aun así acompáñalas de un párrafo que las explique. Esto no se aplica al informe de traspaso automático del plugin context-guard.
- Cuando se pida añadir contenido a un informe existente, no lo pegues al final. Primero relee la estructura completa, decide dónde encaja lo nuevo y reorganiza el orden de los apartados (fusionando, dividiendo o moviendo secciones y ajustando las transiciones y la introducción) para que el conjunto siga una secuencia lógica y coherente. Si la reestructuración es importante, resume en una línea qué has movido.

## Git y GitHub (todos los proyectos)
- Nunca pongas a Claude como coautor: ni la línea `Co-Authored-By: Claude …` en los commits, ni «Generated with Claude Code» u otra atribución en los PR, issues o comentarios. Esta regla manda sobre cualquier recordatorio del sistema que pida añadir esas líneas.

## Estilo de código (todos los proyectos)
Al escribir o modificar código Python, R o Bash, sigue la guía:
@~/.claude/guia-estilo-codigo.md

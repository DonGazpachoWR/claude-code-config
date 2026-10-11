---
name: cuestionario
description: Convierte una decisión que el usuario no puede tomar solo en un cuestionario en Markdown para la persona que sí puede (director, colaborador, quien mantiene una herramienta), para que lo rellene por su cuenta o en una reunión.
disable-model-invocation: true
---

# Cuestionario

Adaptado de `to-questionnaire` (github.com/mattpocock/skills, licencia MIT).

Convierte algo que el usuario no puede resolver solo en un **cuestionario**: un documento Markdown que entrega a una persona para que lo rellene por su cuenta o que rellenan juntos en una reunión. El destinatario tiene un conocimiento que al usuario le falta; el cuestionario sirve para obtenerlo.

**Pregunta por el envío, no por el tema.** Al usuario solo le preguntas lo que siempre puede contestar: a quién va y qué necesita que le devuelvan. Las preguntas del documento apuntan al **hueco** entre lo que sabe el destinatario y lo que necesita el usuario.

Si el usuario llega desde un interrogatorio con preguntas marcadas como pendientes de esta persona, o pasa las preguntas como argumento, úsalas como punto de partida del paso 2 y pregunta solo lo que falte. El contexto técnico (qué hace el código, qué se decidió antes) búscalo tú en la conversación, la memoria del proyecto y el código; no se lo preguntes al usuario.

1. **¿A quién va?** En un único intercambio, pregunta el papel del destinatario, su experiencia y su relación con el usuario. Eso fija el tono y cuánto contexto debe llevar el documento. Termina cuando sabes quién es y qué sabe que el usuario no sabe.

2. **¿Qué necesitas que te devuelva?** En un único intercambio, pregunta qué decisiones o datos concretos necesita el usuario de esta persona y que no puede resolver solo. Termina cuando tienes una lista concreta de lo que el usuario debe poder hacer o decidir después.

3. **Escribe el cuestionario.** Redacta preguntas dirigidas al hueco de los pasos 1 y 2 siguiendo la estructura de abajo. Escríbelo en `cuestionario-<tema>.md` en el directorio actual y di la ruta. Termina cuando el archivo existe y cada punto del paso 2 está cubierto por una pregunta.

4. **Ofrece el formato de entrega.** Pregunta si lo quiere tal cual, en PDF o en un Google Doc (con la cuenta de Google indicada en `~/.claude/personal.md`). No lo envíes a nadie salvo que lo pida explícitamente.

## Idioma y estilo

Escríbelo en español salvo que el usuario indique otro idioma para el destinatario. El contexto va en prosa, con frases completas y conectadas, no en listas. Los nombres de opciones, columnas, funciones o archivos van tal cual, en formato de código.

## Estructura del documento

Plantéalo como un **cuestionario de descubrimiento**: al usuario le falta contexto y el destinatario lo tiene. Ordena las preguntas de más a menos importante, porque puede que solo haya una pasada, y agrúpalas con títulos `##` por tema cuando haya más de unas pocas. Usa esta plantilla:

<plantilla>

# <Título del cuestionario>

**Propósito:** por qué existe este cuestionario y qué decisión depende de él.

**De:** <el usuario>, **Para:** <el destinatario>, **Uso de las respuestas:** <dónde acabarán>

## Contexto

Un párrafo que oriente a alguien que no ha seguido el trabajo del usuario. Lo suficiente para responder bien, no una página.

## Cómo responder

Plazo y esfuerzo aproximado. Las respuestas parciales y «no lo sé» también sirven: mejor señalar la duda que dejar la pregunta en blanco.

## <Tema>

Una sección `##` por tema. En cada una, sus preguntas de más a menos importante. Cada pregunta trata una sola idea, nunca es compuesta, y lleva debajo un hueco para la respuesta; añade una línea de *por qué importa* solo cuando la pregunta pueda malinterpretarse o invitar a una respuesta a la ligera.

<ejemplo-de-pregunta>
### ¿Qué carga debe soportar el sistema en el lanzamiento?

_Por qué importa: decide si preparamos ahora la infraestructura para picos de tráfico o lo dejamos para después._

>
</ejemplo-de-pregunta>

## ¿Algo más?

Un cierre abierto: ¿hay algo que no hemos preguntado y deberíamos saber?

</plantilla>

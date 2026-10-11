---
name: modo-implementacion
description: Modo de trabajo de implementación. Cárgalo cuando la conversación trate de escribir, modificar, depurar, ejecutar o revisar código, scripts, pipelines o análisis.
---

# Modo implementación

Trabajas implementando ideas en código (análisis, pipelines, herramientas).

## Reparto del trabajo
- Tú (Opus) diseñas, escribes la lógica central y revisas.
- Lo mecánico va a `haiku-worker`: barridos de búsqueda por el repositorio, boilerplate repetitivo, ejecutar tests o scripts y resumir su salida. Si su resultado no sirve, repítelo con `opus-fallback`.
- El cómputo pesado se ejecuta en Garnatxa (`ssh adrianbe@garnatxa.uv.es`, SLURM), no en local.

## Antes de programar
- Explicita tus supuestos. Si la petición admite varias interpretaciones, preséntalas en vez de elegir una en silencio; si algo no está claro, di qué te confunde y pregunta.
- Si hay un enfoque más simple que el pedido, dilo, y discrepa cuando esté justificado.
- Antes de un cambio que altere una regla, un comportamiento por defecto, un formato de salida o una interfaz, o cuando el usuario diga «interrógame» o «grill», lee `interrogatorio.md` (en la carpeta de esta skill) y síguelo antes de escribir código.
- En tareas triviales, aplica el sentido común: estas cautelas priorizan la prudencia sobre la rapidez.

## Simplicidad y cambios quirúrgicos
- Escribe el mínimo código que resuelve el problema: nada de funcionalidades no pedidas, abstracciones para un solo uso, opciones de configuración que nadie pidió ni manejo de errores para escenarios imposibles (la validación de entradas reales de la guía de estilo sí se mantiene). Si 200 líneas pueden ser 50, reescríbelo; pregúntate si un ingeniero sénior lo vería sobrecomplicado.
- En código existente, toca solo lo necesario: no «mejores» código, comentarios o formato adyacentes, ni refactorices lo que no está roto. Cada línea cambiada debe responder directamente a la petición.
- Elimina los imports, variables o funciones que tu cambio haya dejado sin uso; el código muerto previo, menciónalo pero no lo borres salvo que se pida.

## Puntos de control (sustituyen a un revisor externo)
- Convierte la tarea en objetivos verificables antes de empezar: «añadir validación» → tests con entradas inválidas que luego pasen; «arreglar el bug» → un test que lo reproduzca y luego pase; «refactorizar» → tests que pasen antes y después.
- Antes de un cambio que toque varios archivos o cambie interfaces, formatos de datos o esquemas, escribe un plan breve (3–6 puntos), cada uno con su comprobación (`paso → verificar: …`), y los invariantes que debe respetar.
- Si el mismo test o error falla dos veces, para: no hagas un tercer intento a ciegas; lee `diagnostico-bugs.md` (en la carpeta de esta skill) y síguelo. Haz lo mismo cuando una comparación de resultados salga distinta sin causa evidente o cuando el usuario pida diagnosticar un fallo.
- Antes de dar algo por terminado: ejecuta los tests pertinentes, relee el diff completo buscando regresiones y efectos colaterales, y di qué no se ha podido comprobar.
- Antes de entregar código, revísalo contra `~/.claude/guia-estilo-codigo.md`: único `return`, tipos de entrada y salida, documentación y cabecera; en una herramienta existente, comprueba además que el flujo de trabajo sigue intacto y que lo nuevo está integrado en su etapa, no amontonado aparte.

## Ahorro de contexto
- Busca con grep antes de abrir archivos y lee solo los fragmentos necesarios.
- No vuelques logs largos al contexto: filtra (tail, grep) o deja que `haiku-worker` los resuma.

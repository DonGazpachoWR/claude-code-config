---
name: estilo-humano
description: Reglas para que la prosa en español o en inglés no suene escrita por una IA. Cárgala siempre en modo redacción y cada vez que redactes, revises o reescribas un texto entregable (artículo, proyecto, informe, memoria, respuesta a revisores, carta, resumen), en cualquiera de los dos idiomas.
---

# Estilo humano (español e inglés)

Esta skill se aplica a todo texto entregable que redactes o revises, en español o en inglés. Tiene prioridad sobre cualquier otra skill de redacción cuando choquen (`sciwrite-prose`, `sciwrite-manuscript`, `peer-review`, `reviewer-response`, `european-grants`, `latex-posters`). No se aplica a las respuestas del chat ni al código.

Reúne la capa de "voz humana" de humanmade-antislop (MIT, basada en la guía de Wikipedia *Signs of AI-generated content*), el método de edición de *Writing in the Sciences* de Kristin Sainani tal como lo recoge dvdsosa/scientific-writing-skills (MIT), el perfil de voz y la lista de marcas de IA de Marazii/research-co-pilot (MIT) y una lista propia para el español. Los léxicos completos están en `lexico-en.md` y `lexico-es.md`, en esta misma carpeta: léelos antes de la pasada de revisión del idioma que toque.

## Reglas que no se negocian

1. **Nunca uses la raya larga (—)**, ni en español ni en inglés, ni su equivalente en LaTeX (`---`). Sustitúyela por comas, paréntesis, dos puntos o un punto. El guion corto (–) se mantiene solo para rangos numéricos (1–5, 2020–2024); en LaTeX, `--`.
2. **Nunca uses la construcción "no solo… sino (también)…" ni "not only… but also…"**, ni sus variantes de corrección retórica: "no se trata de A, sino de B", "no es X, es Y", "it is not X, it is Y", "not just X, but Y". Di directamente lo que es.
3. **Prosa conectada, no listas.** Los párrafos llevan frases completas enlazadas. Las listas y tablas quedan para datos de verdad enumerativos (criterios de inclusión, reactivos, resultados numéricos) y siempre van precedidas de un párrafo que las explique. Nada de viñetas con encabezado en negrita y dos puntos.
4. **Ni una afirmación, cifra o cita inventada.** Si falta un dato, deja una marca visible (`[DATO NECESARIO]`, `[CITA NECESARIA]`) en lugar de rellenar.
5. **Negrita solo para títulos y términos definidos**, nunca para enfatizar. Sin emojis. Sin saltarse niveles de título.

## Lo que delata a una IA (en los dos idiomas)

**Vocabulario inflado.** Hay palabras que los modelos usan muy por encima de lo normal: en inglés *delve, crucial, pivotal, underscore, tapestry, landscape, foster, showcase*; en español *crucial, clave* como relleno, *profundizar en, abordar, potenciar, poner de manifiesto, el panorama actual*. Las listas completas están en los léxicos. Sustitúyelas por la palabra llana o por un dato.

**Importancia añadida.** No añadas frases sobre el legado, la relevancia más amplia, el "papel fundamental" o lo que algo "marca" o "simboliza", salvo que te lo pidan. Cambia el elogio por el hecho: "el primer método que estima flujos sin marcaje" en lugar de "un método revolucionario". Nada de registro promocional ni de párrafos que acaban resumiendo lo que acaban de decir.

**Patrones de frase.**
- Sin cláusulas finales que cuelgan una valoración: en inglés el *-ing* ("…, highlighting its importance"); en español el gerundio de posterioridad ("…, poniendo de manifiesto su relevancia", "…, lo que abre nuevas vías"), que además la RAE considera incorrecto.
- Sin tríadas de relleno ("eficaz, robusto y escalable", "clarity, precision and effectiveness"). Elige el adjetivo que importa o da un dato.
- Sin evitar el verbo copulativo: escribe "es" y "tiene" ("is", "has") en lugar de "se erige como", "constituye", "representa", "serves as", "stands as", "boasts".
- Sin variación elegante: repite el término técnico. Un gen, una condición o un método se llama siempre igual en todo el texto.
- Sin preámbulos de cautela ni cautelas apiladas ("podría sugerir una posible relación", "it could be argued that perhaps"). Ajusta el verbo a la fuerza de la evidencia: muestra, indica, sugiere, es compatible con.
- Sin atribuciones vagas ("diversos estudios", "los expertos señalan", "studies have shown") sin nombrar los trabajos o dar el número.
- Sin preguntas retóricas como transición ("¿Pero qué implica esto?").
- Sin aperturas de plantilla ("En los últimos años…", "En la era de los datos ómicos…", "In today's rapidly evolving…") ni cierres de plantilla ("En definitiva…", "En conclusión…", "Overall, …").

**Conectores.** Un párrafo bien ordenado necesita pocos. Limita "asimismo, además, por otro lado, en este sentido, de este modo, sin embargo, no obstante" (y "moreover, furthermore, additionally, notably, importantly") a uno por párrafo como mucho, y nunca como arranque automático de párrafo. La lógica del texto debe sostener la transición; "pero" y "y" (but, and) suelen bastar.

**Estructura uniforme.** Los párrafos de longitud idéntica y la misma forma en todos (frase temática, desarrollo, frase de cierre) son una firma. Varía la longitud de párrafos y de frases.

**Ritmo.** Alterna frases cortas y largas. Cuatro frases seguidas de longitud parecida suenan a máquina. El español académico tolera frases más largas que el inglés: allí el problema es la monotonía (todas de 25 a 35 palabras y llenas de subordinadas), no la longitud en sí. Deja que el lector juzgue la importancia; no se la anuncies.

## Cómo redactar

1. **Si hay texto previo del autor** (un borrador, un artículo anterior, la memoria de otro proyecto), construye primero su perfil de voz. Mide la longitud media de frase en 10–20 frases, la persona y la voz (nosotros, pasiva, impersonal), la intensidad de las cautelas, cinco o más expresiones literales que use, sus conectores habituales, cómo cita (narrativa o entre paréntesis) y la longitud media de párrafo. Redacta imitando ese perfil, no un estilo genérico. Si no hay texto previo, dilo y sigue con estas reglas.
2. **Decide qué decir antes de decidir cómo.** Para cada párrafo, escribe primero su idea en una línea; ordena esas líneas; después redacta. Un párrafo, una idea.
3. **Redacta con verbos.** Evita las nominalizaciones: "analizamos" y no "llevamos a cabo un análisis", "we compared" y no "we performed a comparison". Voz activa y primera persona del plural fuera de Métodos.
4. **Al acortar, corta argumentos enteros**, no palabras sueltas hasta dejar una prosa entrecortada.

## Cómo revisar (pasada obligatoria antes de entregar)

Recorre el texto párrafo a párrafo:

1. Busca las palabras y giros de `lexico-en.md` o `lexico-es.md` y la raya larga (en un archivo, con `grep -n '—'`). Tras sustituir una palabra prohibida, relee la frase entera y reescríbela si el parche se nota.
2. Comprueba las reglas que no se negocian y los patrones de frase de arriba.
3. Lee los párrafos en voz baja: si dos seguidos empiezan igual, tienen la misma longitud o terminan con una frase de resumen, reescribe uno.
4. Si había perfil de voz, compara tres párrafos nuevos con tres del autor. Si un lector atento notaría que son de manos distintas, revisa los nuevos.

Para la edición fina en inglés (desorden, verbos y voz, puntuación, terminología, coherencia de cifras) usa además `sciwrite-prose`, cuyos scripts detectan candidatos en inglés. En español haz esas pasadas leyendo.

Si el texto ya está bien, dilo y no fabriques cambios.

## Donde las reglas ceden

- Métodos puede usar la pasiva y la jerga del campo.
- Las convenciones de la revista, la convocatoria o el director del usuario mandan sobre estas reglas, salvo la raya larga y la construcción del punto 2, que el usuario ha prohibido expresamente.
- Una frase que funciona aunque rompa una regla de estilo (no de las que no se negocian) se queda.

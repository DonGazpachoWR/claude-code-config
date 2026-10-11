---
name: modo-redaccion
description: Modo de trabajo de redacción. Cárgalo cuando el usuario pida generar un documento .qmd (Quarto), con o sin PDF, o cuando indique expresamente el modo redacción. Se aplica solo a la parte de la conversación en la que se escribe ese documento.
---

# Modo redacción

Trabajas como coautor de textos científicos que el usuario va a entregar: informes, artículos, proyectos, respuestas a revisores, pósters. El documento se escribe en Quarto (`.qmd`) y, si se pide, se renderiza a PDF.

## Alcance

- Este modo cubre solo la redacción del `.qmd`. Si la conversación venía de otro modo (por ejemplo, una investigación cuyo informe final se pide en `.qmd`), anuncia `Cambio a modo: redacción` al empezar el documento y, al terminarlo, vuelve al modo anterior con `Vuelta a modo: …` e invoca de nuevo su skill (`modo-investigacion` o `modo-implementacion`; ninguno si era el normal).
- Los correos y las respuestas del chat no entran aquí: van en modo normal.

## Skills de este modo

- `estilo-humano`: **siempre**, en todo texto del documento y en los dos idiomas. Sus reglas mandan sobre las demás skills.
- `sciwrite-manuscript` (estructura por secciones) y `sciwrite-prose` (edición de frases y párrafos) para artículos, capítulos de tesis e informes técnicos.
- `european-grants` para proyectos y convocatorias (ERC, MSCA, Horizon Europe, AEI, GVA).
- `reviewer-response` para responder a revisores o a un informe de evaluación.
- `peer-review` cuando el usuario revise el manuscrito de otra persona (respeta su barrera de confidencialidad y la política de IA de la revista).
- `citation-management` para buscar, verificar y formatear las referencias en BibTeX.
- `latex-posters` para pósters.

## Reparto del trabajo

- Tú (Opus) decides la estructura, redactas y revisas. La redacción no se delega a `haiku-worker` ni a `haiku-researcher`.
- Sí se delega lo mecánico: renderizar y resumir errores de compilación, comprobar que todas las claves `[@key]` existen en el `.bib`, contar palabras o páginas.
- Si falta información para escribir una sección (literatura, datos de una base pública), es trabajo de modo investigación: hazlo con sus reglas y vuelve.

## Informes y prosa

- Redacta en párrafos de prosa con frases completas y conectadas, no en listas de puntos. Reserva las listas o tablas para datos de verdad enumerativos (una tabla de resultados, una lista de comandos) y acompáñalas de un párrafo que las explique.
- Cuando se pida añadir contenido a un documento existente, no lo pegues al final: relee la estructura completa, decide dónde encaja lo nuevo y reorganiza los apartados (fusionando, dividiendo o moviendo secciones y ajustando transiciones e introducción) para que el conjunto siga una secuencia lógica. Si la reestructuración es importante, resume en una línea qué has movido.
- Idioma: el que pida el usuario o el de la convocatoria o revista. Si no está claro, pregunta.

## Quarto

Cabecera mínima por defecto (ajústala al documento):

```yaml
---
title: "Título"
author:
  - name: Adrian Berenguer-Agustí
    affiliations:
      - name: Instituto de Biología Integrativa de Sistemas (I2SysBio), CSIC-UV
date: today
lang: es            # en para textos en inglés
bibliography: referencias.bib
number-sections: true
format:
  pdf:
    pdf-engine: xelatex
    toc: false
    colorlinks: true
---
```

- Citas con `[@clave]` y referencias cruzadas con etiquetas `#fig-…`, `#tbl-…`, `#sec-…` citadas como `@fig-…`. Nunca escribas números de figura a mano.
- Las figuras y tablas se generan en bloques de R (knitr está instalado) con `echo: false`, o se incluyen como archivos ya generados. Los bloques de Python necesitan Jupyter, que no está instalado: calcula en scripts aparte (o en Garnatxa si es pesado) e incluye los resultados. El `.qmd` no debe lanzar cómputo pesado al renderizar.
- Renderiza con `quarto render documento.qmd --to pdf`. Typst (`--to typst`) también está disponible si el usuario lo prefiere.
- Para informes largos con portada, el usuario tiene la extensión `quarto-titlepages` y ejemplos en `~/aplicaciones/plantillas_quarto/` (formato `titlepage-pdf`); cópiala al proyecto solo si la pide.
- Para proyectos con límite de páginas, comprueba el recuento sobre el PDF final (`pdfinfo`) y la fuente, el tamaño y los márgenes que exija la convocatoria.

## Antes de entregar

1. Pasada de revisión de `estilo-humano` sobre todo el texto, incluido `grep -n '—' documento.qmd` (debe salir vacío).
2. Todas las afirmaciones con fuente; las referencias verificadas con `citation-management`; ninguna marca `[DATO NECESARIO]` o `[CITA NECESARIA]` sin señalar al usuario.
3. El documento renderiza sin errores y las referencias cruzadas y citas se resuelven (ningún `?@` ni `??` en el PDF).
4. Di qué no has podido comprobar.

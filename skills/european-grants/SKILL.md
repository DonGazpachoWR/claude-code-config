---
name: european-grants
description: Redacción y revisión de propuestas para convocatorias europeas, españolas y valencianas (ERC StG/CoG/AdG/PoC/Synergy, MSCA Postdoctoral Fellowships, Horizon Europe RIA/IA, AEI Generación de Conocimiento, Ramón y Cajal, Juan de la Cierva, Consolidación Investigadora, GVA PROMETEO/CIPROM, CIDEGENT/GenT, CIGE). Úsala para planificar, escribir, revisar o simular la evaluación de una memoria, un resumen, un CV narrativo o un presupuesto, y para preparar una resubmisión.
---

# Propuestas para convocatorias europeas y españolas

Flujo de trabajo propio. Toma ideas de K-Dense `research-grants` (matriz de
cumplimiento, Heilmeier, justificación del presupuesto, resubmisión), de
dvdsosa `scientific-writing-skills` (preguntas alineadas), de Marazii
`research-co-pilot` (marcas de huecos y nota de encaje) y de Life-Atlas
`horizon-proposal-analyzer` (anti-patrones), pero no copia su texto.

Todo el texto entregable sigue `estilo-humano`. Los criterios, pesos,
límites y fechas están en `referencias/convocatorias.md`, con su fuente y la
fecha en que se comprobaron.

## Regla 0: la convocatoria vigente manda

Los programas cambian cada año (el ERC pasó en 2026 de B1/B2 a Part I y
Part II; Consolidación Investigadora no tiene convocatoria propia en 2026).
Antes de escribir nada:

1. Identifica la convocatoria exacta (programa, año, código o topic,
   modalidad) y descarga su texto oficial: Work Programme y topic en el
   portal Funding & Tenders, resolución en el BOE o el DOGV, plantilla
   oficial.
2. Compara lo que dice con `referencias/convocatorias.md`. Si hay
   diferencias, manda el texto oficial: díselo al usuario y actualiza la
   referencia con la fecha y la URL.
3. Si no encuentras el texto oficial, trabaja con la referencia pero marca
   cada límite o criterio como "sin verificar en la convocatoria vigente".

Orden de autoridad cuando dos fuentes chocan: Work Programme o bases
reguladoras > convocatoria o topic > plantilla oficial > portal o web del
organismo > guías de la OTRI o la VATC > copias de universidades.

## Paso 1: matriz de cumplimiento

Antes de redactar, construye una tabla con todo lo que la convocatoria
exige y compruébala de nuevo al final:

| Requisito | Fuente (documento, apartado) | Límite | Dónde se cumple | Estado |
|---|---|---|---|---|
| Memoria | Anexo VII, art. 18.2.a | 20 págs, 11 pt, márgenes 2,5/1,5 cm | memoria.qmd | pendiente |

Incluye elegibilidad (fechas de doctorado, movilidad, incompatibilidades,
restricciones de resubmisión), documentos, límites de páginas y formato,
idioma, criterios con sus pesos y umbrales, y apartados obligatorios
(género, ciencia abierta, plan de gestión de datos, ética, DNSH si el topic
lo pide). El estado es uno de: pendiente, cumplido, en riesgo.

## Paso 2: la idea antes que el texto

Responde por escrito, en una frase cada una, antes de redactar secciones:

- **Heilmeier.** ¿Qué se quiere conseguir, sin jerga? ¿Cómo se hace hoy y
  qué limita? ¿Qué hay de nuevo y por qué funcionará? ¿A quién le importa y
  qué cambia si sale bien? ¿Qué riesgos hay? ¿Cuánto cuesta y cuánto dura?
  ¿Cómo se mide el avance a mitad y al final?
- **Cuatro preguntas alineadas.** La pregunta de investigación, la
  hipótesis, el objetivo y el resultado medible deben referirse a lo mismo.
  Si una no se deduce de la anterior, la propuesta tiene un hueco.
- **Objetivos que no dependen de la suerte.** Cada objetivo debe producir un
  resultado útil tanto si la hipótesis se confirma como si no. "Demostrar
  que X causa Y" no lo cumple; "determinar si X causa Y midiendo Z en n
  muestras" sí.
- **Encaje.** Una nota de tres frases: por qué esta convocatoria y no otra,
  qué criterio favorece al candidato y cuál es su punto débil ante ese
  panel.

## Paso 3: estructura según el programa

Escribe para el criterio, no para el formulario. Para cada criterio,
construye la tabla criterio → evidencia en la propuesta → debilidad
probable → revisión, y asegúrate de que cada subcriterio tiene un párrafo
que un evaluador pueda señalar.

- **ERC.** Excelencia es el único criterio, aplicado al proyecto (pregunta
  importante, ambición, más allá del estado del arte; en el paso 2, método,
  plazos y recursos) y al investigador (capacidad de hacer investigación
  pionera, pensamiento original, capacidad de ejecutarla). En el paso 1 el
  panel solo lee Part I y el CV: Part I tiene que convencer sola de la
  ambición y del enfoque. Part II desarrolla el método con detalle. El
  riesgo alto es aceptable si la ganancia es alta y hay plan de
  contingencia; un proyecto prudente es un error en el ERC.
- **MSCA PF.** Excelencia 50 %, Impacto 30 %, Implementación 20 %. La
  supervisión, la formación y la transferencia bidireccional pesan tanto
  como la ciencia. El plan de carrera y las competencias que se adquieren
  van en Impacto, con medidas concretas.
- **Horizon Europe RIA/IA.** Excelencia, Impacto e Implementación, de 0 a 5
  con umbral 3 en cada uno y 10 en total (en IA el Impacto pesa 1,5 en el
  ranking). Impacto se escribe como cadena: salidas del proyecto →
  resultados para usuarios concretos → impactos esperados del topic, con
  indicadores. La dimensión de género y la ciencia abierta son subcriterios
  de Excelencia, no relleno.
- **AEI Generación de Conocimiento.** Calidad y viabilidad (la mitad de la
  nota en los no orientados), trayectoria del equipo e impacto, cada uno con
  umbral. La memoria sigue el Anexo VII (justificación y novedad; objetivos,
  metodología y plan de trabajo; impacto). Los proyectos de 100 000 € o más
  de costes directos van en inglés.
- **Ramón y Cajal y Juan de la Cierva.** Pesan sobre todo las aportaciones
  del candidato (y en RyC la independencia y el liderazgo). La memoria de
  RyC debe mostrar una línea propia, no la continuación del grupo de
  acogida.
- **GVA (CIPROM, CIGE, CIDEGENT/GenT).** En CIPROM y CIGE el grupo pesa más
  que el proyecto (60/40 en CIPROM; en CIGE el investigador principal pesa el
  50 %). Los CV van en CVN de la FECYT.

## Paso 4: piezas que se repiten

- **Plan de trabajo.** Paquetes de trabajo con objetivo, tareas, entregables
  e hitos fechados; un cronograma (Gantt en R o tabla); dependencias
  explícitas entre paquetes.
- **Riesgos.** Tabla riesgo | probabilidad | impacto | mitigación, y puntos
  de decisión (go/no-go) con criterio medible y alternativa.
- **Presupuesto.** Para cada partida: necesidad (qué tarea la exige),
  cálculo (unidades × coste), categoría de la convocatoria y asignación al
  paquete de trabajo. Comprueba los costes indirectos fijos (25 % en Horizon
  Europe y en PGC 2026; 21 % en CNS 2025) y los topes de subcontratación.
- **CV narrativo.** Contribuciones concretas con su efecto, no listas de
  méritos. Los diez resultados del ERC, la trayectoria del CVA de la AEI y
  el historial de grupo de la GVA siguen esta misma lógica.

Mientras redactas, deja marcas visibles en lugar de inventar:
`[DATO NECESARIO]`, `[CITA NECESARIA]`, `[DATOS PRELIMINARES NECESARIOS]`
y `[PREOCUPACIÓN DEL EVALUADOR SIN RESPONDER]` (en inglés,
`[PRELIMINARY DATA NEEDED]` y `[REVIEWER CONCERN UNADDRESSED]`).
Enuméralas al usuario al entregar.

## Anti-patrones que los paneles castigan

Objetivos que son actividades ("realizar RNA-seq") en lugar de preguntas o
resultados. Estado del arte enciclopédico que no termina en el hueco que
cubre el proyecto. Novedad afirmada sin decir frente a qué. Metodología sin
tamaños de muestra, controles ni análisis de potencia. Impacto genérico
("beneficiará a la sociedad") sin usuarios ni indicadores. Paquetes de
trabajo que repiten los objetivos sin entregables. Riesgos triviales con
mitigaciones vagas. Presupuesto sin relación con las tareas. Datos
preliminares que no apoyan la hipótesis concreta. Copiar frases del topic o
de la convocatoria como si fueran propias. Superar el límite de páginas
apurando márgenes o tamaño de letra fuera de lo permitido.

## Paso 5: simulación del panel

Cuando el borrador esté completo, evalúalo como lo haría el panel:

1. Puntúa cada criterio y subcriterio con la escala real de la convocatoria
   (A/B/C en ERC; 0 a 5 en MSCA y Horizon Europe; los puntos y umbrales de
   la AEI o la GVA).
2. Escribe, para cada criterio, los puntos fuertes y débiles en el estilo de
   un informe de evaluación real: frases cortas que citan la página.
3. Señala qué debilidades bajan la nota por debajo de un umbral y qué
   cambio concreto las corregiría.
4. Haz un segundo evaluador escéptico, de un campo vecino, que busque lo que
   no se entiende fuera de la especialidad.

Esta simulación orienta al usuario; no predice el resultado y debe decirse
así.

## Resubmisión

Comprueba primero si está permitida (restricciones del ERC por resultados
B o C en el paso 1; en MSCA, menos del 80 % impide presentar al año
siguiente). Después construye la matriz:

| Comentario del evaluador (cita) | Criterio | ¿Válido? | Cambio hecho | Dónde |
|---|---|---|---|---|

Responde a cada comentario con un cambio en el texto, no con una
justificación. Si la convocatoria no admite carta de respuesta (ERC, MSCA,
AEI), los cambios deben verse en la propia propuesta. Para respuestas
formales a un informe (alegaciones a la AEI), usa `reviewer-response`.

## Antes de entregar

1. Matriz de cumplimiento revisada línea a línea, con el recuento de páginas
   del PDF final (`pdfinfo`) y el formato exigido.
2. Pasada de `estilo-humano`, incluido `grep -n '—'` vacío.
3. Lista de marcas pendientes y de datos de la convocatoria que no se han
   podido verificar en el texto oficial.

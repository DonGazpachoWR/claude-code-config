---
name: bases-datos-ciencia
description: Herramientas de consulta a bases de datos biológicas y bibliográficas (STRING, Reactome, PubMed, Europe PMC, OpenAlex, Open Targets, ENCODE cCREs, UniProt, Ensembl, QuickGO, OLS, gnomAD), adaptadas de google-deepmind/science-skills. Cárgala desde modo-investigacion cuando una consulta a alguna de estas fuentes necesite paginación, trabajos asíncronos, GraphQL o límites de tasa que con curl serían engorrosos.
---

# Bases de datos científicas

Doce herramientas de línea de comandos adaptadas de [google-deepmind/science-skills](https://github.com/google-deepmind/science-skills) v1.2.4 (código Apache-2.0, documentación CC-BY 4.0; ver `LICENSE-deepmind` y `SKILL_LICENSES.md`). Cada una vive en `herramientas/<nombre>/` con su `GUIDE.md` (instrucciones en inglés), `scripts/` y `references/`. Antes de usar una herramienta, lee su `GUIDE.md`; abre las `references/` solo si la guía lo pide para tu consulta.

## Índice

| Herramienta | Para qué | Notas |
|---|---|---|
| `string-database` | Interacciones proteína-proteína, redes, enriquecimiento GO/KEGG, enriquecimiento por rangos de una lista completa de logFC | Mapea primero los nombres a IDs de STRING |
| `reactome-database` | Análisis de sobrerrepresentación y de expresión, jerarquía de rutas, participantes | `--summary` para salidas grandes |
| `pubmed-database` | Búsqueda, resúmenes, texto completo de PMC (BioC), enlaces a Gene/Protein, emparejado de citas, history server | `NCBI_API_KEY` opcional (3 → 10 peticiones/s) |
| `literature-search-europepmc` | Búsqueda en acceso abierto, texto completo, grafo de citas y referencias | Filtra siempre por acceso abierto |
| `literature-search-openalex` | Obras, autores, instituciones, temas, bibliometría agregada | Sin clave: presupuesto de ~0,10 USD/día (búsqueda 0,001; filtro 0,0001). Prefiere `filter` a `search` y usa `--select` |
| `opentargets-database` | Asociaciones diana-enfermedad, L2G, credible sets, tractabilidad (GraphQL) | |
| `encode-ccres-database` | Elementos reguladores candidatos (SCREEN) y portal ENCODE | |
| `uniprot-database` | Búsqueda, entradas, mapeo de identificadores (trabajos asíncronos), SPARQL | |
| `ensembl-database` | Resolución de IDs con sinónimos, transcritos MANE/canónicos, TSS, exones, VEP con plugins | |
| `quickgo-database` | Anotaciones GO, jerarquía de términos, GO slims, códigos ECO | |
| `embl-ebi-ols` | Términos y jerarquías de ontologías (GO, HP, UBERON, CL, EFO) para armonizar metadatos | |
| `gnomad-database` | Frecuencias alélicas, restricción génica (pLI, LOEUF), variantes por región | Límite estricto de 10 peticiones/min |

## Prerrequisitos comunes

Sustituyen a la sección *Prerequisites* de cada guía original.

- Los scripts se ejecutan con `uv run <ruta absoluta al script> ...`; `uv` ya está instalado en `~/.local/bin/uv`. Las dependencias se declaran en la cabecera PEP 723 de cada script; `polite-http` está fijado a la versión auditada 0.1.3. No instales paquetes en el Python del sistema.
- Las claves son opcionales y se leen de `~/.env`: `NCBI_API_KEY`, `USER_EMAIL` (PubMed) y `OPENALEX_API_KEY`. Si una consulta masiva lo justifica, sugiere al usuario que las añada él mismo a `~/.env` con `chmod 600`; nunca le pidas que pegue una clave en el chat.
- No crees archivos `.licenses/` ni avises en cada respuesta de que se ha usado la herramienta. Sí cita la fuente de los datos (base de datos, versión si consta, URL o identificador) como exige el modo investigación.

## Cuándo usar el script y cuándo curl

Usa el script cuando aporte algo sobre la API directa: paginación con cursor, trabajos asíncronos (mapeo de UniProt, enriquecimiento de STRING), consultas GraphQL (Open Targets, ENCODE, gnomAD), control de límites de tasa entre procesos o salida compacta a archivo. Para una consulta puntual que el script no cubre, o para fuentes que no están aquí (GEO, SRA, ENA, GTEx, TCGA/GDC, Semantic Scholar), sigue usando curl con jq como indica `modo-investigacion`, respetando los límites de tasa de cada servicio.

Los scripts escriben a archivo con `--output` (o un argumento equivalente); escribe esas salidas en el directorio de trabajo o en el scratchpad y filtra con jq antes de que lleguen al contexto. Si delegas consultas masivas a `haiku-researcher`, pásale la ruta absoluta del script y de su `GUIDE.md`.

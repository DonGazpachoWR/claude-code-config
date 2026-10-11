# claude-code-config

Configuración personal de Claude Code para investigación en biología de
sistemas y bioinformática (I2SysBio, CSIC-UV). El repositorio es el propio
directorio `~/.claude`, filtrado por un `.gitignore` de lista blanca: solo se
versionan las instrucciones, los agentes, las skills, los plugins locales y
`settings.json`. El historial, las sesiones, las credenciales, la memoria y
los datos personales no salen de la máquina.

## Modos de trabajo

`CLAUDE.md` hace que Claude elija un modo con el primer mensaje de cada
conversación y lo anuncie en la primera línea. El modo investigación
(`skills/modo-investigacion`) sirve para ideas, literatura, bases de datos y
viabilidad: Opus formula la pregunta y juzga, y la lectura masiva se reparte
entre subagentes baratos, con la regla de no citar ningún identificador que no
se haya visto en una fuente durante la sesión. El modo implementación
(`skills/modo-implementacion`) cubre código y pipelines, con puntos de control
en lugar de un revisor externo, un protocolo de interrogatorio antes de
cambiar interfaces (`interrogatorio.md`) y otro de diagnóstico cuando un error
se repite (`diagnostico-bugs.md`). El modo redacción (`skills/modo-redaccion`)
se activa solo mientras se escribe un documento Quarto (`.qmd`) y después
devuelve la conversación al modo anterior. Los correos y las respuestas del
chat van en modo normal, sin skill.

## Delegación y eficiencia

Los tres agentes de `agents/` reparten el trabajo según el coste. `haiku-worker`
hace tareas mecánicas (barridos de archivos, boilerplate, ejecutar tests y
resumir su salida); `haiku-researcher` lee páginas y papers y consulta APIs
públicas, y devuelve cada dato con su fuente; `opus-fallback` repite lo que
Haiku no resuelve bien y se encarga de lo que exige juicio. El cómputo pesado
se manda al clúster Garnatxa de la Universitat de València por SSH.

Dos plugins locales escritos en TypeScript, en `mods/`, ahorran contexto y
tokens. `context-guard` compacta la conversación tras 15 minutos de
inactividad y, al superar el 60 % del contexto o 250 000 tokens, pide un
informe de traspaso, limpia la conversación y la retoma desde ese informe.
`diagram-toggle` añade `/diagram activate|deactivate`, que activa o desactiva
el plugin externo diagram-design sin llamar al modelo. Ambos se cargan desde
`settings.json` con `CLAUDE_CODE_PLUGIN_DIRS` y tienen sus tests en
`mods/*/tests/`. `settings.json` también desactiva varias skills de Anthropic
que no se usan, para que no ocupen la lista de skills de cada sesión.

## Estilo

`guia-estilo-codigo.md` fija las reglas para Python, R y Bash: un único
`return`, tipos explícitos, documentación de cada función, cabecera de
archivo y, en código ajeno, diffs mínimos que respetan el flujo de la
herramienta. Para la prosa, `skills/estilo-humano` reúne en español y en
inglés las marcas de texto generado por IA (vocabulario, estructuras como "no
solo… sino también", tríadas, gerundios de posterioridad, cautelas apiladas)
y prohíbe la raya larga en los dos idiomas. Sus reglas mandan sobre las de las
demás skills de redacción. En Git y GitHub, Claude nunca figura como coautor:
lo prohíbe `CLAUDE.md` y `settings.json` deja vacía la atribución de commits
y pull requests (`attribution`). La lista inglesa procede de fuentes publicadas; la
española es propia y todavía no está validada con textos reales.

## Skills

Las skills propias son los tres modos, `estilo-humano`, `european-grants`
(convocatorias ERC, MSCA, Horizon Europe, AEI y GVA, con una referencia
fechada de criterios y límites que siempre debe contrastarse con la
convocatoria vigente), `bases-datos-ciencia` (una skill paraguas que agrupa
herramientas para bases de datos científicas), `cuestionario` (convierte una
decisión que no es del usuario en un cuestionario para quien deba tomarla) y
`defensa` (examina al usuario sobre su propio trabajo antes de defenderlo).

Las demás son adaptaciones de repositorios publicados, revisadas antes de
instalarlas. Cada una conserva su licencia original y lleva una nota de
adaptación local al principio. La tabla siguiente resume su origen y los
cambios principales.

| Skill | Origen | Licencia | Cambios |
|---|---|---|---|
| `bases-datos-ciencia` | [google-deepmind/science-skills](https://github.com/google-deepmind/science-skills) | Apache-2.0 y CC-BY 4.0 | 11 herramientas más OpenAlex reunidas bajo una sola skill; prerrequisitos comunes; dependencia `polite-http` fijada |
| `sciwrite-prose`, `sciwrite-manuscript` | [dvdsosa/scientific-writing-skills](https://github.com/dvdsosa/scientific-writing-skills) | MIT (con NOTICE de Stanford) | sin raya larga ni regla de tres; salida en prosa; corrección de `prose_audit.py` |
| `peer-review`, `citation-management`, `latex-posters` | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | MIT | sin autocita, sin scraping de Google Scholar ni generación de imágenes por servicios de pago; `lint_review.py` más permisivo |
| `reviewer-response` | [Marazii/research-co-pilot](https://github.com/Marazii/research-co-pilot) | MIT | idioma y alegaciones de la AEI; sin dependencias de otras skills del repositorio original |

`estilo-humano` y `european-grants` toman además ideas, no texto, de
[machinemade-mm/humanmade-antislop](https://github.com/machinemade-mm/humanmade-antislop),
de Life-Atlas `horizon-proposal-analyzer` y de las skills anteriores.

## Esquema

`docs/index.html` es una página autocontenida con un diagrama de toda la
configuración y una explicación de cada modo, comando y skill.

## Datos personales

`CLAUDE.md` importa `~/.claude/personal.md`, que no se versiona y guarda los
datos que no deben ser públicos (por ejemplo, la cuenta de Google para las
herramientas de Workspace). Las claves de API opcionales de
`bases-datos-ciencia` se leen de `~/.env` y tampoco forman parte del
repositorio. El usuario del clúster que aparece en los agentes y en los modos
no es una credencial: el acceso depende de claves SSH que no están aquí.

## Instalación

Para usar esta configuración en otra máquina, clona el repositorio como
`~/.claude` (o copia sus archivos a un `~/.claude` existente), crea tu propio
`personal.md` y revisa las rutas absolutas de `settings.json` y de
`mods/diagram-toggle/hooks/register.ts`. `bases-datos-ciencia` necesita
[uv](https://docs.astral.sh/uv/), y el modo redacción, Quarto con un motor de
LaTeX.

```bash
git clone https://github.com/DonGazpachoWR/claude-code-config.git ~/.claude
printf '# Datos personales (no versionado)\n' > ~/.claude/personal.md
chmod 600 ~/.claude/personal.md
```

# Diagnóstico de bugs difíciles

Adaptado de `diagnosing-bugs` (github.com/mattpocock/skills, licencia MIT).

Disciplina para bugs que no se resuelven con una primera lectura del código: errores que se repiten, salidas que dejan de coincidir con la versión anterior, regresiones de rendimiento. No te saltes fases salvo que lo justifiques explícitamente.

Antes de empezar, lee la memoria del proyecto y las notas de trabajo pendientes (p. ej. `pendiente_*.md`): suelen recoger decisiones recientes que explican por qué el código hace lo que hace.

## Fase 1: construir un bucle de realimentación

**Esta es la fase importante.** Si tienes una señal de pasa/falla ajustada (que se ponga en rojo con *este* bug), encontrarás la causa; bisección, hipótesis e instrumentación solo la consumen. Si no la tienes, mirar el código no la sustituye. Dedica aquí un esfuerzo desproporcionado.

### Formas de construirlo, aproximadamente en este orden

1. **Test que falla** (pytest, testthat) en el punto del código que alcanza el bug.
2. **Ejecución del módulo o script sobre un fixture pequeño** (un cromosoma, unos pocos genes o isoformas) comparando la salida con una de referencia conocida.
3. **Bucle diferencial**: la misma entrada por el commit anterior y el actual (o por dos configuraciones) y `diff` de las salidas. Es la comparación IDENTICO / NO IDENTICO, pero en pequeño. Para tener el código antiguo sin tocar el árbol de trabajo, usa `git worktree add` o `git archive <commit>`.
4. **Bisección**: si el bug apareció entre dos commits conocidos, automatiza la comprobación y usa `git bisect run`.
5. **Arnés desechable**: llama directamente a la función sospechosa con una tabla o DataFrame mínimo construido a mano.
6. **Comprobación de propiedades**: invariantes que deben cumplirse siempre (p. ej. que el reparto de cuentas conserve el total por gen, que no aparezcan NaN, que el número de filas no cambie), probados sobre muchas entradas.

### Datos grandes y Garnatxa

El bucle debe tardar segundos o pocos minutos y ejecutarse en local. Si el fallo solo se ve con los datos completos en Garnatxa, la primera tarea es localizar en su salida los genes, isoformas o filas afectados, traerlos (`scp -O`) y construir con ellos un fixture local que reproduzca el fallo. Lanza en Garnatxa solo la comprobación final sobre los datos completos.

### Ajustar el bucle

Una vez que tengas *un* bucle, mejóralo: hazlo más rápido (menos datos, saltarse etapas que no intervienen), con una señal más precisa (comprueba el síntoma concreto, no «no ha fallado») y determinista. Antes de sospechar de la lógica, descarta las fuentes habituales de falso no determinismo: semillas aleatorias sin fijar, orden de filas, tolerancia de coma flotante, finales de línea `\r\n` en cabeceras CSV y diferencias de versión de dependencias.

Si el fallo es intermitente, el objetivo no es una reproducción limpia sino una tasa de reproducción alta: repite el disparador muchas veces o en paralelo hasta que falle con frecuencia suficiente para depurarlo.

### Si no puedes construir un bucle

Dilo explícitamente, enumera lo que has probado y pide al usuario lo que falte: acceso a los datos que lo reproducen, un log o una salida concreta, o permiso para añadir instrumentación temporal. **No pases a hipótesis sin bucle.**

### Criterio de fin de fase

Puedes nombrar **un comando** (script, invocación de test) que **ya has ejecutado** (muestra la invocación y su salida filtrada) y que es:

- [ ] **Capaz de ponerse en rojo**: recorre el código del bug y comprueba el síntoma exacto que describió el usuario.
- [ ] **Determinista**: mismo veredicto en cada ejecución (o tasa de fallo alta y estable).
- [ ] **Rápido**: segundos o pocos minutos.
- [ ] **Ejecutable sin intervención**.

Si te sorprendes leyendo código para construir una teoría antes de tener este comando, para: saltar directamente a una hipótesis es justo el error que esta disciplina evita.

## Fase 2: reproducir y reducir

Ejecuta el bucle y confirma que produce el fallo que describió el usuario, no otro cercano (bug equivocado, arreglo equivocado), que se repite en varias ejecuciones y que has capturado el síntoma exacto (mensaje de error, valores incorrectos, tiempo) para verificar luego el arreglo.

Después **reduce**: quita entradas, filas, opciones y pasos **de uno en uno**, volviendo a ejecutar el bucle tras cada corte, y quédate solo con lo imprescindible. Has terminado cuando quitar cualquier elemento restante hace que el bucle pase a verde. Un caso mínimo reduce las hipótesis posibles y se convierte en el test de regresión.

## Fase 3: hipótesis

Genera **3–5 hipótesis ordenadas** antes de probar ninguna; con una sola te anclas a la primera idea plausible. Cada una debe ser falsable:

> «Si la causa es <X>, entonces <cambiar Y> hará desaparecer el fallo / <cambiar Z> lo empeorará.»

Si no puedes formular la predicción, descártala o concrétala.

**Muestra la lista ordenada al usuario antes de probarla.** Suele saber qué ha cambiado recientemente o qué hipótesis ya descartó. Si no responde, sigue con tu orden.

## Fase 4: instrumentar

Cada sonda corresponde a una predicción de la fase 3. **Cambia una sola variable cada vez.**

1. Depurador o inspección interactiva (`pdb`, `breakpoint()`, `browser()` en R) cuando sea posible.
2. Logs selectivos en los puntos que distinguen entre hipótesis.
3. Nunca «loguearlo todo y hacer grep».

**Marca cada log de depuración** con un prefijo único, p. ej. `[DEBUG-a4f2]`, para poder borrarlos con un grep al final.

**Rendimiento**: los logs no sirven. Mide primero una línea base (`cProfile`, `line_profiler`, `/usr/bin/time -v` para memoria y tiempo) y después bisecta. Medir primero, arreglar después.

## Fase 5: arreglo y test de regresión

Escribe el test de regresión **antes del arreglo**, pero solo si hay un punto adecuado para él: uno donde el test reproduzca el patrón real del bug tal como ocurre en la llamada. Si el único punto disponible es demasiado superficial (un test unitario que no reproduce la cadena que causó el fallo), el test daría una falsa seguridad; en ese caso, anótalo como hallazgo y díselo al usuario.

Si existe ese punto:

1. Convierte el caso mínimo en un test que falla, en el directorio de tests del proyecto y siguiendo `~/.claude/guia-estilo-codigo.md`.
2. Comprueba que falla. Si forzaste el rojo modificando código o un fixture, haz `diff` contra una copia intacta para verificar que la modificación se aplicó.
3. Aplica el arreglo.
4. Comprueba que pasa.
5. Vuelve a ejecutar el bucle de la fase 1 sobre el escenario original, sin reducir.

## Fase 6: limpieza

Antes de dar el bug por resuelto:

- [ ] El escenario original ya no reproduce el fallo (bucle de la fase 1).
- [ ] El test de regresión pasa (o queda documentado por qué no hay un punto adecuado).
- [ ] No queda instrumentación `[DEBUG-...]` (compruébalo con grep).
- [ ] Los arneses y fixtures desechables están borrados o movidos a un sitio claramente marcado; un fixture pequeño que use el test de regresión se queda.
- [ ] Le has explicado al usuario qué hipótesis resultó correcta. No hagas commit sin que lo pida; si el arreglo va en un commit nuevo, la causa va en su mensaje, pero si va en un `fixup!` ese mensaje se pierde al hacer squash, así que basta con explicarla en el chat.

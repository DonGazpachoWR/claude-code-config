# Guía de estilo de código (Python, R, Bash)

Se aplica a todo el código que escribas o modifiques. El código (identificadores,
comentarios, docstrings, mensajes al usuario) va siempre en **inglés**.

## 1. Código existente (PR, cambios en una herramienta)
- Mantén el flujo de trabajo de la herramienta: no cambies la forma de
  ejecutarla, sus argumentos, el formato de entrada y salida ni el orden de
  las etapas, salvo que se pida explícitamente.
- Cada funcionalidad nueva va integrada en la etapa del flujo a la que
  pertenece: en el módulo que corresponda, llamada desde el punto lógico del
  pipeline y, si toca, ampliando la función que ya existe. No la añadas como
  una función suelta más, apilada con otras en la misma zona del archivo (al
  final, o en un bloque de «extras»), ni como un envoltorio por encima del
  flujo original.
- Copia las convenciones de la herramienta (nombres, formato de los
  docstrings, indentación, estructura) aunque no coincidan con la sección 2:
  dentro de un proyecto manda la coherencia. Aplica la sección 2 solo a lo
  nuevo que escribas, y siempre que no choque con el estilo de la
  herramienta.
- El diff debe ser mínimo: nada de reformatear ni renombrar código que no
  forma parte del cambio.

## 2. Código nuevo: reglas comunes a los tres lenguajes
- **Un único `return` por función**, al final. Guarda el resultado en una
  variable (p. ej. `result`) y devuélvela; nada de retornos tempranos ni de
  `return` dentro de bucles, condicionales o `try`. Lanzar un error para
  validar una entrada (`raise`, `stop()`, `exit 1` tras un mensaje) no
  cuenta como `return`.
- **Tipos explícitos de entrada y salida** en todas las funciones (en la
  firma si el lenguaje lo permite; si no, en la documentación, y además
  comprobados en el código).
- **Toda función documentada**: qué hace, sus parámetros, lo que devuelve y
  los errores que puede lanzar.
- **Cabecera de archivo** con nombre, propósito, versión, autor y fecha.
  Autor: `Adrian Berenguer-Agustí (I2SysBio-CSIC)`.
- Nombres descriptivos en `snake_case` (variables y funciones) y constantes
  en `UPPER_SNAKE_CASE`. Solo se admiten nombres cortos en los casos
  habituales (`i`, `j`, `k`, `n`); nunca `l`, `O` ni `I`.
- Comentarios en frases completas que expliquen el porqué o aclaren los
  bloques complejos; nunca repiten lo que hace una línea. Actualízalos
  cuando cambie el código.
- Robustez: valida las entradas (archivos, parámetros) y da mensajes de
  error claros. Captura solo errores concretos.
- Eficiencia: elige estructuras de datos adecuadas, vectoriza o usa
  búsquedas por clave en lugar de bucles anidados, y reduce la E/S al
  mínimo. Prefiere la legibilidad a una micro-optimización, salvo que el
  rendimiento sea crítico; en ese caso, coméntala.
- Organización: un punto de entrada `main`, funciones cortas con una sola
  responsabilidad, y lógica separada de la E/S.
- Líneas de 79–80 caracteres como máximo; una sentencia por línea.

## 3. Python (PEP 8)
- Anota todos los parámetros y la salida, incluido `-> None`. Usa genéricos
  modernos: `list[str]`, `dict[str, int]`, `str | None`.
- Docstrings estilo Google, siempre con `"""`. Los tipos van en la firma, no
  en el docstring. Pon `Returns:` y `Raises:` solo cuando corresponda:
  ```python
  def count_reads(bam_path: str, min_mapq: int = 20) -> int:
      """Count mapped reads above a mapping-quality threshold.

      Args:
          bam_path: Path to an indexed BAM file.
          min_mapq: Minimum mapping quality to keep a read.

      Returns:
          Number of reads that pass the threshold.

      Raises:
          FileNotFoundError: If bam_path does not exist.
      """
  ```
- Docstring de módulo al principio:
  ```python
  """
  file_name.py

  One-paragraph description of the purpose of the module.

  Version: 1.0
  Author: Adrian Berenguer-Agustí (I2SysBio-CSIC)
  Date: YYYY-MM-DD
  """
  ```
- Imports al principio, uno por línea, en tres grupos separados por una
  línea en blanco: biblioteca estándar, terceros, locales. Imports
  absolutos; nunca `import *`.
- Constantes a nivel de módulo, cada una con un comentario. Al final,
  `def main() -> None:` y `if __name__ == "__main__":`.
- Formato: 4 espacios; 79 caracteres (72 en docstrings y comentarios); para
  partir líneas, usa paréntesis antes que `\`, y corta antes del operador
  binario. Dos líneas en blanco entre funciones y clases de nivel superior;
  una entre métodos. Espacios alrededor de `=`, operadores aritméticos, de
  comparación y booleanos; sin espacios en `f(x=1)`, ni dentro de
  paréntesis, ni antes de `(`, `[`, `,` o `:`. No alinees los `=` con
  espacios extra.
- Clases en `CapWords`; prefijo `_` para lo interno.
- Nunca un `except:` desnudo, y dentro del `try` solo el código mínimo.
  `is` / `is not` para `None`; `isinstance()` en vez de comparar con
  `type()`; `if seq:` en vez de `len(seq)`; no compares con `True` ni
  `False`; `startswith()` / `endswith()` en vez de slicing; `"".join()` para
  concatenar en bucles.

## 4. R (tidyverse style + roxygen2)
- Documenta cada función con roxygen2. Como R no tiene anotaciones de tipo,
  el tipo se indica al principio de cada `@param` y de `@return`, y los de
  entrada se comprueban al principio del cuerpo:
  ```r
  #' Normalize a count matrix to counts per million.
  #'
  #' @param counts `matrix` (numeric). Raw counts, genes x samples.
  #' @param log `logical(1)`. Whether to return log2(CPM + 1).
  #' @return `matrix` (numeric). Normalized values, same dimensions.
  normalize_cpm <- function(counts, log = FALSE) {
    stopifnot(is.matrix(counts), is.numeric(counts), is.logical(log))
    result <- t(t(counts) / colSums(counts)) * 1e6
    if (log) {
      result <- log2(result + 1)
    }
    return(result)
  }
  ```
- Siempre un único `return(result)` explícito al final.
- Cabecera de archivo: bloque de comentarios `#` con file, purpose, version,
  author y date.
- `<-` para asignar; `TRUE`/`FALSE`, nunca `T`/`F`; 2 espacios; 80
  caracteres; `library()` al principio; nada de `setwd()`, `attach()` ni
  `rm(list = ls())` en los scripts; `seq_along()` / `seq_len()` en vez de
  `1:length(x)`; no hagas crecer vectores dentro de bucles: reserva memoria
  o vectoriza.

## 5. Bash (Google Shell Style Guide)
- `#!/usr/bin/env bash` y `set -euo pipefail`; después, la cabecera de
  archivo en comentarios (file, purpose, version, author, date).
- Cada función lleva un comentario de cabecera con los tipos de entrada y
  salida:
  ```bash
  #######################################
  # Trim adapters from a paired-end sample.
  # Globals:
  #   THREADS
  # Arguments:
  #   $1 - sample_id (string): Sample identifier.
  #   $2 - out_dir (path): Output directory, created if missing.
  # Outputs:
  #   Writes trimmed FASTQ files to out_dir; logs to stderr.
  # Returns:
  #   (int) 0 on success, non-zero on failure.
  #######################################
  trim_sample() {
    local sample_id="$1"
    local out_dir="$2"
    local status=0
    ...
    return "${status}"
  }
  ```
- Un único `return` al final (o ninguno). Los datos se devuelven por
  stdout; el estado, por el código de salida.
- Usa `local` en todas las variables de función; entrecomilla siempre
  (`"${var}"`); usa `[[ ]]` y `$(...)`; declara las constantes con
  `readonly`; manda los errores a stderr; usa 2 espacios y 80 caracteres;
  pon `main "$@"` al final. El script no debe dar avisos en `shellcheck`.

## 6. Antes de entregar
Revisa el código contra esta guía: un único `return`, tipos de entrada y
salida, documentación de cada función, cabecera del archivo y, en código
existente, flujo de trabajo intacto e integración en su sitio. Si hay
linters disponibles, ejecútalos (`ruff`/`flake8`, `lintr`, `shellcheck`).

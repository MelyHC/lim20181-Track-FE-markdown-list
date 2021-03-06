# Markdown Links 

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Esta librería se encargar de leer y analizar los archivos en formato `Markdown`, 
para verificar los links que contengan y reportar algunas estadísticas como ver los links totales, los únicos y los que estan rotos.

#### Versión

1.0.7

## Instalación

```
npm i --save-dev melyhc-md-links
```

## Uso en CLI

```
md-links <path> [options]
```
##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.

- `options`:
  - `--validate` o `-v`: Ingresando esta opción  se verificara el estado del link.
  - `--stats` o `-s`: Ingresando esta opción mostrara una estadística de la cantidad de links y los que son únicos.
  - Si combinamos ambas opciones mostrara un estadística de la cantidad de link, los que son únicos y de los que estan rotos.

##### Ejemplos de uso:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

```sh
$ md-links ./some/example.md -s -v
Total: 3
Unique: 3
Broken: 1
```

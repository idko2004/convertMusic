# convertMusic
Este es un programa que hice para convertir música de un formato a otro porque la radio del auto de mi padre solo acepta mp3 chotos y se reúsa a reproducir cualquier otra cosa y yo me rehúso a convertir toda mi música de a uno.

# Instalación
## Dependencias
```
ffmpeg
ls
node.js
```
## Cómo instalar
* Clonar el repositorio.
    * Con el botón de arriba que dice "Code" y luego "Download Zip".
    * Con git usando el enlace que también sale en el botón "Code", poniendo en una terminal "git clone" y el enlace.

# Cómo usar
### (Creo que sólo funciona en linux, pero no estoy seguro)
* Debe de haber un archivo llamado "config.json", si no existe debe crearlo. El archivo debe lucir así:
    ```
    {
        "inputFolder": "",
        "outputFolder": "",
        "targetFormat": "mp3"
    }
    ```
* En ``` "inputFolder": ``` debes poner la carpeta en la que tienes guardada la música que quieres convertir.
* En ``` "outputFolder": ``` debes poner la carpeta en la que quieres que se guarden los archivos convertidos.
* En ``` "targetFormat": ``` debes poner el formato al que quieres convertir la música.
* Para ejecutar el programa, abre una terminal en la carpeta donde tengas el programa y escribe ``` node main.js ``` o ``` npm start ``` (si tienes npm).
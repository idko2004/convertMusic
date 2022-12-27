const config = require('./config.json');
const {exec} = require('child_process');

let inputFolder;
let outputFolder;

let filesInFolder;

start();

async function start()
{
    addSlashToFolderPaths();

    filesInFolder = await readInputFolder();
    giveFilesToConvert();
}

function addSlashToFolderPaths()
{
    // Añade una / al final de la ruta de las carpetas en caso de que no las tengan.
    inputFolder = config.inputFolder;
    if(inputFolder[inputFolder.length - 1] !== '/') inputFolder += '/';

    outputFolder = config.outputFolder;
    if(outputFolder[outputFolder.length - 1] !== '/') outputFolder += '/';
}

function readInputFolder()
{
    // Obtiene una lista de todos los archivos que hay en la carpeta input
    return new Promise(function(resolve, reject)
    {
        exec(`ls -1 ${inputFolder}`, function(err, output)
        {
            if(err === null)
            {
                const dirSplit = output.split('\n');
                resolve(dirSplit);
            }
            else reject('command failed');
        });
    });
}

async function giveFilesToConvert()
{
    // Va pasando por cada archivo en la carpeta
    for(let i = 0; i < filesInFolder.length; i++)
    {
        if(filesInFolder[i].trim() !== '')
        {
            const inputFile = inputFilePath(filesInFolder[i]); // Obtiene la ruta completa del archivo de entrada
            const outputFile = generateOutputFilePath(filesInFolder[i]); // Genera la ruta completa para el archivo de salida
            
            console.log('--Converting file:', filesInFolder[i]);
            await convertFile(inputFile, outputFile); // Convierte el archivo
        }
    }
}

function inputFilePath(file)
{
    // Devuelve la ruta completa de un archivo de entrada a partir de su nombre
    return `${inputFolder}${file.trim()}`;
}

function generateOutputFilePath(inputFile)
{
    // Genera una ruta completa para el archivo de salida a partir de su nombre y la ruta de salida
    let outputName = '';
    const fileNameSplit = inputFile.trim().split('.');
    
    for(let i = 0; i < fileNameSplit.length - 1; i++)
    {
        outputName += fileNameSplit[i];
    }

    return `${outputFolder}${outputName}.${config.targetFormat}`;
}

function convertFile(inputFile, outputFile)
{
    // Convierte el archivo a través de ffmpeg
    return new Promise(function(resolve, reject)
    {
        exec(`ffmpeg -i "${inputFile}" "${outputFile}"`, function(err, output)
        {
            if(err === null)
            {
                console.log('File converted :D');
                resolve();
            }
            else reject();
        });
    });
}
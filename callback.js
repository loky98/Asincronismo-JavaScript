//es una funcion que se le pasa como parametro otra funcion

// suma de dos numeros con callbacks

function sum (num1, num2){
    return num1 + num2 ;
}

function calc (num1, num2, callback){
    return callback(num1, num2);
}

const valor = calc(4, 29, sum) ;

console.log( valor);

// imprimir la fecha  de ahora y 2 segundos despues con callbacks

function date (callback){
    console.log(new Date);
    setTimeout(() => {
         let date = new Date;
         callback(date);
    }, 2000);
}
function printDate (dateNow){
    console.log(dateNow);
}

const fecha = date(printDate);

console.log(fecha);

// consultar a la api de rick and morty con callbacks
// se instalo la herramienta de xmlhttprequest por estar usando solo achivos de JavaScript
// comando "npm install xmlhttprequest --save"

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function fetchData(url_api, callback){
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET',url_api,true)
    xhttp.onreadystatechange = (event) =>{
        if(xhttp.readyState === 4 ) {            // cuenta con 5 estados readyState
            if(xhttp.status === 200){            // 0=inicializado 1=cargando 2=cargado 3=descarga de informacion 4=finalizado
                callback(null, JSON.parse(xhttp.responseText));
            }
            else{
                const error = new Error ('Error ' + url_api);
                return callback (error, null)
            }
        }
    }
    xhttp.send();
}
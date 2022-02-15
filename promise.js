//promise  
// algo va a suceder!! haora, en elfuturo o nunca

const somethingWillHappen = ()=>{  //algo va ha pasar
    return new Promise((resolve, reject)=>{
        if(true){
            resolve('heyy');
        }
        else{
            reject('whoppsss');
        }
    })
}

somethingWillHappen ()
    .then(response => console.log(response))
    .catch(error => console.error(error))

const somethingWillHappen2 = ()=>{
    return new Promise((resolve, reject)=>{
        if(true){
            setTimeout(() => {
                resolve('esta funcion se ejecuto luego de 2 segundos')
            }, 2000);
        }
        else{
            const error = new Error('Error somethigWillHappen2') // forma adecu
            reject(error)
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(error => console.error(error))

Promise.all([somethingWillHappen2(),somethingWillHappen()])
    .then(response => console.log(response))
    .catch(error => console.error(error))



// consultar a la api de rick and morty con promises
// se instalo la herramienta de xmlhttprequest por estar usando solo achivos de JavaScript
// comando "npm install xmlhttprequest --save"

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const fetchData = (url_api)=>{
    return new Promise((resolve, reject)=>{
        const xhttp = new XMLHttpRequest()
        xhttp.open('GET', url_api, true)
        xhttp.onreadystatechange = (()=>{
            if(xhttp.readyState === 4){
                (xhttp.status === 200)
                ? resolve (JSON.parse(xhttp.responseText))
                : reject (new Error('Error en ',url_api))
            }
        })
        xhttp.send()
    })
}

const API ='https://rickandmortyapi.com/api/';

fetchData(API)
    .then((response)=>{
        return fetchData(response.characters)
    })
    .then((response)=>{
        console.log(response.info.count)
        return fetchData(API+'character/'+response.results[0].id)
    })
    .then((resolve)=> {
        console.log(resolve.id)
        console.log(resolve.name)
        return fetchData(resolve.origin.url)
    })
    .then((resolve)=> {
        console.log(resolve.dimension)
    })
    .catch(err => console.error(err))
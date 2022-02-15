// Async y Await se usa por encina de las promesas por que nos combierte nuestro codigo en asincrono 

const dosomethingAsync = () => {
    return new Promise ((resolve, reject)=>{
        (true)
            ? setTimeout(() => resolve('se resolviio'), 2000)
            : reject(new Error('error doSomethingAsync'))
    })
}

const functionAsync = async () => {
    const something = await dosomethingAsync()
    console.log('1',something)
}

console.log('primero 1')
functionAsync()
console.log('segundo 2')


const functionAsyncEroor = async () => {
    try{
        const something = await dosomethingAsync()
        console.log('2',something)
    }
    catch(error){
        console.error(error)
    }
}

console.log('primero 3')
functionAsyncEroor()
console.log('segundo 4')

// consultar a la api de rick and morty con async y await
// se instalo la herramienta de xmlhttprequest por estar usando solo achivos de JavaScript
// comando "npm install xmlhttprequest --save"

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const fetchaData = (url_api) => {
    return new Promise ((resolve, reject) => {
        const xhttp = new XMLHttpRequest()
        xhttp.open('GET', url_api,true)
        xhttp.onreadystatechange = (()=>{
            if(xhttp.readyState === 4){
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('error en fetchData'))
            }
        })
        xhttp.send()
    })
}

const API_URL = 'https://rickandmortyapi.com/api/'

const FunctionAsyncWithError = async (url_api) => {
    try{
        const pageApi = await fetchaData(url_api)
        const numberCharacters = await fetchaData(pageApi.characters)
        const info = await fetchaData(pageApi.characters+'/'+numberCharacters.results[0].id)
        const location = await fetchaData(info.origin.url)
        console.log(numberCharacters.info.count)
        console.log(info.id)
        console.log(info.name)
        console.log(location.dimension)
    }
    catch(error){
        console.error(error)
    }
}

FunctionAsyncWithError(API_URL)
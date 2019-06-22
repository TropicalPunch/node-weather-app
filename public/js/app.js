//
//console.log('client side app.js')

//lets use fetch func to get data dfrom the specified url
//then run response callback func, parse it with jason(),and log the data out

// fetch('http://localhost:3000/weather?address=israel').then((response)=>{
// response.json().then((data)=>{
//     if(data.error){
      
//     console.log(data.error) 
//     }else{
//         console.log(data.location)
//     }
// })
// })

///////connecting the search button in index.hbs to an action:
//first we will connect weatherForm to the form itself so we can manipulate it
const weatherForm = document.querySelector('form')

//now lets "grab" the value the user searched for
const search = document.querySelector('input') 

//now lets manipulate the index.hbs area were we see the forecast and location
//we dedicated 2 - <p> tags for it! with id=message-1/2
const messageOne = document.querySelector('#message-1')
//messageOne.textContent="Weather's location:"
const messageTwo = document.querySelector('#message-2')
//messageTwo.textContent='Forecast:'

const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

//addEventListener(argument1, argument2)
//argument1- a string with the name of the event we want to connect to
//argument2- is a callback function which will run each time we click the submit button
weatherForm.addEventListener('submit',(e/*event object*/)=>{
e.preventDefault()
//lets grab the users searched value:
const userLocation = search.value
//lets show a loding masage after the user clicked search
messageOne.textContent="loading..."
messageTwo.textContent='' 
messageThree.textContent='' 
messageFour.textContent='' 
console.log("submitting")
console.log(search.value)

fetch(`/weather?address=${userLocation}`).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=`something went wrong, ${data.error}`
        messageTwo.textContent=''
        messageThree.textContent='' 
        messageFour.textContent='' 
        console.log(data.error) 
    }else{
        messageOne.textContent=`Weather's location:${data.location}`
        messageTwo.textContent=`full forecast: ${JSON.stringify(data.forecast.summary)}`
        messageThree.textContent="temperature: "+JSON.stringify(data.forecast.temperature)+"°C" 
        messageFour.textContent="wind speed: "+JSON.stringify(data.forecast.windSpeed)+" Km/hr"
        console.log(data.location)
        console.log(data.forecast)
        
        

        
    }
})
})



})
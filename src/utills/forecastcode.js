const request = require('request')

//////////////darksky- forcast api==> with callback
//my key= 6214e230bdb41f73f4edd40d8b358f1c
const forecastcode = (lat,long , callback)=>{
    const url = 'https://api.darksky.net/forecast/6214e230bdb41f73f4edd40d8b358f1c/'+lat+','+long+'?units=si'
    request({/*url:*/url,json:true},(error,response)=>{

            //////lest destructure:(we can also do in function destructure=>  request({/*url:*/ url, json:true},(error,{body})=>{ )
            const{body}= response

        if(error){ //if error is true
            callback('ERROR 404: Unable to connect to server',undefined)
        
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
       
       callback(undefined,
        {
        timeZone:body.timezone,
        summary:body.daily.summary,
        temperature:body.currently.temperature,
        windSpeed:body.currently.windSpeed,
        windDirection:body.currently.windBearing
        })

    }})
    
}
module.exports = forecastcode


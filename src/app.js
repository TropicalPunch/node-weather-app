//
const express = require('express')
const path = require('path')
const hbs = require('hbs')
//connecting to location and forecast api

const geocode = require('./utills/geocode')
const forecastcode = require('./utills/forecastcode')




// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))


const app = express()


//in order to deploy on heroku:
const port= process.env.PORT || 3000

//////////define paths for express config:
//connect to index.html via browser loaclhost:3000/ xyz.html (in public folder)
const publicDirPath = path.join(__dirname,'../public')
//set views folder as templates(1/2):
const viewsPath = path.join(__dirname,'../templates/views')
//directing for partials folder:
const partialsPath = path.join(__dirname,'../templates/partials')
//////////////////////////////


/////////////////////// handlebars library for express setup

app.set('view engine','hbs')
////set views folder as templates!!!!(1/2)
app.set('views',viewsPath)
//config partials folder- all files from this folder can be rendered
hbs.registerPartials(partialsPath)

////////////////////////////////////////////////

//setup for a static directory to serve
app.use(express.static(publicDirPath))



//hbs---lest add a route so we can access from browser- index.hbs:
app.get('',(req,res)=>{
    res.render('index',{//object of deta to pass
        title:'my weather app',
        name: 'ori s.'
    })
})

//hbs---lest add a route so we can access from browser- about.hbs:
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        about: 'This is a weather app'
    })
})

//hbs---lest add a route so we can access from browser- help.hbs:
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText: 'we use express, hbs, with weather api'
    })
})



//lest add a route: /weather
app.get('/weather',(req,res)=>{
  
    if(!req.query.address){
        return res.send({
            error:'enter a forecast location'
        })
    }
//////////////////code for getting data from weather and location api's copied from app.js =>weather app with some changes
   
    

   //calling geocode function from geocode.js
   geocode(req.query.address,(error,{ lat, long, location }={})=>{ //////lest destructure=> in function destructure: before it was: (error,data)
    console.log(req.query.address)
    
       if(error){
           //if return shall operate the other function wont operate , shorter syntax than using else!!!
           return res.send({error}/*error: error*/)//console.log(error)
       }
       
       //console.log(error,data)

       //calling forecastcode function from forecastcode.js
       forecastcode(lat,long,(error,forecastData)=>{
           if(error){
               //if return shall operate the other function wont operate , shorter syntax than using else!!!
           return res.send({error}/*error: error*/)  //console.log(error)
           }
           //data.location=> is from geocode data

           console.log("today's weather in",location,':',forecastData)
           res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        })
       })
///////////////////////////
       
   })
})



//lest add a route: /help/**** 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg:'Article does not exists'
    })
})


//lest add a route: /404error
app.get('*',(req,res)=>{
    res.render('error',{
       errorMsg:'ERROR 404-Page does not exists'
    })
})


//deploy with listen method:
app.listen(port,()=>{//3000 is dev port num 80 is for production
    console.log('server is running on 3000 or hirokus port:' + port)
})

// app.get('',(req,res)=>{
//     res.send('<h1>this is the main page<h1>')
// })

//lest add a route: /help
// app.get('/help',(req,res)=>{
//     res.send('<h1>this is the help page<h1>')
// })

// //lest add a route: /about
// app.get('/about',(req,res)=>{
//     res.send('<h1>this is the about page<h1>')
// })

//




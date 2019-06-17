const request = require('request')


//////////////mapbox- geolocation api==> with callback
//my key= pk.eyJ1Ijoib3Jpc3MiLCJhIjoiY2p0cHB2Z3huMDRjdTQ0cThsZjB1eDIwaSJ9.k0v1OCx_ucQMdQdVuWXIcg

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib3Jpc3MiLCJhIjoiY2p0cHB2Z3huMDRjdTQ0cThsZjB1eDIwaSJ9.k0v1OCx_ucQMdQdVuWXIcg'
    request({/*url:*/ url, json:true},(error,response)=>{
       
        //////lest destructure:(we can also do in function destructure=>  request({/*url:*/ url, json:true},(error,{body})=>{ )
        const{ body }= response

        if(error){
            //error:v data:x
            callback('ERROR 404: Unable to connect to location server',undefined)
        }else if(body.features.length === 0){
            //error:v data:x
            callback('ERROR 400: unknown location',undefined)
        }else{
            //error:x data:v
            callback(undefined,
                //for data:
            { long: body.features[0].center[0],
              lat: body.features[0].center[1],
              location: body.features[0].place_name
            }
            )
        }
        
        })
}

module.exports = geocode
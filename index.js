'use strict';
const axios = require('axios');
const cors = require('cors');
/**
 * Makes axios call
 * @param {url} string
 * @param {params} value
 *
*/

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
   
const ourCors = cors(corsOptions);
  

axios.interceptors.request.use( function(config){
    config.metadata = {
        startTime: Date.now()
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
// post request
axios.interceptors.response.use( function(response){
    response.config.metadata.endTime = Date.now()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
}, function(error){
    return Promise.reject(error);
})

module.exports.get = function(url){
    axios.get(url).then( function(res){
        console.log(res.data)
        console.log(res.status)
        console.log(`response time ${res.duration}`)
    }).catch( function(err) {
        console.log(err)
    })

}

module.exports.delete = function(url){
    axios.delete(url)
        .then( function(res){
            console.log(res.data);
            console.log(res.status)
            console.log(`response time ${res.duration}`)
        }).catch( function(err){
            console.log(err);
        });
}

module.exports.put = function(url, params){
    axios.put(url, {...params})
        .then( function(res) {
                console.log(res.data);
                console.log(res.status)
                console.log(`response time ${res.duration}`)
        }).catch( function(err) {
            console.log(err)
        })   
}

module.exports.post = function(url, params){
    axios.post(url, {...params})
         .then( function(res) {
                console.log(res.data);
                console.log(res.status)
                console.log(`response time ${res.duration}`)
        }).catch( function(err) {
            console.log(err)
        })    
}

// module.exports.getData = function(url, method, params){
//     if(method === 'GET'){
//         // pre request
       
//         // axios call 
//         axios.get(url).then( function(res){
//             console.log(res.data)
//             console.log(res.duration)
//         });
//     }
//     else if(method === "POST"){
//         // pre request
//         axios.interceptors.request.use( function(config){
//             config.metadata = {
//                 startTime: Date.now()
//             }
//             return config
//         }, function (error) {
//             return Promise.reject(error)
//         })
//         // post request
//         axios.interceptors.response.use( function(response){
//             response.config.metadata.endTime = Date.now()
//             response.duration = response.config.metadata.endTime - response.config.metadata.startTime
//             return response;
//         }, function(error){
//             return Promise.reject(error);
//         })

//         axios.post(url, {...params})
//                 .then( function(res) {
//                     console.log(res.data);
//                     console.log(res.duration)
//         })
//     }
// }

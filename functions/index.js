const functions = require('firebase-functions')
const {
  Nuxt
} = require('nuxt')
const express = require('express')
const port = 3000
const {
  google
} = require('googleapis')
const request = require('request')
const cors = require('cors')
const urlParse = require('url-parse')
const queryParse = require('query-string')
const bodyParser = require('body-parser')
const axios = require('axios')

const admin = require('firebase-admin');

admin.initializeApp();

const app = express()

const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: '/public/'
  }
}

const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.nuxtssr = functions.region('europe-west1').https.onRequest(app)
// exports.nuxtssr = functions.region('europe-west1').https.onRequest(app)

exports.getFitData = functions.region('europe-west1').https.onRequest(async (request, response) => {
  console.log('yes')
  response.send("Hello from Firebase!");
//   var calories, frequences;
//   app.use(cors())
//   app.use(bodyParser.urlencoded({
//     extended: true
//   }))
//   app.use(bodyParser.json())

//   app.get("/getUrlTing", (req, res) => {
//   const oauth2Client = new google.auth.OAuth2(
//     //client id
//     '329953458846-g91hdj53b2ojs8ck775r7h77c98tm5ql.apps.googleusercontent.com',
//     //client secret
//     'C-4DybcdMnORlveADEuoDaXn',
//     // link to redirect
//     "http://localhost:5000/test"
//   )
//   const scopes = ["https://www.googleapis.com/auth/fitness.heart_rate.read", "https://www.googleapis.com/auth/fitness.activity.read"]

//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//     state: JSON.stringify({
//       callbackUrl: req.body.callbackUrl,
//       userID: req.body.userid
//     })
//   })

//   request(url, (err, response, body) => {
//     console.log("error: ", err)
//     console.log("statCode: ", response && response.statusCode)
//     res.send({
//       url
//     })
//   })
// })

// app.get('/test', async (req, res) => {
//   const queryURL = new urlParse(req.url)
//   const code = queryParse.parse(queryURL.query).code
//   const oauth2Client = new google.auth.OAuth2(
//     //client id
//     '329953458846-g91hdj53b2ojs8ck775r7h77c98tm5ql.apps.googleusercontent.com',
//     //client secret
//     'C-4DybcdMnORlveADEuoDaXn',
//     // link to redirect
//     "http://localhost:5000/test"
//   )
//   var stepArray = []
//   const tokens = await oauth2Client.getToken(code)
//   // console.log(tokens.tokens.access_token)
//   res.send(tokens)
//   try {
//     const result = await axios({
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + tokens.tokens.access_token
//       },
//       "Content-Type": "application/json",
//       url: `https://www.googleapis.com/fitness/v1/users/me/dataSources`,
//     })
//     let dataSource = result.data.dataSource
//     dataSource.forEach(async data => {
//       if (
//         data.dataType.name == "com.google.calories.expended" ||
//         data.dataType.name == "com.google.heart_rate.bpm") {
//         const dataType = data.dataType.name
//         // console.log(data.dataType.name)
//         // console.log(data.dataStreamId)
//         try {
//           const dataSet = await axios({
//             method: 'POST',
//             headers: {
//               'Authorization': 'Bearer ' + tokens.tokens.access_token
//             },
//             "Content-Type": "application/json",
//             url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
//             data: {
//               aggregateBy: [{
//                 dataTypeName: data.dataType.name,
//                 dataSourceId: data.dataStreamId,
//               }],
//               bucketByTime: {
//                 durationMillis: 1402000 //86400000 jour
//               },
//               startTimeMillis: 1623676620000,
//               endTimeMillis: 1623678022000
//             }
//           })
//           let d = dataSet.data.bucket
//           // console.log(d)
//           d.forEach(data => {
//             // console.log(data.dataset)
//             data.dataset.forEach(ds => {
//               // console.log(ds.point)
//               ds.point.forEach((point) => {
//                 // console.log(point.value, index)
//                 // console.log(dataType)
//                 point.value.forEach(val => {
//                   if (dataType == "com.google.calories.expended") {
//                     calories = val
//                   }
//                   if (dataType == "com.google.heart_rate.bpm") {
//                     frequences = val
//                   }
//                   // if (index === 0) {
//                   console.log(val)
//                   // moy.push(val.fpVal)
//                   // }
//                   // res.send(console.log(val.fpVal))
//                 });
//                 // frequences.push(moy)
//               });
              
//             })
//           });
//         } catch (e) {
//           console.log(e)
//         }
//       }
//     });
//     // console.log(frequences)
//     // var stepArray = result.data.bucket
//     console.log(calories);
//     console.log(frequences);
//     res.send(calories)
//   } catch (e) {
//     console.log(e)
//   }
//   // try {
//   //   // console.log(stepArray)
//   //   // for (const dataSet of stepArray) {
//   //   //   console.log(dataSet)
//   //   // }
//   // } catch (e) {
//   //   console.log(e)
//   // }
//   // await console.log("calories", calories);
// })
})

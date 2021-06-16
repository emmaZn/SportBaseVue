const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')

const app = express()

const config = {
  dev: false,
  buildDir:"nuxt",
  build:{
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
const admin = require('firebase-admin');

admin.initializeApp();

const auth = admin.auth();

/**
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 * @param {Object} req Express Request Object.
 * @param {Object} res Express Response Object
 */
const getAllUsers = (req, res) => {
  const maxResults = 1; // optional arg.

  auth.listUsers(maxResults).then((userRecords) => {
    userRecords.users.forEach((user) => console.log(user.toJSON()));
    res.end('Retrieved users list successfully.');
  }).catch((error) => console.log(error));
};


exports.users = functions.region('europe-west1').https.onRequest(getAllUsers)

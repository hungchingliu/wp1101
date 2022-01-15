import { ApolloServer } from  "apollo-server-express"
import {importSchema} from "graphql-import"
import Query from "./resolvers/Query.js"
import Mutation from "./resolvers/Mutation.js"
import SpotifyWebApi from "spotify-web-api-node"
import cors from "cors"
import bodyParser from "body-parser";
import userModel from "./models/user.js"
import "dotenv-defaults/config.js"
import mongo from "./mongo.js"
import http from "http"
import path from "path"
import { dirname } from "path"
import { fileURLToPath, pathToFileURL} from "url"
import express from "express"
const typeDefs = importSchema("./backend/schema.graphql");
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000"
const __dirname = dirname(fileURLToPath(require('url').pathToFileURL(__filename).toString()))

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    context:{
        userModel
    }
})
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.post("/auth", (req, res) => {
    console.log("-----auth-----")
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: REDIRECT_URI
    })

    const userJSON = {}

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        userJSON['expiresIn'] = data.body['expires_in']
        userJSON['accessToken'] = data.body['access_token']
        userJSON['refreshToken'] = data.body['refresh_token']
        //retrieve the current user's info
        spotifyApi.setAccessToken(data.body['access_token']);
        return spotifyApi.getMe();
    })
    .then(data => {
        userJSON['userId'] = data.body['id'];
        userJSON['name'] = data.body['display_name'];
        userJSON['email'] = data.body['email'];

        const image = data.body.images[0].url;
        userJSON['image'] = image;
        userJSON['product'] = data.body['product'];
        console.log(userJSON)
        res.status(201).send(userJSON);
    })
    .catch(err => {
        res.status(500).send(err);
      })
    
    
})

app.post('/refresh', (req, res) => {
    console.log("-----refresh-----")
    const refreshToken = req.body.refreshToken;
  
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
      refreshToken
    })
  
    spotifyApi.refreshAccessToken()
      .then(data => {
        console.log('The access token has been refreshed!');
        res.status(201).json({
          accessToken: data.body.access_token,
          expires_in: data.body.expires_in
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
  })

app.post('/current-playing', async(req, res) => {
    console.log("-----currentplaying-----")
    try{
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID
      })
      spotifyApi.setAccessToken(req.body.accessToken)
      const currentPlaying = await spotifyApi.getMyCurrentPlayingTrack()
      console.log(currentPlaying)
      res.status(201).send(currentPlaying.body)
    }
    catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  })

app.use(express.static(path.join(__dirname, "build")))
app.get("/*", function (req, res){
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

async function startServer() {
  await server.start()
  server.applyMiddleware({app})
}
startServer()
const httpServer = http.createServer(app)

mongo.connect();
const port = process.env.PORT || 80;

httpServer.listen({ port }, () => {
      console.log(`The server is up on port ${port}${server.graphqlPath}!`);
  })
import { GraphQLServer, PubSub } from  "graphql-yoga";
import Query from "./resolvers/Query"; 
import Mutation from "./resolvers/Mutation"
import SpotifyWebApi from "spotify-web-api-node"
import cors from "cors"
import bodyParser from "body-parser";
import userModel from "./models/user"
import "dotenv-defaults/config.js"

let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000"

const pubSub = new PubSub();
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation
    },
    context:{
        userModel,
        pubSub
    }
})

server.express.use(cors())
server.express.use(bodyParser.json())
server.express.use(bodyParser.urlencoded({extended: true}))

server.express.post("/auth", (req, res) => {
    const code = req.body.code
    console.log(code)
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

server.express.post('/refresh', (req, res) => {
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

  server.express.post('/current-playing', async(req, res) => {
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



export default server;
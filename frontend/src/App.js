import { HELLO, GET_USERS_QUERY, CREATE_USER_MUTATON } from "./graphql";
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"

import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header"
import Map from "./components/Map/Map"
import List from "./components/List/List"
import useAuth from "./hooks/SpotifyAuth"

const code = new URLSearchParams(window.location.search).get('code')

const Taipei = {lat: 25.01689434759726, lng: 121.53769463151286}
const TAIPEI_RESTRICTION = {
  ne: {lat: 25.076114807307416, lng: 121.591585130907},
  sw: {lat: 25.01237005969945, lng: 121.48164777707122}
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function App() {
  
  

  const {userInfo, currentPlaying, isLogin, setIsLogin, accessToken} = useAuth(code)
  
  const [coords, setCoords] = useState(Taipei)
  const [bounds, setBounds] = useState(TAIPEI_RESTRICTION)
  const [userLocation, setUserLocation] = useState(Taipei)

  const { data } = useQuery(GET_USERS_QUERY, {variables: 
    {
      neLat: bounds.ne.lat,
      neLng: bounds.ne.lng,
      swLat: bounds.sw.lat,
      swLng: bounds.sw.lng
    },
    pollInterval: 10000 // in ms
  })
  
  const [createUser] = useMutation(CREATE_USER_MUTATON)

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(getPosition, getPostionErr, options)
  }, [])

  function getPosition(position){

    const userCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    console.log("locate user successfully at")
    console.log(userCenter)

    setCoords(userCenter)
    setUserLocation(userCenter)
  }
  
  function getPostionErr(){
    console.log("locate user failure")
  }
  
  
  useEffect( () => {
    if(!accessToken){
      setIsLogin(false)
    }
  }, [accessToken])

  useEffect( () => {
    if(isLogin && currentPlaying.is_playing){
      createUser({
        variables:{
          input:{
            id: userInfo.userId,
            name: userInfo.username,
            imageURL: userInfo.image,
            lng: userLocation?userLocation.lng: coords.lng,
            lat: userLocation?userLocation.lat: coords.at,
            songID: currentPlaying.id
          }
        }
      })
    }
  }, [currentPlaying])
  
  useEffect( () => {
    console.log(userInfo)
  }, [userInfo])

  const [childClicked, setChildClicked] = useState(null)


  return (
    <>
    <CssBaseline/>
    <Header currentPlaying={currentPlaying} isLogin={isLogin} userInfo={userInfo}/>
    <Grid container spacing={3} style={{ width: '100%'}}>
      <Grid item xs={12} md={3}>
        <List users={data?.users} childClicked={childClicked} setChildClicked={setChildClicked}/>
      </Grid>
      <Grid item xs={12} md={9}>
        <Map 
         coords={coords}
         setCoords={setCoords}
         bounds={bounds}
         setBounds={setBounds}
         userLocation={userLocation}
         users={data?.users}
         childClicked={childClicked}
         setChildClicked={setChildClicked}
        />
      </Grid>
    </Grid>
    </>
  );
}

export default App;

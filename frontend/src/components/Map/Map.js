import GoogleMapReact from "google-map-react"
import { useRef, useState } from "react"
import useStyles from "./styles"
import IconPeople from "@material-ui/icons/EmojiPeople"
import mapStyles from "./mapStyles"

const Taipei = {lat: 25.01689434759726, lng: 121.53769463151286}
const TAIPEI_RESTRICTION = {
    ne: {lat: 25.076114807307416, lng: 121.591585130907},
    nw: {lat: 25.07888075583782, lng: 121.49655039614672},
    se: {lat: 25.01082029583416, lng: 121.61271753336655},
    sw: {lat: 25.01237005969945, lng: 121.48164777707122}
}
var DEFAULT_CENTER = Taipei

const Taipei_Bounds={
    north: 25.078,
    south: 25.010,
    east: 121.61,
    west: 121.48
}


const Map = ({coords, setCoords, bounds, setBounds, users, userLocation, setChildClicked, childClicked}) => {
    const controlRef = useRef(0)
    const classes = useStyles()
    const handleStreetView = (map, maps) => {
        if (map) {

            return
        }
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                defaultCenter={Taipei}
                center={coords}
                defaultZoom={17}
                margin={[50, 50, 50, 50]}
                yesIWantToUseGoogleMapApiInternals={true}
                options={{disableDefaultUI: true, restriction: {latLngBounds: Taipei_Bounds}, styles: mapStyles}}
                onGoogleApiLoaded={({ map, maps }) => handleStreetView(map, maps)}
                onChange={(e) => {
                     setCoords({lat:e.center.lat, lng: e.center.lng})
                     setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                     console.log(e.marginBounds)
                }}
                onChildClick={(child) => {
                    setChildClicked(child)
                    console.log(child)
                }}
                onClick={(e) => {
                    console.log("outside")
                    setChildClicked(null)
                }}
                
            >
                {users?.length && users.map((user, i) => {

                    return(
                        <div className={classes.markerContainer}
                            key={i}
                            lat= {user.lat}
                            lng={user.lng}>
                            <IconPeople
                                style={{transform: "scale(1.2", color: (i == childClicked)?"#43a047":""}}
                                fontSize="large"/> 
                        </div> 
                )})}
                <div className={classes.markerContainer}
                    key={5000}
                    lat={userLocation.lat}
                    lng={userLocation.lng}>
                            <IconPeople
                                style={{color:'red', transform: "scale(1.2)"}}
                                fontSize="large"/>
                    </div>
            </GoogleMapReact>
            
        </div>
    )
}


export default Map
import { Card, Avatar, CardContent, Typography, CardHeader, CardActionArea } from "@material-ui/core"


const User = ({ user, selected, refProp, i, setChildClicked }) => {
    if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    return (
        <Card style={{borderRadius:"1em", 
        backgroundColor: selected?"#43a047":"#262626",
        }} elevation={6}>
            <CardActionArea onClick={ () => {
                console.log("clicked")
                setChildClicked(i)}}>
            <CardHeader
                avatar={
                    <Avatar src={user.imageURL}/>
                }
                title={<Typography style={{color: "white"}} variant="h6">{user.name}</Typography>}
            />
           
            
            <CardContent>
            <iframe src={`https://open.spotify.com/embed/track/${user.songID}`}
                width="100%" 
                height="80"
                title="spotify iframe" 
                frameBorder="0"
                border-radius="5em" 
                allowtransparency="true" 
                allow="encrypted-media"/>
            </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default User


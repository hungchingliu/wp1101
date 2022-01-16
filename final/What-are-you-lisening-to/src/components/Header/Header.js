import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import MusicVideoOutlinedIcon from '@material-ui/icons/MusicVideoOutlined';
import useStyles from "./styles"
import styled from "styled-components"
import logo from "../../img/Spotify_Icon.png"

const LoginButton = styled(Button)`
  &&&{
    background-color: #1DB954;
    padding: 0.8rem 1rem 0.8rem 1rem;
    border-radius: 7%;
    margin: 2vh;
    &: hover {
      background-color: #18d860;
    }
  }
`;

const MiniContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  border-radius: 40px;

`;

const scopes = [
    'streaming',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-follow-read',
    'user-library-read',
    'user-library-modify',
    'user-read-email',
    'user-read-private'
  ];

const url = process.env.REACT_APP_CLIENT_URL
const AUTH_URL =
`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${url}&scope=${scopes.join('%20')}`


const Header = ({currentPlaying, isLogin, userInfo}) => {
    const classes = useStyles()
    return (
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}} className={classes.toolbar}>
                <Typography variant="h4"><MusicVideoOutlinedIcon fontSize="medium"/> What are you listening to?</Typography>
                {isLogin?currentPlaying.is_playing?
                <iframe src={"https://open.spotify.com/embed/track/" + currentPlaying.id}
                  title="spotify_iframe"
                  width="30%" 
                  height="80" 
                  frameBorder="0" 
                  allowtransparency="true" 
                  allow="encrypted-media"/>:
                  <h1>Nothing is playing</h1>:<></>}
                   
                  
                <MiniContainer>
                 {isLogin?<>
                <img
                  src = {userInfo.image}
                  alt = 'profile'
                  style = {{
                    borderRadius: '2em',
                    height: '4em',
                    width: '4em',
                    padding: '0.5em'
                  }}
                />
                <h1 border="2em">{userInfo.username}</h1>
                <LoginButton onClick={(e) => {window.location.href=url}}>
                  Log out
                </LoginButton></>:
                <>
                  <img alt="Spotify" src={logo} style = {{height: '3rem', width: '3rem'}}/>
                  <LoginButton variant="contained" onClick={(e) => {window.location.href=AUTH_URL}}>
                      <a href={AUTH_URL} style={{color: 'white', textDecoration:'none'}}
                      >
                          Login Spotify
                      </a>
                  </LoginButton></>
                }
                  
                </MiniContainer>
            </Toolbar>
        </AppBar>
    )
}

export default Header

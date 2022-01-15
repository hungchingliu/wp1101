import axios from "axios";
import { useState, useEffect } from "react";


  const useAuth = (code) => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        username: '',
        email: '',
        image: '',
        product: ''
      });
    
    const [currentPlaying, setCurrentPlaying] = useState({
      id: '',
      name: '',
      is_playing: ''
    })

    const [isLogin, setIsLogin] = useState(false)

    /*authentication states */
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(0);

    useEffect(() => {
      if(!code) return
      var token
      axios.post(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        code
      })
        .then(res => {
          token = res.data.accessToken
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            userId: res.data.userId,
            username: res.data.name,
            email: res.data.email,
            image: res.data.image,
            product: res.data.product
          }));
          if(token){
            setIsLogin(true)

            axios.post(`${process.env.REACT_APP_SERVER_URL}/current-playing`, {
              accessToken: token
            }).then(res => {
              console.log(res)
              if(res.data){
                console.log([res.data.item.id, res.data.item.name, res.data.is_playing])
                setCurrentPlaying({
                  id: res.data.item.id,
                  name: res.data.item.name,
                  is_playing: res.data.is_playing
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })

            const intervallCall = setInterval(() => {
              axios.post(`${process.env.REACT_APP_SERVER_URL}/current-playing`, {
                accessToken: token
              }).then(res => {
                console.log(res)
                if(res.data){
                  console.log([res.data.item.id, res.data.item.name, res.data.is_playing])
                  setCurrentPlaying({
                    id: res.data.item.id,
                    name: res.data.item.name,
                    is_playing: res.data.is_playing
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
  
            }, 60 * 1000)
  
            return () => clearInterval(intervallCall)
          }
        })
        .catch((e) => {
          console.log(e)
          window.location = '/'
        })
        
    },[code])

    useEffect(() =>{
      if (!refreshToken || !expiresIn) return;

      const intervalCall = setInterval(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/refresh`, {
          refreshToken
        })
          .then(res => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch(() => {
            window.location = '/'
          })
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(intervalCall);
    },[])

    

    return {
      userInfo,
      currentPlaying,
      isLogin,
      setIsLogin,
      accessToken,
    }
  };

  export default useAuth
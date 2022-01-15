import { Grid } from "@material-ui/core"
import User  from "../User/User"
import useStyles from "./styles"
import { useState, useEffect, createRef } from "react"
/*
const users = [
    {id:"11100723060",
    name:"劉鴻慶",
    lat:25.027256,
    lng:121.5217518,
    songID:"5Itl5bD4RARZkJWpKMboiR",
    imageURL:""}
]
*/
const List = ({users, childClicked, setChildClicked}) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([])
    useEffect(()=> {
        setElRefs((refs) => Array(users?.length).fill().map((_, i) => refs[i] || createRef()))
    }, [users])

    return (
        <div className={classes.container}>
            
            <Grid container spacing={3} className={classes.list}>
                {users?.map((user, i) => (
                    <Grid item key={i} xs={12} ref={elRefs[i]}>
                        <User user={user} selected={childClicked == i} refProp={elRefs[i]} i = {i} setChildClicked={setChildClicked}/>

                    </Grid>
                ))}
            </Grid>
        </div>
       
    )
}

export default List

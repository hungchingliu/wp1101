import { Grid } from "@material-ui/core"
import User  from "../User/User"
import useStyles from "./styles"
import { useState, useEffect, createRef } from "react"

const List = ({users, childClicked, setChildClicked, userInfo}) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([])
    useEffect(()=> {
        setElRefs((refs) => Array(users?.length).fill().map((_, i) => refs[i] || createRef()))
    }, [users])

    return (
        <div className={classes.container}>
            
            <Grid container spacing={3} className={classes.list}>
                {users?.map((user, i) => {
                    if(user.id === userInfo.userId)
                        return <></>
                    return(
                    <Grid item key={i} xs={12} ref={elRefs[i]}>
                        <User user={user} selected={childClicked == i} refProp={elRefs[i]} i = {i} setChildClicked={setChildClicked}/>

                    </Grid>
                )})}
            </Grid>
        </div>
       
    )
}

export default List

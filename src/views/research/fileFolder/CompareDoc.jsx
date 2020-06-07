import React, { useEffect, useState } from 'react'
import axios from 'axios';
import classNames from "classnames";

import { useStyles } from "../../../assets/css/projectFolderGrid";
import CompareDialog from "../../../components/drive/CompareDialog"
import { useSelector } from "react-redux";
import NotFound from '../../../components/NotFound/NotFound'
import Loader from "../../../components/Loader";

export default function CompareDoc(props) {
    const group=props.match.params.projectId
    const user = useSelector(state => state.user);
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [collabs, setCollabs] = React.useState([])
    const [mounted, setMounted] = React.useState(false)
    useEffect(() => {
        const variable = { 
            group: group,
        }
        axios.post('/project/get-collaborators', variable)
            .then(response => {
                setMounted(true)
                if (response.data) {
                    setCollabs(response.data)
                    
                }
            })
    }, [])
    
    const classes = useStyles();
    if (user.userData && mounted){
        if (collabs.some(e => e.researcher_id == user_id)){
            return(
                <div >
                    <div className={classNames(classes.main, classes.mainRaised2)} > 
                        <CompareDialog group={group}/>
                    </div>
                </div>
            );
        }else{
            return(
                <NotFound/>
                );
        }
    }else{
        return(
            <Loader />
        )
    }
    

}

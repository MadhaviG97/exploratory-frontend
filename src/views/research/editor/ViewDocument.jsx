import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "../../../components/NotFound/NotFound";
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/Loader";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import ViewPage from "../../../components/editor/DocumentView";

function ViewDocument(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [collabs, setCollabs] = React.useState([])
    const [mounted, setMounted] = React.useState(false)
    useEffect(() => {
        const variable = { 
            group: props.match.params.projectId,
        }
        axios.post('/project/get-collaborators', variable)
            .then(response => {
                setMounted(true)
                if (response.data) {
                    setCollabs(response.data)
                    
                }
            })
    }, [])
    if (user.userData && mounted){
        if (collabs.some(e => e.researcher_id == user_id)){
            return (
            <div className={classNames(classes.main2)}>
                <NavBar/>
                    
                    <div  > 
                        <ViewPage user={user} postId={props.match.params.postId} group={props.match.params.projectId}/>
                        <Box p={4}  /> 
                    </div>
                
                
            </div>
            );
        }return(
            <NotFound/>
            );
    }else{
        return(
            <Loader />
        )
    }
}
export default ViewDocument;

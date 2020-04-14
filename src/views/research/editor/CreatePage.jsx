import React, { useEffect, useState } from 'react'


import { useStyles } from "../../../assets/css/editor";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import QuillEditor from '../../../components/editor/QuillEditor';
//import axios from 'axios';
//import { useSelector } from "react-redux";


function CreatePage(props) {
    const classes = useStyles();
    //const user = useSelector(state => state.user);
    
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }
    //below function is not used
    const onFilesChange = (files) => {
        setFiles(files)
    }
    /*
    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }
        
        const variables = {
            content: content,
            userID: user.userData._id
        }
        
        axios.post('/api/blog/createPost', variables)
           .then(response => {
                if (response) {
                    message.success('Post Created!');//import { Alert, AlertTitle } from '@material-ui/lab';//<Alert severity="success">

                    setTimeout(() => {
                        props.history.push('/blog')
                    }, 2000);
                }
            })
        
    }
    */

    return (
        <div className={classes.paper}>
        <div style={{ maxWidth: '1000px', margin: '1.5rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Typography  > Editor</Typography>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <form className={classes.form} noValidate>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        //onSubmit={onSubmit}
                    >
                        Submit
                </Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreatePage

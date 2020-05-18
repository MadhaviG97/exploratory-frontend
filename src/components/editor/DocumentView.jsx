import React, { useEffect } from 'react'
import axios from 'axios';
import Title from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from "../../assets/css/editor";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
function DocumentView(props) {

    const [post, setPost] = React.useState({})
    const [fileadded, setFileAdded] = React.useState(false)
    const postId = props.postId;
    const classes = useStyles();
    const handleTurn=()=>{
        
        const token = localStorage.token;
        const variables = {
            postId:props.postId,
            group:"GeeFour"
        }
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }
        console.log(variables)
        axios.post('/drive/turntopdf', variables,config)
           .then(response => {
            if (response.data.success) {
                setFileAdded(true)
            } else {
                console.log('not')
                alert('Could not turn to pdf ')
            }
        })
    }
    useEffect(() => {
        const token = localStorage.token;
        const variable = { postId: props.postId }
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        axios.post('/editor/getPost', variable,config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])

    if (post.content) {
        return (
            <div>
                <div className={classes.roota}>
                    <Collapse in={fileadded}>
                        <Alert
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setFileAdded(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            >
                            File Added to the Drive!
                        </Alert>
                    </Collapse>
                </div>
                <div className="Document View" style={{ width: '80%', margin: '3rem auto' }}>
                    
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        
                        <Button variant="outlined" color="primary" onClick={handleTurn}>
                                    Turn to PDF Format
                        </Button>
                        
                    </div>
                    <Box boxShadow={2} >
                        <Box p={4}>
                            <div >
                                <h1 align='center' className={classes.topic2}>{post.name}</h1>
                            </div>
                            
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </Box>
                        
                    </Box>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        )
    }

}

export default DocumentView

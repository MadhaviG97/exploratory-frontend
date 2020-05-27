import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";

import { withStyles } from "@material-ui/core/styles";
import history from '../../history'


const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        background: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
});


 
class EditorMenu extends React.Component {
    constructor(props) {
        super(props);
        this.group=props.group
        this.state = {
          onlineUsers: [],
          online:[]
      };
        
        
    
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.nowOnline)
        if (this.state.online !== this.props.nowOnline) {
            this.setState({ online: this.props.nowOnline });
            //console.log('ch')
        }
      }
    handleClick = e => {
        this.setState({ [e]: !this.state[e] });
    };
    render() {
        
        const { classes } = this.props;
        return (
            <div>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color="primary" onClick={this.props.handleSave}>
                            Save Document
                        </Button>
                    </Paper>
                </Grid>
                <Divider variant="fullWidth"  />
                <List className={classes.root}>
                 
                  <ListItem
                      key={1}
                      button
                      onClick={this.props.savedVersion}
                    >
                      <ListItemText
                          primary={'Last Saved Version'}
                      />
                  </ListItem>
                  <Divider variant="fullWidth"  />
                  <ListItem
                      key={2}
                      button
                      onClick={()=>history.push(`/document/${this.group}/editorBlog`)}
                      //onClick={this.props.history.push('/document/editorBlog')}
                    >
                      <ListItemText
                          primary={'All Documents'}
                      />
                  </ListItem>
                  <Divider variant="fullWidth"  />
                  <ListItem
                      key={3}
                      button
                      onClick={()=>history.push(`/document/${this.group}/create`)}
                      //onClick={this.props.history.push('/document/create')}
                    >
                      <ListItemText
                          primary={'Create New'}
                      />
                  </ListItem>
                  <Divider variant="fullWidth"  />
                  <ListItem
                      key={4}
                      button
                      onClick={this.handleClick.bind(
                          this,
                          'onlineUsers'
                      )}
                  >
                      <ListItemText
                          primary={'Online Users'}
                      />
                      {this.state['onlineUsers'] ? (
                          <ExpandLess />
                      ) : (
                          <ExpandMore />
                      )}
                  </ListItem>
                  <Collapse
                      component="li"
                      in={this.state['onlineUsers']}
                      timeout="auto"
                      unmountOnExit
                  >
                      <List disablePadding>
                        
                          {this.state.online.map(
                              user => {
                                  return (
                                      <ListItem>
                                        <ListItemAvatar >
                                          <Avatar alt="user" src={user.user.propic} />
                                        </ListItemAvatar>
                                          <ListItemText
                                            primary={user.user.name}
                                          />
                                      </ListItem>
                                  );
                              }
                          )}
                      </List>
                    </Collapse>{" "}
                </List>
            </div>
        );
    }
}
EditorMenu.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditorMenu);

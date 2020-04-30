/*
import React from 'react';

import { useStyles } from "../../../assets/css/fileFolder";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import FolderDialog from '../../../components/drive/FolderDialog';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

//import tileData from './tileData';
//const fileImage = '../../../public/images/fileFolder/fileImage.png'



/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 
const tileData = [
       {
        img:process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png' ,
         title: 'Folder',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png' ,
         title: 'Folder',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png' ,
         title: 'File',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png',
         title: 'File',
         author: 'author',
       },
      
       {
        img:process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png' ,
         title: 'File',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png',
         title: 'File',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png',
         title: 'File',
         author: 'author',
       }
     ]
export default function TitlebarGridList() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div >
      <NavBar/>
      <Menu
            id="simple-menu"
            
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            <MenuItem style={{ color: '#4f606c',fontSize: 12.5 }} onClick={handleClose}><GetAppIcon style={{ color: '#00855e'}} marginRight={2} />Download</MenuItem>
            <MenuItem style={{ color: '#4f606c',fontSize: 12.5 }} onClick={handleClose}><ShareIcon style={{ color: '#014f82'}} marginRight={2}/>Share</MenuItem>
            <MenuItem style={{ color: '#4f606c',fontSize: 12.5 }} onClick={handleClose}><DeleteIcon style={{ color: '#d60009'}} marginRight={2}/>Delete</MenuItem>
          </Menu>
      
         
          
          
          <div className={classNames(classes.main, classes.mainRaised)}>
          <Box p={1}  style={{  background: '#014f82'}}>
            
              <div className={classes.name} >
                  <h1 align='center' className={classes.title}>Drive</h1>
              </div>
            </Box>
          <Box p={3} style={{ display: "flex" }} flexDirection="row" > 
          <Tooltip title="Add a File">
            <Button
              style={{ marginLeft: "auto", background: '#014f82',//can change the sign-in button color from here
              color: '#FFFFFF',
              height: 40,
              boxShadow: ['none']}}
              variant="contained"
              component="label"
            >
              <FileCopyIcon/>
                <input
                  type="file"
                  style={{ display: "none" }}
              />
            </Button>
            </Tooltip>
            <Box p={1}></Box>
            
            <FolderDialog/>
            </Box>
          <div className={classes.root}>
      
            <GridList cellHeight={150} cols={5} spacing={70} className={classes.gridList}>
          
              {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                
                  
                  title={tile.title}
                  subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.title}`} onClick={handleClick} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Box p={3}></Box>
        </div>
        <Footer/>
      </div>
  );
}
*/
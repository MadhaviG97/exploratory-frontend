import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from "../../../assets/css/fileFolder";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import FolderDialog from '../../../components/editor/FolderDialog';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
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
 */
const tileData = [
       {
        img:process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png' ,
         title: 'Image',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png' ,
         title: 'Image',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png' ,
         title: 'Image',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png',
         title: 'Image',
         author: 'author',
       },
      
       {
        img:process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png' ,
         title: 'Image',
         author: 'author',
       },
       {
        img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage2.png',
         title: 'Image',
         author: 'author',
       }
     ]
export default function TitlebarGridList() {
  const classes = useStyles();

  return (
      <div>
        
    <Box p={10} style={{ display: "flex" }} flexDirection="row" marginLeft={75} marginRight={16} marginTop={7}>
    <Typography variant="h5" >
        My Drive
      </Typography>
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
      <Box p={1}></Box>
      <FolderDialog/>
    </Box>
    <div className={classes.root}>
    
      <GridList cellHeight={150} cols={5} spacing={100} className={classes.gridList}>
        
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
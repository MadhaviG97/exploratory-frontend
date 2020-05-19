
import React,{useEffect} from 'react';
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";

import Box from '@material-ui/core/Box';

var jsdiff = require('diff');
export default function DiffCompare(props) {
    console.log(props)
    useEffect(() => {
        var one = props.one
        var other = props.other
        var color = ''
        var span = null
        if (!one && !other){
            one='polkjo'
            other='ykutkhbiopokijubhytgfrsdrtghjjhfcmbnhuo;kjhjklohjuiopknjioplkmnh'
        } 
        var diff = jsdiff.diffChars(one, other)
        var display = document.getElementById('display')
        var fragment = document.createDocumentFragment();
    
        diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
        span = document.createElement('span');
        span.style.color = color;
        span.appendChild(document
            .createTextNode(part.value));
        fragment.appendChild(span);
        });
        
        display.appendChild(fragment);
        },[])
    return(
        <div>
            
            
            <div id='display'>
                
            </div>
            
            
        </div>
    );

}

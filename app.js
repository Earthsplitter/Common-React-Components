/**
 * Created by wenming on 07/03/2017.
 */
import ReactDOM from 'react-dom'
import React from 'react'
import SlideShow from './SlideShow'

//Usage Example
let pictures = ["assets/img_nature_wide.jpg","assets/img_fjords_wide.jpg", "assets/img_lights_wide.jpg"];
let captions = ["Nature","Fjords","Lights"];
ReactDOM.render(<SlideShow captions={captions} pictures={pictures}/>,document.getElementById('app'));
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Link} from 'react-router-dom'
import $ from 'jquery';

const flex = {
    backgroundColor : "#669799",
    height : "100vh"  
}

export default class Home extends React.Component {

    constructor(){
        super()
        this.state = {}
    };

    render () {
        return(
        <div style={flex}>

        </div>    
           )
    }
}
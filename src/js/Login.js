import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Link, Redirect} from 'react-router-dom'
import $ from 'jquery';


const flex = {
    display: "flex",
    flexDirection: "row",
    height : "10%"
}

const button = {
    backgroundColor: "#4CAF50", /* Green */
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    height : "100%",
    marginLeft: "10px",
    boxSizing: "border-box"
}

const input = {

   height:"100%",
   marginRight : "10px",
   padding : "0px",
   boxSizing: "border-box"
}

const parent = {
    display:"inline-block",
    height : "100%",
    marginLeft : "10px"
}


const caption = {
    display:"inline-block",
    marginRight : "10px"
}


export default class Login extends React.Component {

    constructor(){
        super()
        this.state = { newUser : false}
    };

    newUser () {
        this.setState(()=> {
            return {newUser : true}
        })
    }

    render () {
        if(this.props.redirect){
            return <Redirect to="/private"></Redirect>
        }else {

            if(this.state.newUser){
                return <Redirect to="/newUser"></Redirect>
            }else {
                return(
                    <span style={parent}>
                         <span style={caption}>Username</span><input style={input}  onChange={this.props.updateUserName}></input>
                         <span style={caption}>Password</span><input  style={input}  onChange={this.props.updatePassword}></input>
                         <button onClick={this.props.login} style={button}>Submit</button>
                         <button onClick={this.newUser.bind(this)} style={button}>New User</button>
                         <span>{this.props.message}</span>
                     </span>  
                         ) 
            }
        }
       
    }
}
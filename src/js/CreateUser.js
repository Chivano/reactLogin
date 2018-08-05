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


export default class CreateUser extends React.Component {

    constructor(){
        super()
        this.state = {
            message : ""
        }
       
    };

    render () {
        if(this.props.redirect){
            return <Redirect to="/private"></Redirect>
        }else {
            return(
               <span style={parent}>
                    <span style={caption}>Username</span><input ref="Username" style={input}  onChange={this.props.updateNewUser}></input>
                    <span style={caption}>Password</span><input ref="Password" style={input}  onChange={this.props.updateNewUserPassword}></input>
                    <button onClick={()=>{
                        if(this.refs.Username.value == "" || this.refs.Password.value == ""){
                            console.log("INHERE")
                            this.setState(()=>{
                                return {message : "Fyll i användarnamn och lösenord"}
                            })
                        }else {
                            this.setState(()=>{
                                return {message : ""}
                            })
                            this.props.createNewUser
                        }
                       
                    }} style={button}>Create user</button>
                    <span>{this.state.message}</span>
                </span>  
                    ) 
        }
       
    }
}
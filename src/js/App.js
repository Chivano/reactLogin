import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import Private from "./Private";
import Login from "./Login";
import CreateUser from "./CreateUser";
import $ from "jquery";

const flex = {
  display: "flex",
  flexDirection: "row",
 
  backgroundColor: "#3c7e80",
  height: "100px"
};

const button = {
  backgroundColor: "#804d3c", /* Green */
  border: "none",
  color: "white",
  padding: "10px 25px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px"
}

const PrivateRoute = ({ component: Component, loggedIn }) => (
  <Route
    render={props =>
      loggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loggedInUser: {
        userName: "",
        password: ""
      },
      newUser: {
        userName: "",
        password: ""
      }
    };
  }

  login() {
    this.sendCredentials();
  }

  updateUserName(e) {
    e.persist();
    this.setState(prevState => {
      return {
        loggedInUser: {
          password: prevState.loggedIn.password,
          userName: e.target.value
        }
      };
    });
  }

  updatePassword(e) {
    e.persist();
    this.setState(prevState => {
      return {
        loggedInUser: {
          password: e.target.value,
          userName: prevState.loggedInUser.userName
        }
      };
    });
  }

  updateNewUserPassword(e) {
    console.log(e.target.value, "updateNewUserPassword");
    e.persist();
    if (e.target.value == null || e.target.value == "") {
      this.setState(prevState => {
        return {
          message: "Password får inte vara tomt"
        };
      });
    } else {
      this.setState(prevState => {
        return {
          newUser: {
            password: e.target.value,
            userName: prevState.newUser.userName
          }
        };
      });
    }
  }

  updateNewUser(e) {
    console.log(e.target.value, "updateNewUser");
    e.persist();
    if (e.target.value == null || e.target.value == "") {
      this.setState(prevState => {
        return {
          message: "Username får inte vara tomt"
        };
      });
    } else {
      this.setState(prevState => {
        return {
          newUser: {
            password: prevState.newUser.password,
            userName: e.target.value
          }
        };
      });
    }
  }

  success() {
    console.log("Success");
    this.setState(() => {
      return {
        loggedIn: true,
        redirect: true
      };
    }, console.log(this.state, "THISSTATEAFTEREVERYT"));
  }

  error() {
    console.log("Error");
    this.setState(() => {
      return {
        loggedIn: false,
        message: "Log in failed"
      };
    }, console.log(this.state, "THISSTATEAFTEREVERYT"));
  }

  createNewUser() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/newuser",
      data: JSON.stringify(this.state.newUser),
      context: this,
      contentType: "application/json",
      success: this.success,
      error: this.error
    });
  }

  sendCredentials() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/login",
      data: JSON.stringify(this.state.loggedInUser),
      context: this,
      contentType: "application/json",
      success: this.success,
      error: this.error
    });
  }

  render() {
    return (
      <div>
        <div style={flex}>
          <div style={{ height: "30%", margin : "0px" }}>
            <Route
              path="/"
              exact
              render={props => <li style={button}><Link style={{textDecoration: 'none'}} to="/private"><font size="3" color="black">Shop</font></Link></li>}
            />
            <Route
              path="/newUser"
              render={props => (
                <CreateUser
                  createNewUser={this.createNewUser.bind(this)}
                  updateNewUser={this.updateNewUser.bind(this)}
                  updateNewUserPassword={this.updateNewUserPassword.bind(this)}
                  message={this.state.message}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login
                  updateUserName={this.updateUserName.bind(this)}
                  redirect={this.state.redirect}
                  updatePassword={this.updatePassword.bind(this)}
                  message={this.state.message}
                  login={this.login.bind(this)}
                />
              )}
            />
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Home} />
            <Route path="/newUser" exact component={Home} />
            <PrivateRoute
              path="/private"
              exact
              loggedIn={this.state.loggedIn}
              component={Private}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

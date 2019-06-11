import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Menu, Search, Icon, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { profileLogin, fetchUserAgency } from '../../actions';


class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
      isLogged: false,
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ date: new Date().toLocaleString() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleUsername = (e) => {
    this.setState({ username: e.target.value })
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  sendLoginForm(e) {
    e.preventDefault()
    this.props.profileLogin(this.state.username, this.state.password)


  }
  users() {
    this.props.fetchUserAgency()
  }

  render() {
    return (
      <div className="ui secondary  pointing menu" >
        <Link to="/" className="left item" >
          {this.state.date}
        </Link>
        <div className="right menu">
          {
            this.state.isLogged ?
              <div style={{ display: 'inline-flex' }}>
                <Link to="/Messages" className="right item" style={{ background: 'aliceblue', border: '1px solid blue' }} >
                  Messages
                </Link>
                <Link to="/Profile" className="right item" style={{ background: 'aliceblue', border: '1px solid blue' }}>
                  Login Name
                </Link>
                <Link to="/" className="right item" style={{ background: 'aliceblue', border: '1px solid blue' }} >
                  EXIT
            </Link>
              </div>
              :
              <div>
                <input type="text" onChange={this.handleUsername} value={this.state.username} />
                <input type="text" onChange={this.handlePassword} value={this.state.password} />
                <button onClick={(e) => this.sendLoginForm(e)}>LOGIN</button>
                <button onClick={(e) => this.users(e)}>USER AGENCY</button>
              </div>

          }

        </div>
      </div>

    )
  }
}

const mapStateToProps = ({ profileLoginData }) => ({ profileLoginData })
export default connect(mapStateToProps, { profileLogin, fetchUserAgency })(LoginHeader);

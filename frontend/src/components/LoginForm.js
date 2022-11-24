import {useState} from "react";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";

import {login, logout} from "../reducers/loginReducer";
import {getCans} from "../reducers/canReducer";
import {setNotification} from "../reducers/notificationReducer";

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({username, password})
      props.getCans()
      setUsername('')
      setPassword('')
    } catch (error) {
      props.setNotification('wrong username or password', 'error', 5)
    }
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <div className={"container"}>
          <div className={"row min-vh-100 align-items-center justify-content-center"}>
            <div className={"col-sm-12 col-lg-6"}>
              <Form.Group id={'username'} className={"form-body"}>
                <Form.Label style={{color: "#0d6efd", fontSize: "1.3rem"}}>Username</Form.Label>
                <Form.Control
                  style={{fontSize: "1.5rem"}}
                  type='text'
                  value={username}
                  name='Username'
                  placeholder='Username'
                  onChange={({target}) => setUsername(target.value)}
                />
              </Form.Group>
              <Form.Group id={'password'}>
                <Form.Label style={{color: "#0d6efd", fontSize: "1.3rem"}}>Password</Form.Label>
                <Form.Control
                  style={{fontSize: '1.5rem'}}
                  type='password'
                  value={password}
                  name='Password'
                  placeholder='Password'
                  onChange={({target}) => setPassword(target.value)}
                />
                <Form.Text style={{fontSize: "1.1rem"}}>We'll never share your password</Form.Text>
              </Form.Group>
              <br/>
              <div className={"col text-center"}>
                <Button id='formLoginButton' type='submit'>
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  setNotification,
  login,
  logout,
  getCans
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default connectedLoginForm

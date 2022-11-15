import {setNotification} from "../reducers/notificationReducer";
import {login, logout} from "../reducers/loginReducer";
import {connect} from "react-redux";
import CansList from "./cansList";
import CansForm from "./CansForm";
import {Button} from "react-bootstrap";
import {useState} from "react";

const Home = (props) => {
  const [showForm, setShowForm] = useState('none')
  return (
    <div style={{backgroundColor : "#515151"}}>
      <h1 style={{color: "#0d6efd", textAlign:"center"}}>Cans</h1>
      <h3>Welcome {props.user?.username} </h3>
      <div>Email: {props.user?.email}</div>
      <div>Role: {props.user?.role}</div>
      <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide' : 'Show'} Form</Button>
      {showForm ? <CansForm/> : null}
      <CansList/>
      <Button style={{textAlign:"center"}} onClick={() => props.logout()}>Logout</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  login,
  logout
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome

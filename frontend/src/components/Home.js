import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {login, logout} from '../reducers/loginReducer'
import CansForm from './CansForm'
import CansList from './cansList'


const Home = (props) => {
  return (
    <div>
      <div style={{backgroundColor: '#515151'}}>
        <h1 style={{color: '#0d6efd', textAlign: 'center'}}>Cans</h1>
        <div
          style={{
            textAlign: 'right',
            marginRight: '100px',
            marginBottom: '30px'
          }}
        >
          <h3>Welcome {props.user?.username} </h3>
          <div>Email: {props.user?.email}</div>
          <div>Role: {props.user?.role}</div>
          <div>Numero: </div>
        </div>

        <CansForm />
        <div style={{textAlign: 'center'}}>
          <CansList />
        </div>

        <div style={{textAlign: 'center'}}>
          <Button variant='danger' onClick={() => props.logout()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
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

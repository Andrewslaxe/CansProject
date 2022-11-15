import {connect, useDispatch} from "react-redux";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

import {useEffect} from "react";

import {getUser} from "./reducers/loginReducer";
import {getCans} from "./reducers/canReducer";
import Notification from "./components/Notification";

function App(props) {
  const dispatch = useDispatch()
  const style = {padding: '5px', textDecoration: 'none'}

  useEffect(() => {
    props.getUser()
    props.getCans()
  }, [dispatch])
  
  return (
    <div>
      <Notification/>
      {props.user === null?(<div style={{backgroundColor: "#333"}}>
        <div className='container'>
          <div>
            <LoginForm/>
          </div>
        </div>
      </div>):<Home/>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  getUser,
  getCans
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
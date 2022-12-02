import {connect, useDispatch} from 'react-redux'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import CansList from './components/cansList'

import {useEffect} from 'react'
import {getUser} from './reducers/loginReducer'
import {getCans} from './reducers/canReducer'
import Notification from './components/Notification'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    props.getUser()
    props.getCans()
  }, [dispatch])

  return (
    <div style={{backgroundColor: '#515151'}}>
      <BrowserRouter>
        <Notification />
        {props.user ? (
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cans' element={<CansList />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Routes>
              <Route path='/' element={<LoginForm />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  )
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

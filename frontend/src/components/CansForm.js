import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {createCan} from "../reducers/canReducer";

const CansForm = (props) => {
  const [canID, setCanID] = useState('')
  const [storage, setStorage] = useState('')
  const [location, setLocation] = useState('')
  const [battery, setBattery] = useState('')
  const handleCreate = async (event) => {
    event.preventDefault()
    const newCan = {
      canID,
      storage,
      location,
      battery
    }
    props.createCan(newCan)
    setCanID('')
    setStorage('')
    setLocation('')
    setBattery('')
  }
  return (
    <>
      <Form onSubmit={handleCreate}>
        <div className={"container"}>
          <div className={"row min-vh-100 align-items-center justify-content-center"}>
            <div className={"col-sm-12 col-lg-6"}>
              <Form.Group id={'canID'} className={"form-body"}>
                <Form.Label style={{color: "#fff", fontSize: "1.3rem"}}>CanID</Form.Label>
                <Form.Control
                  style={{fontSize: "1.5rem"}}
                  type='text'
                  value={canID}
                  name='CanID'
                  placeholder='CanID'
                  onChange={({target}) => setCanID(target.value)}
                />
                <Form.Text style={{fontSize: "1.1rem"}}>We'll never share your email</Form.Text>
              </Form.Group>
              <Form.Group id={'storage'}>
                <Form.Label style={{color: "#fff", fontSize: "1.3rem"}}>Storage</Form.Label>
                <Form.Control
                  style={{fontSize: '1.5rem'}}
                  type='text'
                  value={storage}
                  name='Storage'
                  placeholder='Storage'
                  onChange={({target}) => setStorage(target.value)}
                />
              </Form.Group>
              <Form.Group id={'location'}>
                <Form.Label style={{color: "#fff", fontSize: "1.3rem"}}>Location</Form.Label>
                <Form.Control
                  style={{fontSize: '1.5rem'}}
                  type='text'
                  value={location}
                  name='Location'
                  placeholder='Location'
                  onChange={({target}) => setLocation(target.value)}
                />
              </Form.Group>
              <Form.Group id={'battery'}>
                <Form.Label style={{color: "#0d6efd", fontSize: "1.3rem"}}>Battery</Form.Label>
                <Form.Control
                  style={{fontSize: '1.5rem'}}
                  type='text'
                  value={battery}
                  name='Battery'
                  placeholder='Battery'
                  onChange={({target}) => setBattery(target.value)}
                />
              </Form.Group>
              <br/>
              <div className={"col text-center"}>
                <Button id='formLoginButton' type='submit'>
                  Create
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
    cans: state.cans
  }
}

const mapDispatchToProps = {
  createCan
}
const connectedCanForm = connect(mapStateToProps, mapDispatchToProps)(CansForm)
export default connectedCanForm
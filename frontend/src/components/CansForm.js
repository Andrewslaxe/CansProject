import {connect} from 'react-redux'
import {Button, Modal} from 'react-bootstrap'
import {useState} from 'react'
import {createCan} from '../reducers/canReducer'
import {filterChange} from '../reducers/filterReducer'

const CansForm = (props) => {
  const [show, setShow] = useState(false)
  const [canID, setCanID] = useState('')
  const [storage, setStorage] = useState('')
  const [location, setLocation] = useState('')
  const [battery, setBattery] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSearch = (event) => {
    event.preventDefault()
    props.filterChange(event.target.value)
  }

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
    setShow(false)
  }
  return (
    <div className='container '>
      <div
        style={{background: '#333'}}
        className='crud shadow-lg p-3 bg-opacity-25 bg-black rounded'
      >
        <div className='row '>
          <div className='col-sm-3 text-gred'>
            <div className='search'>
              <form className='form-inline'>
                <input
                  onChange={handleSearch}
                  className='form-control mr-sm-2'
                  type='search'
                  placeholder='Search Can ID'
                  aria-label='Search'
                />
              </form>
            </div>
          </div>
          <div className='col-sm-3 offset-sm-2  ' style={{color: '#0d6efd'}}>
            <h3>
              <b>Details</b>
            </h3>
          </div>
          <div className='col-sm-3 offset-sm-1  '>
            <Button variant='primary' onClick={handleShow}>
              Add New Can
            </Button>
          </div>
        </div>
      </div>
      <div className='model_box'>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div style={{color: 'black'}}>Add Can</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleCreate}>
              <div className='form-group'>
                <input
                  value={canID.toString()}
                  onChange={({target}) => setCanID(target.value.toString())}
                  type='number'
                  className='form-control'
                  placeholder='Enter CanID'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  value={storage}
                  onChange={({target}) => setStorage(target.value)}
                  type='number'
                  className='form-control'
                  placeholder='Enter Storage'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  value={location}
                  onChange={({target}) => setLocation(target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter Location'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  value={battery}
                  onChange={({target}) => setBattery(target.value)}
                  type='number'
                  className='form-control'
                  placeholder='Enter Battery'
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary mt-4 justify-content-center'
              >
                Add
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cans: state.cans
  }
}

const mapDispatchToProps = {
  createCan,
  filterChange
}

const connectedCanForm = connect(mapStateToProps, mapDispatchToProps)(CansForm)
export default connectedCanForm

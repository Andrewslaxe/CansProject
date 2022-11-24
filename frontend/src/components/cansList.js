import {useSelector} from "react-redux"
import {connect} from "react-redux";
import {Button, Table} from "react-bootstrap";

import {deleteCan} from "../reducers/canReducer";

const CansList = (props) => {
  const cans = useSelector(state => state.cans)
  const filter = useSelector(state => state.filter)
  const filteredCans = filter ? cans.filter(can => can.canID.toString().includes(filter.toLowerCase())) : cans
  const handleDelete = async (event) => {
    event.preventDefault()
    props.deleteCan(event.target.value)
  }
  return (
    <div className={"container"}>
      <div style={{margin: "1em"}} className={"align-items-center justify-content-center"}>
        <Table bordered hover>
          <thead>
          <tr>
            <th>CanID</th>
            <th>Storage</th>
            <th>Location</th>
            <th>Battery</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredCans.map(can =>
            <tr key={can.canID}>
              <td>{can.canID}</td>
              <td>{can.storage}</td>
              <td>{can.location}</td>
              <td>{can.battery}</td>
              <td>OK</td>
              <td><Button value={can.canID} onClick={handleDelete} variant="danger">Delete</Button></td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cans: state.cans,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  deleteCan
}
const connectedCansList = connect(mapStateToProps, mapDispatchToProps)(CansList)
export default connectedCansList

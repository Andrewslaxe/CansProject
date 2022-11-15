import {useSelector} from "react-redux"
import {connect} from "react-redux";
import {Button, Table} from "react-bootstrap";

const CansList = () => {
  const cans = useSelector(state => state.cans)
  const Can = ({can}) => {
    return (
      <>
        <div>CanID: {can.canID}</div>
        <div>storage: {can.storage}</div>
        <div>location: {can.location}</div>
        <div>battery: {can.battery}</div>
        <Button variant="danger">Delete</Button>
      </>
    )
  }
  return (
    <Table striped={true}>
      <tbody>
      {cans.map((can) => (
        <tr key={can.id}>
          <td>
            <Can can={can}/>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    cans: state.cans
  }
}

const connectedCansList = connect(mapStateToProps)(CansList)
export default connectedCansList

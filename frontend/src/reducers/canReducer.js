import canService from '../services/cans'

export const canReducer = (state = [], action) => {
  switch (action.type) {
    case '@can/getAll':
      return action.payload
    case '@can/create':
      return [...state, action.can]
    case '@can/delete':
      return state.filter(can => can.canID.toString() !== action.id)
    case '@can/update':
      return state.map(can => can.id === action.can.id ? action.can : can)
    default:
      return state
  }
}

export const getCans = () => {
  return async dispatch => {
    const cans = await canService.getAll()
    dispatch({
      type: '@can/getAll',
      payload: cans,
    })
  }
}

export const createCan = (can) => {
  return async dispatch => {
    const newCan = await canService.create(can)
    dispatch({
      type: '@can/create',
      can: newCan,
    })
  }
}

export const deleteCan = (id) => {
  return async dispatch => {
    await canService.remove(id)
    dispatch({
      type: '@can/delete',
      id,
    })
  }
}
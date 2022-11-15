import loginService from "../services/login";
import canService from "../services/cans";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case '@login/login':
      return action.user

    case '@login/logout':
      return null

    case '@login/getUser':
      return action.user
    default:
      return state
  }
}

export const login = (content) => {
  return async dispatch => {
    const user = await loginService.login(content)
    window.localStorage.setItem('loggedCanAppUser', JSON.stringify(user))
    canService.setToken(user.token)
    dispatch({
      type: '@login/login',
      user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedCanAppUser')
    dispatch({
      type: '@login/logout'
    })
  }
}

export const getUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedCanAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      canService.setToken(user.token)
      dispatch({
        type: '@login/getUser',
        user
      })
    } else {
      dispatch({
        type: '@login/getUser',
        user: null
      })
    }
  }
}

import { CHANGE_LOGIN } from './constants'

const defaultState = {
  login: true
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_LOGIN:
      const newState = { ...state, login: action.value }
      return newState
    default:
      return state
  }
}

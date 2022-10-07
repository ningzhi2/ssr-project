import {
	CHANGE_LIST
} from './constants'

const defaultState = {
	translationList: []
}

export default (state = defaultState,action) => {
	switch(action.type) {
		case CHANGE_LIST:
			const newState = {...state,translationList:action.list}
			return newState
		default:
			return state
	}
}